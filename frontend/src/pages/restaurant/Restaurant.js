import { useParams, useHistory } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { DishesList } from "./DishesList";
import { RestaurantDetails } from "./RestaurantDetails";
import { RestaurantComments } from "./RestaurantComments";
import "./Restaurant.css";
export const Restaurant = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useFetch(`/api/restaurant/${id}`);

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
          <DishesList data={data} />
          <RestaurantComments data={data} />
        </div>
      )}
    </div>
  );
};
