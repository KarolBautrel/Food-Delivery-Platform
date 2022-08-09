import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { DishesList } from "./DishesList";
import { RestaurantDetails } from "./restaurantDashboard/RestaurantDetails";
import { RestaurantComments } from "./comments/RestaurantComments";
import { RestaurantBook } from "./restaurantDashboard/RestaurantBook";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./Restaurant.css";
export const Restaurant = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useFetch(`/api/restaurant/${id}`);
  const { token } = useSelector((state) => state.auth);

  if (isError) {
    return <div>An error occured during connection</div>;
  }

  return (
    <div>
      {isLoading ? (
        <div> Loading...</div>
      ) : (
        <div>
          <RestaurantDetails data={data} />
          <RestaurantBook data={data} token={token} />

          <DishesList data={data} />
          <RestaurantComments data={data} RestaurantId={id} />
        </div>
      )}
    </div>
  );
};
