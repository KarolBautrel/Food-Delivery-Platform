import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MapComponent } from "../../components/MapComponent";
export const RestaurantDetails = ({ data }) => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>{data.name}</h1>
        </Col>
        <Col>
          <MapComponent data={data} />
        </Col>
        <Col>
          <h3>
            <ul className="header-list">
              <li>
                Tables: {data.available_tables}/{data.tables_quantity}
              </li>
              <li> Rate : {data.avg_rate}</li>
            </ul>
          </h3>
        </Col>
      </Row>
      <div className="body">
        <h2>Address: {data.address}</h2>
        <h2>Phone number: {data.phone_number}</h2>
      </div>
    </Container>
  );
};
