import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const CommentCard = ({ comment, authData, handleRefresh, token }) => {
  const queryClient = useQueryClient();

  const deleteComment = async (id) => {
    try {
      const resp = await fetch(`/api/comment/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Token ${token}` },
      });
      if (resp.ok) {
        handleRefresh();
      } else {
        throw new Error("something went wrong");
      }
    } catch (error) {
      alert(error);
    }
  };

  const mutation = useMutation(deleteComment, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["restaurant"]);
      console.log("udalo sie");
    },
  });
  return (
    <>
      <Row
        className="card"
        style={{ width: "60%", marginLeft: "20%", marginTop: "5px" }}
      >
        <Row>
          <h4 style={{ marginLeft: "40%" }}>{comment.creator.name} said</h4>
        </Row>
        <Col>
          <div>
            <h4>Rate: {comment.rate} </h4>
          </div>
        </Col>
        <Row>
          <Col xs={6}>
            <h5>{comment.body}</h5>
          </Col>
          <Col xs={6}>
            {authData && authData.id == comment.creator.id ? (
              <Button
                style={{
                  marginLeft: "20%",
                  marginTop: "5px",
                  width: "100%",
                }}
                variant="danger"
                onClick={() => {
                  mutation.mutate(comment.id);
                }}
              >
                Delete
              </Button>
            ) : (
              <></>
            )}
          </Col>
        </Row>
      </Row>
    </>
  );
};
