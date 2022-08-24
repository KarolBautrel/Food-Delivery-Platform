import { useState } from "react";
import { useParams } from "react-router-dom";
import { DishesList } from "./DishesList";
import { RestaurantDetails } from "./restaurantDashboard/RestaurantDetails";
import { RestaurantComments } from "./comments/RestaurantComments";
import { RestaurantBook } from "./restaurantDashboard/RestaurantBook";
import { useSelector } from "react-redux";
import { AlertMessage } from "../../components/AlertMessage";
import { useRestaurantQuery } from "./api/useRestaurantQuery";
import "./Restaurant.css";
export const Restaurant = () => {
  const { id } = useParams();

  const { restaurantQuery } = useRestaurantQuery(id);
  const [alertMessage, setAlertMessage] = useState({
    status: false,
    alert: "danger",
    body: "",
  });
  const { token } = useSelector((state) => state.auth);
  if (restaurantQuery.status === "error") {
    return <div>An error occured during connection</div>;
  }

  return (
    <div>
      {restaurantQuery.status === "loading" ? (
        <div> Loading...</div>
      ) : (
        <div>
          <AlertMessage
            alertMessage={alertMessage}
            setAlertMessage={setAlertMessage}
          />
          <RestaurantDetails data={restaurantQuery.data} />
          <RestaurantBook
            data={restaurantQuery.data}
            token={token}
            setAlertMessage={setAlertMessage}
          />

          <DishesList data={restaurantQuery.data} />
          <RestaurantComments data={restaurantQuery.data} RestaurantId={id} />
        </div>
      )}
    </div>
  );
};
