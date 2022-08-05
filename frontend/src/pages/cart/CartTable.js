import { useEffect, useState, useCallback } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { BiPlus, BiMinus } from "react-icons/bi";
import "./CartTable.css";

export const CartTable = ({ data, isLoading, token, handleRefresh }) => {
  const handleDecreaseQuantity = (id) => {
    fetch("api/order-summary/update-quantity", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product: id }),
    });
  };

  const handleIncreaseQuantity = (id) => {
    console.log(id);
    fetch("api/cart/add-to-cart", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product: id }),
    });
  };

  const displayDecreaseQuantity = (e) => {
    console.log(e, "tutaj");
  };
  return (
    <div>
      {isLoading ? (
        <div>Loading... </div>
      ) : (
        <div className="card">
          <Table striped className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Restaurant</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order) => (
                <tr key={order.id}>
                  <td>{order.item.name}</td>
                  <td>{order.item.restaurant}</td>
                  <td className="quantity">
                    <BiMinus
                      className="clicker"
                      style={{ marginTop: "6px" }}
                      onClick={(e) => {
                        handleDecreaseQuantity(order.item.id);
                      }}
                    >
                      -
                    </BiMinus>
                    <h5> {order.quantity} </h5>
                    <BiPlus
                      className="clicker"
                      style={{ marginTop: "5px" }}
                      onClick={(e) => {
                        handleIncreaseQuantity(order.item.id);
                      }}
                    >
                      +
                    </BiPlus>
                  </td>
                  <th>{order.final_price}</th>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      <Button variant="success" style={{ marginLeft: "40%" }}>
        Proceed to checkout
      </Button>
    </div>
  );
};
