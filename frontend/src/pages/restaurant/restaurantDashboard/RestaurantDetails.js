import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { MapComponent } from "../../../components/MapComponent";

export const RestaurantDetails = ({ data }) => {
  return (
    <Container style={{ marginTop: "25px" }}>
      <Row>
        <Col>
          <h1>{data.name}</h1>
          <h3>
            <ul className="header-list">
              <li>
                Tables: {data.available_tables}/{data.tables_quantity}
              </li>
              <li> Rate : {data.avg_rate}</li>
            </ul>
          </h3>
          <div>
            <h2>Address: {data.address}</h2>
            <h2>Phone number: {data.phone_number}</h2>
          </div>
        </Col>
        <Col>
          <MapComponent data={data} />
        </Col>
      </Row>
      <Row></Row>
    </Container>
  );
};
