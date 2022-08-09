import { useState } from "react";
import Button from "react-bootstrap/Button";
import "./RestaurantBook.css";
import Modal from "react-bootstrap/Modal";

import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
export const RestaurantBook = ({ data, token }) => {
  const redirect = useNavigate();
  const [tablesQuantity, setTableQuantity] = useState(0);
  const [bookingDate, setBookingDate] = useState();
  const [show, setShow] = useState(false);
  const handleClick = async (e) => {
    e.preventDefault();
    try {
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
        alert("You booked table");
        redirect(`/restaurant/${data.id}`);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      alert(error);
    }
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button className="button" onClick={handleShow}>
        Book Table
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Table Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="booking-form">
            <label className="booking-label">
              <span style={{ marginLeft: "43%" }}>Table Quantity</span>
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
              <span style={{ marginLeft: "50%" }}>Pick date</span>
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
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClick}>
            Book Table
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

<Col></Col>;
