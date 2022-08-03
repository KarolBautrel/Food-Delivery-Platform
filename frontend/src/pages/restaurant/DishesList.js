import React from "react";

export const DishesList = ({ data }) => {
  return (
    <div>
      <h3 style={{ marginLeft: "40%", marginTop: "25px" }}>Meals</h3>
      {data.dishes.map((dish) => (
        <div className="card">
          <h2>{dish.name}</h2>
          <h3>{dish.price} PLN</h3>
          <h3>{dish.description}</h3>
          <p>Ingredients: {dish.ingredient}</p>
        </div>
      ))}
    </div>
  );
};
