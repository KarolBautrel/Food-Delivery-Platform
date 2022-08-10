import { useState } from "react";
import Button from "react-bootstrap/Button";
import "./RestaurantBook.css";
import Modal from "react-bootstrap/Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

export const RestaurantBook = ({ data, token, setAlertMessage }) => {
  const redirect = useNavigate();
  const queryClient = useQueryClient();

  const [tablesQuantity, setTableQuantity] = useState(0);
  const [bookingDate, setBookingDate] = useState();
  const [show, setShow] = useState(false);

  const bookTable = async () => {
    try {
      if (bookingDate && tablesQuantity) {
        const resp = await fetch("/api/booking/book-table", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            tables_quantity: tablesQuantity,
            date: bookingDate,
            restaurant: data.id,
          }),
        });
        if (resp.ok) {
          const data = await resp.json();
          return data;
        } else {
          throw new Error("Something went wrong");
        }
      } else {
        throw new Error("All fields are required");
      }
    } catch (error) {
      setAlertMessage({
        status: true,
        variant: "danger",
        body: error.message,
      });
    }
  };

  const mutation = useMutation(bookTable, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["restaurant"]);
      console.log("bum");
      setAlertMessage({
        status: true,
        variant: "success",
        body: "You booked the table",
      });
      setShow(false);
    },
  });
  return (
    <>
      <button className="button" onClick={() => setShow(true)}>
        Book Table
      </button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Table Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="booking-form">
            <label className="booking-label">
              <span>Table Quantity</span>
              <input
                className="booking-form"
                type="number"
                required
                value={tablesQuantity}
                onChange={(e) => {
                  setTableQuantity(e.target.value);
                }}
              />
            </label>

            <label className="booking-label">
              <span>Pick date</span>
              <input
                className="booking-form"
                type="date"
                required
                value={bookingDate}
                onChange={(e) => {
                  setBookingDate(e.target.value);
                }}
              />
            </label>
            <Button
              variant="secondary"
              onClick={() => {
                mutation.mutate({
                  tables_quantity: tablesQuantity,
                  date: bookingDate,
                  restaurant: data.id,
                });
              }}
            >
              Book Table
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

<Col></Col>;
