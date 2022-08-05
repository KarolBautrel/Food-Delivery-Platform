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
        <Col>
          <h3 style={{ marginLeft: "20%" }}>Comments</h3>
          {data.comments.map((comment) => (
            <div
              className="card"
              style={{ width: "60%", marginLeft: "20%" }}
              key={comment.id}
            >
              <div>
                <h2>{comment.creator.name}</h2>
                <h3>Rate: {comment.rate} </h3>
              </div>
              <h3>{comment.body}</h3>
            </div>
          ))}
        </Col>
        <Col>
          {token && (
            <div>
              <CommentForm />
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};
