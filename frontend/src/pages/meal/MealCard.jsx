import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
export const MealCard = ({ data, token }) => {
  const redirect = useNavigate();
  const handleClick = async (id) => {
    try {
      const response = await fetch("/api/cart/add-to-cart", {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product: id }),
      });
      if (response.ok) {
        redirect("/cart");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row className="card">
      <Col>
        <Row>
          <Col>
            <h4>Description:</h4>
            <h5>{data.description}</h5>
            <h6>Ingredients: {data.ingredient}</h6>
          </Col>
          <Col>
            <h4>Price: {data.price} PLN</h4>
            <button
              onClick={() => {
                handleClick(data.id);
              }}
              className="button"
            >
              Add to cart
            </button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
