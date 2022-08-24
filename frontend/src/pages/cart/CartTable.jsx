import { useEffect, useState, useCallback } from "react";
import useFetch from "../../hooks/useFetch";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { BiPlus, BiMinus } from "react-icons/bi";
import "./CartTable.css";
import { useNavigate } from "react-router-dom";

export const CartTable = ({ token }) => {
  const [url, setUrl] = useState("/api/cart");
  const { data, isLoading, isError } = useFetch(url, token);

  window.localStorage.setItem("CART", JSON.stringify(data));
  const localStorageData = JSON.parse(window.localStorage.getItem("CART"));
  const [tableData, setTableData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const redirect = useNavigate();
  useEffect(() => {
    setTableData(localStorageData ? localStorageData : data);
    setTotalPrice(
      tableData
        .map((orderItem) => orderItem.final_price)
        .reduce((order, acc) => order + acc, 0)
    );
  }, [data]);

  useEffect(() => {
    setTotalPrice(
      tableData
        .map((orderItem) => orderItem.final_price)
        .reduce((order, acc) => order + acc, 0)
    );
  }, [tableData]);

  const handleUpdateItemQty = async (id, updateType) => {
    try {
      let url =
        updateType === "increase"
          ? "api/cart/add-to-cart"
          : "api/cart/remove-from-cart";

      const response = await fetch(url, {
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
              </tr>
            </thead>
            <tbody>
              {tableData.map((order) => (
                <tr key={order.id}>
                  <td>{order.item.name}</td>
                  <td>{order.item.restaurant}</td>
                  <td className="quantity">
                    {order.quantity !== 1 ? (
                      <BiMinus
                        className="clicker"
                        style={{ marginTop: "6px" }}
                        onClick={() => {
                          handleUpdateItemQty(order.item.id, "decrease");
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
                        handleUpdateItemQty(order.item.id, "increase");
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
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}

              <tr>
                <th>Total price</th>
              </tr>

              <tr>
                <td>{totalPrice}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}
      {totalPrice === 0 ? null : (
        <Button
          variant="success"
          style={{ marginLeft: "40%" }}
          onClick={() => {
            window.localStorage.setItem("CART", JSON.stringify(tableData));
            redirect("/checkout/");
          }}
        >
          Proceed to checkout
        </Button>
      )}
    </div>
  );
};
