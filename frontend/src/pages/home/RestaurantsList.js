import React from "react";
import "./RestaurantsList.css";
export const RestaurantsList = ({ data, isLoading }) => {
  return (
    <div className="restaurants-container">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        data.map((data) => (
          <div className="card" key={data.id}>
            <div className="header">
              <h1>{data.name} </h1>
              <h4>
                Tables: {data.available_tables}/{data.tables_quantity}
              </h4>
            </div>
            <h3>
              Address: {data.city}, {data.address}
            </h3>
          </div>
        ))
      )}
    </div>
  );
};
