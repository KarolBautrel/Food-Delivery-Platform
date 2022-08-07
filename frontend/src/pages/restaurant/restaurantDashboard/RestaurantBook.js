import { useState } from "react";
import Button from "react-bootstrap/Button";
import "./RestaurantBook.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
export const RestaurantBook = ({ data, token }) => {
  const redirect = useNavigate();
  const [tablesQuantity, setTableQuantity] = useState(0);
  const [bookingDate, setBookingDate] = useState();
  console.log(data.id);
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

  return (
    <Container className="card booking-container">
      <Row>
        <Col>
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
        </Col>
      </Row>
      <Button onClick={handleClick} className="booking-btn" variant="success">
        Book it !
      </Button>
    </Container>
  );
};
