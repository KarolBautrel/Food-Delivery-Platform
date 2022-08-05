import { Link } from "react-router-dom";
import "./DishesList.css";
import Card from "react-bootstrap/Card";
export const DishesList = ({ data }) => {
  return (
    <div>
      <div className="justify-content-around">
        {data.dishes.map((dish) => (
          <Card style={{ width: "50rem", marginLeft: "25%" }}>
            <Card.Img
              style={{ marginLeft: "35%" }}
              variant="top"
              src="holder.js/100px180"
            />
            <Card.Body style={{ marginLeft: "35%" }}>
              <Card.Title>{dish.name}</Card.Title>
              <Card.Text>Ingredients: {dish.ingredient} </Card.Text>
              <Card.Text>Price: {dish.price}</Card.Text>

              <Link to={`/meal/${dish.id}`}>
                <button className="button"> check details</button>
              </Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};
