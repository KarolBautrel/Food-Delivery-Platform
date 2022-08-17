import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import { useState, useEffect } from "react";
import { ChangeEmail } from "./ChangeEmail";
import { ChangePassword } from "./ChangePassword";
import { Bookings } from "./Bookings";
import { useQuery } from "@tanstack/react-query";

import useFetch from "../../../hooks/useFetch";
import "./LoggedUser.css";
export const LoggedUserMenu = () => {
  const authData = JSON.parse(window.localStorage.getItem("AUTH_CREDENTIALS"));
  const { data, status } = useQuery(["me"], () =>
    fetch("/api/me", {
      method: "GET",
      headers: { Authorization: `Token ${authData.token}` },
    }).then((response) => response.json())
  );
  console.log(data);
  const [show, setShow] = useState(false);
  const [emailModalPopupStatus, setEmailModalPopupStatus] = useState(false);
  const [passwordModalPopupStatus, setPasswordModalPopupStatus] =
    useState(false);
  const [bookingModalPopupStatus, setBookingModalPopupStatus] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error</p>;
  return (
    <>
      <Button variant="outline-secondary" onClick={handleShow}>
        My Profile
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Profile Settings ({data.name})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            <ListGroup.Item>
              <Button
                onClick={() => {
                  setEmailModalPopupStatus(true);
                }}
              >
                Change Email
              </Button>
              <ChangeEmail
                status={emailModalPopupStatus}
                setEmailModalPopupStatus={setEmailModalPopupStatus}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                onClick={() => {
                  setPasswordModalPopupStatus(true);
                }}
              >
                Change Password
              </Button>
              <ChangePassword
                status={passwordModalPopupStatus}
                setPasswordModalPopupStatus={setPasswordModalPopupStatus}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                onClick={() => {
                  setBookingModalPopupStatus(true);
                }}
              >
                Check Bookings
              </Button>
              <Bookings
                status={bookingModalPopupStatus}
                setBookingModalPopupStatus={setBookingModalPopupStatus}
                data={data}
              />
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
