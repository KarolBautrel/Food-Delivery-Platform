import { useState, setState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { reducePriceByCoupon } from "../../redux/order";

export const CouponForm = ({ items, authData, price }) => {
  const [coupon, setCoupon] = useState("");
  const dispatch = useDispatch();
  const handleClick = async () => {
    const resp = await fetch("/api/cart/add-coupon", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: authData.id, coupon: coupon }),
    });
    if (!resp.ok) {
      throw new Error("Code is used or does not exists");
    }
    const data = await resp.json();
    console.log(data);
    try {
      dispatch(reducePriceByCoupon({ price: data.total }));
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <h3>Total price : {price}</h3>
      <input
        placeholder="Release Code"
        name="coupon"
        type="text"
        value={coupon}
        onChange={(e) => {
          setCoupon(e.target.value);
        }}
      />
      <Button variant="success" onClick={handleClick}>
        Release Coupon
      </Button>
    </>
  );
};
