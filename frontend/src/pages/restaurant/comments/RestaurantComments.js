import React from "react";
import "./RestaurantComments.css";
import { useSelector } from "react-redux";
import CommentForm from "./CommentForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const RestaurantComments = ({ data }) => {
  const { token } = useSelector((state) => state.auth);

  return (
    <>
      <Row>
        <h1 style={{ marginLeft: "40%" }}>Comments</h1>
        <Col>
          {data.comments.map((comment) => (
            <div key={comment.id}>
              <h4 style={{ marginLeft: "40%" }}>{comment.creator.name} said</h4>
              <div
                className="card"
                style={{ width: "60%", marginLeft: "20%", marginTop: "5px" }}
              >
                <div>
                  <h4>Rate: {comment.rate} </h4>
                </div>
                <h5>{comment.body}</h5>
              </div>
            </div>
          ))}
        </Col>
        <Col>
          {token && (
            <div>
              <CommentForm data={data} />
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};
