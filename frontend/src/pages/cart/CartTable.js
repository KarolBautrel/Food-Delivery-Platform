import { useEffect, useState, useCallback } from "react";
import useFetch from "../../hooks/useFetch";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { BiPlus, BiMinus } from "react-icons/bi";
import "./CartTable.css";

export const CartTable = ({ token }) => {
  const [url, setUrl] = useState("/api/cart");
  const { data, isLoading, isError } = useFetch(url, token);

  window.localStorage.setItem("CART", JSON.stringify(data));
  const localStorageData = JSON.parse(window.localStorage.getItem("CART"));
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    setTableData(localStorageData);
  }, [data]);

  const handleDecreaseQuantity = async (id, orderId) => {
    try {
      const response = await fetch("api/order-summary/update-quantity", {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product: id }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        handleRefresh(data);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleIncreaseQuantity = async (id, orderId) => {
    try {
      const response = await fetch("api/cart/add-to-cart", {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product: id }),
      });
      if (response.ok) {
        const data = await response.json();
        handleRefresh(data);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      alert(error);
    }
  };

  const onDelete = async (id) => {
    const response = await fetch("api/cart/remove-item", {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order: id }),
    });
    if (response.ok) {
      const data = await response.json();
      setTableData(data);
    }
  };

  function handleRefresh(data) {
    try {
      setTableData((prevData) =>
        prevData.map((orderItem) =>
          orderItem.id === data.id
            ? {
                ...data,
              }
            : orderItem
        )
      );
    } catch (error) {
      alert(error);
    }
  }
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
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((order, index) => (
                <tr key={order.id}>
                  <td>{order.item.name}</td>
                  <td>{order.item.restaurant}</td>
                  <td className="quantity">
                    {order.quantity !== 1 ? (
                      <BiMinus
                        className="clicker"
                        style={{ marginTop: "6px" }}
                        onClick={() => {
                          handleDecreaseQuantity(order.item.id, order.id);
                        }}
                      >
                        -
                      </BiMinus>
                    ) : (
                      <> </>
                    )}
                    <h5> {order.quantity} </h5>
                    <BiPlus
                      className="clicker"
                      style={{ marginTop: "5px" }}
                      onClick={() => {
                        handleIncreaseQuantity(order.item.id, order.id);
                      }}
                    >
                      +
                    </BiPlus>
                  </td>
                  <th>{order.final_price}</th>
                  <td>
                    <Button
                      onClick={() => {
                        onDelete(order.id);
                      }}
                      variant="danger"
                    >
                      Delete{" "}
                    </Button>
                  </td>
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
