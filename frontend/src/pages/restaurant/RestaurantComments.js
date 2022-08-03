import React from "react";

export const RestaurantComments = ({ data }) => {
  return (
    <div>
      <h3 style={{ marginLeft: "40%", marginTop: "25px" }}>Comments</h3>
      {data.comments.map((comment) => (
        <div className="card">
          <h2>{comment.creator.name}</h2>
          <h3>Rate: {comment.rate} </h3>
          <h3>{comment.body}</h3>
        </div>
      ))}
    </div>
  );
};
