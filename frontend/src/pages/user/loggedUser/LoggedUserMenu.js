import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import { useState, useEffect } from "react";
import { ChangeEmail } from "./ChangeEmail";
import { ChangePassword } from "./ChangePassword";
import useFetch from "../../../hooks/useFetch";
import "./LoggedUser.css";
export const LoggedUserMenu = () => {
  const authData = JSON.parse(window.localStorage.getItem("AUTH_CREDENTIALS"));
  const { data, isLoading, isError } = useFetch("/api/me", authData.token);
  const [show, setShow] = useState(false);
  const [emailModalStatus, setEmailModalStatus] = useState(false);
  const [passwordModalStatus, setPasswordModalStatus] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseEmailModal = () => setEmailModalStatus(false);
  const handleClosePasswordModal = () => setPasswordModalStatus(false);
  return (
    <>
      <a className="rounded-border-btn" onClick={handleShow}>
        My Profile
      </a>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Profile Settings ({data.username})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            <ListGroup.Item>
              <Button
                onClick={() => {
                  setEmailModalStatus(true);
                }}
              >
                Change Email
              </Button>
              <ChangeEmail
                status={emailModalStatus}
                handleCloseEmailModal={handleCloseEmailModal}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                onClick={() => {
                  setPasswordModalStatus(true);
                }}
              >
                Change Password
              </Button>
              <ChangePassword
                status={passwordModalStatus}
                handleClosePasswordModal={handleClosePasswordModal}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <Button>Check Bookings</Button>
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
