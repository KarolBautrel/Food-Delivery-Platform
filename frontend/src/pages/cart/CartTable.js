import { useEffect, useState, useCallback } from "react";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { BiPlus, BiMinus } from "react-icons/bi";
import "./CartTable.css";

export const CartTable = ({ data, isLoading, token, handleRefresh }) => {
  console.log(data);
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    setTableData(data);
  }, [data]);
  console.log(tableData);
  const handleDecreaseQuantity = async (id) => {
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
        handleRefresh();
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleIncreaseQuantity = async (id) => {
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
        handleRefresh();
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      alert(error);
    }
  };

  async function handleRefresh() {
    try {
      const resp = await fetch("api/cart", {
        method: "GET",
        headers: { Authorization: `Token ${token}` },
      });
      if (resp.ok) {
        const data = await resp.json();
        setTableData(data);
      } else {
        throw new Error("Something went wrong during refresh");
      }
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
              </tr>
            </thead>
            <tbody>
              {tableData.map((order) => (
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
