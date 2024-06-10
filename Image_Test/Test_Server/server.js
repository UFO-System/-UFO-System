const express = require("express");
const axios = require("axios");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const FormData = require("form-data");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))

const upload = multer({ dest: "uploads/" });

const db = mysql.createConnection({
  host: "localhost",
  user: "OrderSystem",
  database: "OrderSystem",
  password: "order123",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to database.");
});

// 메뉴 추가
app.post("/add-menu", upload.single("image"), (req, res) => {
  const { admin_id, menu_name, price } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const formData = new FormData();
  formData.append("image", fs.createReadStream(req.file.path));

  axios
    .post("http://localhost:3000/upload", formData, {
      headers: {
        ...formData.getHeaders(),
      },
    })
    .then((response) => {
      const imageUrl = response.data.fileUrl;

      const query = `CALL InsertMenu(?, ?, ?, ?, @status_message)`;
      db.execute(
        query,
        [admin_id, menu_name, price, imageUrl],
        (err, results) => {
          if (err) throw err;
          db.query(
            "SELECT @status_message AS status_message",
            (error, statusResults) => {
              if (error) throw error;
              const statusMessage = statusResults[0].status_message;
              res.json({ success: true, status_message: statusMessage });
            }
          );
        }
      );
    })
    .catch((error) => {
      console.error("Error uploading image:", error);
      res.status(500).json({ error: "Image upload failed" });
    });
});

// 메뉴 삭제
app.delete("/delete-menu", (req, res) => {
  const { admin_id, menu_id } = req.body;

  const query = `CALL DeleteMenu(?, ?, @status_message)`;
  db.execute(query, [admin_id, menu_id], (err, results) => {
    if (err) throw err;
    db.query(
      "SELECT @status_message AS status_message",
      (error, statusResults) => {
        if (error) throw error;
        const statusMessage = statusResults[0].status_message;
        res.json({ success: true, status_message: statusMessage });
      }
    );
  });
});

// 메뉴 목록 조회
app.get("/menu", (req, res) => {
  const query = "SELECT * FROM Menu";
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(3001, () => {
  console.log("Main server started on http://localhost:3001");
});
