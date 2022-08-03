import React from "react";

export const RestaurantDetails = ({ data }) => {
  return (
    <div>
      <div className="header">
        <h1>{data.name}</h1>
        <h3>
          <ul className="header-list">
            <li>
              Tables: {data.available_tables}/{data.tables_quantity}
            </li>
            <li> Rate : {data.avg_rate}</li>
          </ul>
        </h3>
      </div>
      <div className="body">
        <h2>Address: {data.address}</h2>
        <h2>Phone number: {data.phone_number}</h2>
      </div>
    </div>
  );
};
