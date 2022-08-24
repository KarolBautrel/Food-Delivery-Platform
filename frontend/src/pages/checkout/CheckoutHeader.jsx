import React from "react";
import Row from "react-bootstrap/Row";

export const CheckoutHeader = ({ orders }) => {
  return (
    <div>
      <h2>You are about to buy</h2>
      <Row>
        {orders.order_items.map((item) => (
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
  );
};
