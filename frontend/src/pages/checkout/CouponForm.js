import { useState, setState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { reducePriceByCoupon } from "../../redux/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const CouponForm = ({ authData, price }) => {
  const [coupon, setCoupon] = useState("");
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const proceedCoupon = async () => {
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

  const mutation = useMutation(proceedCoupon, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["summary"]);
    },
  });
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
      <Button
        variant="success"
        onClick={() => {
          mutation.mutate({
            user: authData.id,
            coupon: coupon,
          });
        }}
      >
        Release Coupon
      </Button>
    </>
  );
};
