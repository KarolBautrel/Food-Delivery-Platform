import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import { useState, useEffect } from "react";

export const ChangeEmail = ({ status, handleCloseEmailModal }) => {
  const authData = JSON.parse(window.localStorage.getItem("AUTH_CREDENTIALS"));

  const [changeEmail, setChangeEmail] = useState({
    email: "",
    re_email: "",
  });
  const changeEmailForm = [
    { name: "email", id: "email", placeholder: "Email", type: "email" },
    {
      name: "re_email",
      id: "re_email",
      placeholder: "Confirm Email",
      type: "email",
    },
  ];

  const handleChange = (e) => {
    setChangeEmail({
      ...changeEmail,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    try {
      const resp = await fetch(`/api/user/change_email/${authData.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Token ${authData.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: changeEmail.email,
          re_email: changeEmail.re_email,
        }),
      });
      if (resp.ok) {
        console.log("siema");
      } else {
        throw new Error("error");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Modal show={status} onHide={handleCloseEmailModal}>
        <Modal.Header closeButton>
          <Modal.Title>Change Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {changeEmailForm.map(({ name, id, placeholder, type }) => (
              <ListGroup.Item key={id}>
                <label>
                  <input
                    id={id}
                    placeholder={placeholder}
                    type={type}
                    name={name}
                    value={changeEmailForm[name]}
                    onChange={handleChange}
                  />
                </label>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEmailModal}>
            Close
          </Button>
          <Button onClick={handleClick} variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
