import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function CommentForm() {
  return (
    <>
      <h1>Leave a comment below</h1>
      <FloatingLabel
        style={{ marginLeft: "2px" }}
        controlId="floatingTextarea2"
        label="Comments"
      >
        <Form.Control
          style={{ height: "191px", width: "60%" }}
          as="textarea"
          placeholder="Leave a comment here"
        />
      </FloatingLabel>
    </>
  );
}

export default CommentForm;
