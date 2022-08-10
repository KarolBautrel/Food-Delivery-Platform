import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import { useState, useEffect } from "react";
import { AlertMessage } from "../../../components/AlertMessage";
export const ChangePassword = ({ status, setPasswordModalPopupStatus }) => {
  const authData = JSON.parse(window.localStorage.getItem("AUTH_CREDENTIALS"));

  const [alertMessage, setAlertMessage] = useState({
    status: false,
    alert: "danger",
    body: "",
  });
  const [changePassword, setChangePassword] = useState({
    new_password: "",
    re__new_password: "",
    current_password: "",
  });

  const changePasswordForm = [
    {
      name: "current_password",
      id: "current_password",
      placeholder: "Current Password",
      type: "password",
    },
    {
      name: "new_password",
      id: "new_password",
      placeholder: "New Password",
      type: "password",
    },
    {
      name: "re_new_password",
      id: "re_new_password",
      placeholder: "Confirm New Password",
      type: "password",
    },
  ];

  const handleChange = (e) => {
    setChangePassword({
      ...changePassword,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    try {
      const resp = await fetch("/api/users/set_password/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authData.token}`,
        },
        body: JSON.stringify(changePassword),
      });
      if (resp.ok) {
        setAlertMessage({
          status: true,
          variant: "success",
          body: "Password Has been changed",
        });
      } else {
        throw new Error("Passwords doesnt match");
      }
    } catch (error) {
      setAlertMessage({
        status: true,
        variant: "danger",
        body: error.message,
      });
    }
  };

  return (
    <>
      <Modal
        style={{ width: "100%" }}
        show={status}
        onHide={() => {
          setPasswordModalPopupStatus(false);
        }}
      >
        <AlertMessage
          alertMessage={alertMessage}
          setAlertMessage={setAlertMessage}
        />
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {changePasswordForm.map(({ name, id, placeholder, type }) => (
              <ListGroup.Item key={id}>
                <input
                  required
                  name={name}
                  id={id}
                  placeholder={placeholder}
                  type={type}
                  value={changePasswordForm[name]}
                  onChange={handleChange}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClick} variant="primary">
            Change Password
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
