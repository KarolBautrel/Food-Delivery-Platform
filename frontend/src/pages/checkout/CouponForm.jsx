import { useState, setState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { reducePriceByCoupon } from "../../redux/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertMessage } from "../../components/AlertMessage";

export const CouponForm = ({ authData, price, coupon, setAlertMessage }) => {
  const [couponCode, setCouponCode] = useState("");
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const proceedCoupon = async () => {
    try {
      const resp = await fetch("/api/cart/add-coupon", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: authData.id, coupon: couponCode }),
      });
      if (!resp.ok) {
        throw new Error("Code is used or does not exists");
      }
      const data = await resp.json();
      console.log(data);
      try {
        dispatch(reducePriceByCoupon({ price: data.total }));
        setAlertMessage({
          status: true,
          variant: "success",
          body: "You added your coupon!",
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      setAlertMessage({
        status: true,
        variant: "danger",
        body: "Something went wrong!",
      });
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
      {coupon ? (
        <h4>
          You used {coupon.code} coupon with {coupon.amount}$ discount
        </h4>
      ) : null}
      <h3>Total price : {price}$</h3>
      <input
        placeholder="Release Code"
        name="coupon"
        type="text"
        value={couponCode}
        onChange={(e) => {
          setCouponCode(e.target.value);
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
