import { useState, useEffect } from "react";
import "./RestaurantComments.css";
import { useSelector } from "react-redux";
import CommentForm from "./CommentForm";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CommentCard } from "./CommentCard";
export const RestaurantComments = ({ data, RestaurantId }) => {
  const { token } = useSelector((state) => state.auth);
  const [commentsData, setCommentsData] = useState(data || []);
  const authData = JSON.parse(window.localStorage.getItem("AUTH_CREDENTIALS"));

  async function handleRefresh() {
    try {
      const resp = await fetch(`/api/restaurant/${RestaurantId}`);
      if (resp.ok) {
        const data = await resp.json();
        setCommentsData(data);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <Row>
        <h1 style={{ marginLeft: "40%" }}>Comments</h1>
        <Col>
          {commentsData.comments.map((comment) => (
            <div key={comment.id}>
              <CommentCard
                comment={comment}
                authData={authData}
                handleRefresh={handleRefresh}
                token={token}
              />
            </div>
          ))}
        </Col>
        <Col>
          {token && (
            <div>
              <CommentForm data={commentsData} handleRefresh={handleRefresh} />
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};
