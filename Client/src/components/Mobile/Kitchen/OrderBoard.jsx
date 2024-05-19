import { Box } from "@mui/material";

function OrderItem() {
  return (
    <Box
      sx={{
        border: "3px solid #3C2A2C",
        width: "22vw",
        height: "96vh",
        borderRadius: 5,
        display: "inline-block",
        top: `0vh`,
        left: `2vw`,
        margin: 1,
        boxSizing: "border-box",
        "&:hover": {
          backgroundColor: "#8A7E72",
          transition: "0.5s",
          cursor: "pointer",
        },
        "&:not(:hover)": {
          backgroundColor: "##E7E7E7",
          transition: "background-color 0.5s", // Added transition for background-color
        },
      }}
    >
      <table className="kitchenTable">
        <tr>
          <div
            style={{
              fontSize: "18px",
              width: "100%",
              height: "100%",
              padding: "5px",
              fontWeight: "bolder",
            }}
          >
            <span>Order No.</span> <span>0030</span>
            <br />
            <span>Table No.</span> <span>8</span>
          </div>
        </tr>
        <tr>
          <td colSpan="3">계란찜</td>
        </tr>
        <tr>
          <td colSpan="3">아구찜</td>
        </tr>
        <tr>
          <td colSpan="3">대게찜</td>
        </tr>
        <tr>
          <td colSpan="3">만두찜</td>
        </tr>
        <tr>
          <td colSpan="3">소주</td>
        </tr>
        <tr>
          <td colSpan="3">.</td>
        </tr>
        <tr>
          <td colSpan="3">.</td>
        </tr>
      </table>
    </Box>
  );
}
export default OrderItem;
