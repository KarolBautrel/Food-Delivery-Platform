import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useSelector } from "react-redux";

function CommentForm({ data }) {
  const [comment, setComment] = useState("");
  const { token } = useSelector((state) => state.auth);
  const [rate, setRate] = useState("");
  const handleClick = async (event) => {
    try {
      const resp = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          body: comment,
          rate: rate,
          commented_subject: data.id,
        }),
      });
      if (resp.ok) {
        alert("Comment added");
      } else {
        throw new Error("something went wrong");
      }
    } catch (error) {
      alert(error);
    }
  };
  console.log(rate);
  return (
    <>
      <h3>Leave opinion below</h3>
      <FloatingLabel
        style={{ marginLeft: "2px" }}
        controlId="floatingTextarea2"
        label="Rate"
      >
        <Form.Select
          style={{ width: "60%" }}
          aria-label="Default select example"
          value={rate}
          onChange={(e) => {
            setRate(e.target.value);
          }}
        >
          <option>Open this select menu</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Form.Select>
        <Form.Control
          style={{ height: "100px", width: "60%" }}
          as="textarea"
          placeholder="Leave a comment here"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />

        <button onClick={handleClick} className="button">
          Add comment
        </button>
      </FloatingLabel>
    </>
  );
}

export default CommentForm;
