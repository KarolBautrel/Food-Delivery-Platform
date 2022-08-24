import { CheckoutForm } from "./CheckoutForm";
import { CouponForm } from "./CouponForm";
import { CheckoutHeader } from "./CheckoutHeader";
import { useQuery } from "@tanstack/react-query";
import { AlertMessage } from "../../components/AlertMessage";
import { useState, setState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export const CheckoutSummary = () => {
  const [alertMessage, setAlertMessage] = useState({
    status: false,
    alert: "danger",
    body: "",
  });
  const authData = JSON.parse(window.localStorage.getItem("AUTH_CREDENTIALS"));
  const { data, status } = useQuery(["summary"], () =>
    fetch("/api/order-summary", {
      method: "GET",
      headers: { Authorization: `Token ${authData.token}` },
    }).then((response) => response.json())
  );

  if (status === "loading") return <div>Loading...</div>;
  if (status === "error") return <div>Error</div>;
  const orderData = data[0];
  return (
    <div>
      <AlertMessage
        alertMessage={alertMessage}
        setAlertMessage={setAlertMessage}
      />
      <div className="card" style={{ width: "50%", marginLeft: "25%" }}>
        <CheckoutHeader orders={orderData} />
        <Row>
          <Col>
            <CheckoutForm authData={authData} order={orderData} />
          </Col>
          <Col>
            <CouponForm
              authData={authData}
              price={orderData.total}
              coupon={orderData.coupon}
              setAlertMessage={setAlertMessage}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};
