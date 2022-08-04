import { Link } from "react-router-dom";
import "./DishesList.css";
export const DishesList = ({ data }) => {
  return (
    <div>
      <h3 style={{ marginLeft: "40%", marginTop: "25px" }}>Meals</h3>
      {data.dishes.map((dish) => (
        <div className="card" key={dish.id}>
          <div className="meal-card-header">
            <h3>{dish.name}</h3>
            <Link to={`/meal/${dish.id}`}>
              <button className="button"> check details</button>
            </Link>
          </div>
          <div className="meal-card-body">
            <h3>{dish.price} PLN</h3>
            <h3>{dish.description}</h3>
            <p>Ingredients: {dish.ingredient}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
