import { CheckoutForm } from "./CheckoutForm";
import { CouponForm } from "./CouponForm";
import { useSelector, useDispatch } from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export const CheckoutSummary = () => {
  const authData = JSON.parse(window.localStorage.getItem("AUTH_CREDENTIALS"));
  const { price, items, quantity } = useSelector((state) => state.order);
  console.log(price, items, quantity);
  return (
    <div className="card" style={{ width: "50%", marginLeft: "25%" }}>
      <div>
        <h2>You are about to buy</h2>
        <Row>
          {items.map((item) => (
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
          <CheckoutForm items={items} authData={authData} />
        </Col>
        <Col>
          <CouponForm items={items} authData={authData} price={price} />
        </Col>
      </Row>
    </div>
  );
};
