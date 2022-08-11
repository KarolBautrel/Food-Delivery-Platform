import { CheckoutForm } from "./CheckoutForm";
import { CouponForm } from "./CouponForm";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export const CheckoutSummary = () => {
  const authData = JSON.parse(window.localStorage.getItem("AUTH_CREDENTIALS"));
  const { data, status } = useQuery(["summary"], () =>
    fetch("/api/order-summary", {
      method: "GET",
      headers: { Authorization: `Token ${authData.token}` },
    }).then((response) => response.json())
  );

  if (status === "loading") return <div>Loading...</div>;
  if (status === "error") return <div>Error</div>;
  const orderdata = data[0];
  return (
    <div className="card" style={{ width: "50%", marginLeft: "25%" }}>
      <div>
        <h2>You are about to buy</h2>
        <Row>
          {orderdata.order_items.map((item) => (
            <div key={item.id}>
              <h5>
                {item.item.name}, qty
                {item.quantity}, for: {item.final_price} $
              </h5>
              <h5></h5>
            </div>
          ))}
        </Row>
      </div>
      <Row>
        <Col>
          <CheckoutForm items={data.order_items} authData={authData} />
        </Col>
        <Col>
          <CouponForm
            items={orderdata.order_items}
            authData={authData}
            price={orderdata.total}
          />
        </Col>
      </Row>
    </div>
  );
};
