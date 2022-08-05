import React from "react";
import "./RestaurantComments.css";
import { useSelector } from "react-redux";
import CommentForm from "./CommentForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const RestaurantComments = ({ data }) => {
  const { token, id } = useSelector((state) => state.auth);

  const handleDelete = async (id) => {
    try {
      const resp = await fetch(`/api/comment/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Token ${token}` },
      });
      if (resp.ok) {
        alert("Comment deleted");
      } else {
        throw new Error("something went wrong");
      }
    } catch (error) {
      alert(error);
    }
  };

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
              {id == comment.creator.id ? (
                <Button
                  style={{ marginLeft: "20%", marginTop: "5px" }}
                  variant="danger"
                  onClick={() => {
                    handleDelete(comment.id);
                  }}
                >
                  Delete
                </Button>
              ) : (
                <></>
              )}
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
