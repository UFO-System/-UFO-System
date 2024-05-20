import "./css/KitchenPage.css";
import OrderBoard from "./OrderBoard";
import Footer from "./Footer";
import data from "./data.json";

function KitchenPage() {
  return (
    <>
      <body className="kitchenBody">
        {data.table1.map((exams) => (
          <OrderBoard order_id={exams} />
        ))}
      </body>
      <Footer />
    </>
  );
}

export default KitchenPage;
