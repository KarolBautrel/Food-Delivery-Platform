import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import { useState, useEffect } from "react";
import { AlertMessage } from "../../../components/AlertMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const Bookings = ({ status, setBookingModalPopupStatus, data }) => {
  const authData = JSON.parse(window.localStorage.getItem("AUTH_CREDENTIALS"));
  const queryClient = useQueryClient();
  const [alertMessage, setAlertMessage] = useState({
    status: false,
    alert: "danger",
    body: "",
  });
  const deleteTableBooking = async (tableId) => {
    try {
      const resp = await fetch("/api/booking/delete-table", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authData.token}`,
        },
        body: JSON.stringify({ table: tableId }),
      });
      if (!resp.ok) {
        throw new Error("Error during canceling table");
      }
      setAlertMessage({
        status: true,
        variant: "success",
        body: "You canceled table reservation",
      });
    } catch (error) {
      setAlertMessage({
        status: true,
        variant: "danger",
        body: error.message,
      });
    }
  };
  const mutation = useMutation(deleteTableBooking, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["me"]);
      queryClient.invalidateQueries(["restaurants"]);
    },
  });
  return (
    <>
      <Modal
        style={{ width: "100%" }}
        show={status}
        onHide={() => {
          setBookingModalPopupStatus(false);
        }}
      >
        <AlertMessage
          alertMessage={alertMessage}
          setAlertMessage={setAlertMessage}
        />
        <Modal.Header closeButton>
          <Modal.Title>Check Bookings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {data.booked_tables ? (
              data.booked_tables.map((table) => (
                <ListGroup.Item key={table.id}>
                  <h5>
                    {table.name} at {table.date}
                  </h5>
                  <Button
                    onClick={() => {
                      mutation.mutate(table.id);
                    }}
                    variant="danger"
                  >
                    Cancel
                  </Button>
                </ListGroup.Item>
              ))
            ) : (
              <>
                <h1>Getting booked tables...</h1>
              </>
            )}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setBookingModalPopupStatus(false);
            }}
            variant="secondary"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
