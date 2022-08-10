import { useState } from "react";
import { useParams } from "react-router-dom";
import { DishesList } from "./DishesList";
import { RestaurantDetails } from "./restaurantDashboard/RestaurantDetails";
import { RestaurantComments } from "./comments/RestaurantComments";
import { RestaurantBook } from "./restaurantDashboard/RestaurantBook";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { AlertMessage } from "../../components/AlertMessage";

import "./Restaurant.css";
export const Restaurant = () => {
  const { id } = useParams();
  const { data, status, refetch } = useQuery(
    ["restaurant"],
    () => fetch(`/api/restaurant/${id}`).then((response) => response.json()),
    { refetchOnWindowFocus: "always" }
  );
  const [alertMessage, setAlertMessage] = useState({
    status: false,
    alert: "danger",
    body: "",
  });
  const { token } = useSelector((state) => state.auth);
  if (status === "error") {
    return <div>An error occured during connection</div>;
  }

  return (
    <div>
      {status === "loading" ? (
        <div> Loading...</div>
      ) : (
        <div>
          <AlertMessage
            alertMessage={alertMessage}
            setAlertMessage={setAlertMessage}
          />
          <RestaurantDetails data={data} />
          <RestaurantBook
            data={data}
            token={token}
            setAlertMessage={setAlertMessage}
          />

          <DishesList data={data} />
          <RestaurantComments data={data} RestaurantId={id} refetch={refetch} />
        </div>
      )}
    </div>
  );
};
