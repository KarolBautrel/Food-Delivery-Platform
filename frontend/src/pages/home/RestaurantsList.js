import { Link } from "react-router-dom";
import "./RestaurantsList.css";
export const RestaurantsList = ({ data, isLoading }) => {
  return (
    <div className="restaurants-container">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        data.map((data) => (
          <div className="card" key={data.id}>
            <div className="restaurant-card-header">
              <h1>{data.name} </h1>
              <h4>Rate: {data.avg_rate}/5</h4>
            </div>
            <h3>
              Address: {data.city}, {data.address}
            </h3>
            <Link
              to={`restaurant/${data.id}`}
              className="button restaurant-details-btn"
            >
              See details
            </Link>
          </div>
        ))
      )}
    </div>
  );
};
