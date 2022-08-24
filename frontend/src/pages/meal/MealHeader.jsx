import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export const MealHeader = ({ data }) => {
  return (
    <Row>
      <Col xs={4}>
        <h2>{data.name}</h2>
      </Col>
      <Col>
        <h1>Picture of meal</h1>
      </Col>
    </Row>
  );
};
