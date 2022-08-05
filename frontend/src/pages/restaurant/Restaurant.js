import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { DishesList } from "./DishesList";
import { RestaurantDetails } from "./RestaurantDetails";
import { RestaurantComments } from "./RestaurantComments";
import { RestaurantBook } from "./RestaurantBook";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./Restaurant.css";
export const Restaurant = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useFetch(`/api/restaurant/${id}`);
  const [showModal, setShowModal] = useState(false);
  const { token } = useSelector((state) => state.auth);
  if (isError) {
    return <div>An error occured during connection</div>;
  }

  const popUpModal = () => {
    showModal ? setShowModal(false) : setShowModal(true);
  };
  return (
    <div>
      {isLoading ? (
        <div> Loading...</div>
      ) : (
        <div>
          <RestaurantDetails data={data} />
          {showModal && <RestaurantBook data={data} token={token} />}
          <button
            style={{ marginLeft: "10%" }}
            onClick={popUpModal}
            className="button"
          >
            Get Table !
          </button>
          <DishesList data={data} />
          <RestaurantComments data={data} />
        </div>
      )}
    </div>
  );
};
