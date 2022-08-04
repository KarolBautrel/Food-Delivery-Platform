import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export const MealCard = ({ data }) => {
  return (
    <Row className="card">
      <Col>
        <Row>
          <Col>
            <h4>Description:</h4>
            <h5>{data.description}</h5>
            <h6>Ingredients: {data.ingredient}</h6>
          </Col>
          <Col>
            <h4>Price: {data.price} PLN</h4>
            <button className="button">Add to cart</button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
