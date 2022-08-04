import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Container from "react-bootstrap/Container";
import { MealCard } from "./MealCard";
import { MealHeader } from "./MealHeader";
export const Meal = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useFetch(`/api/dish/${id}`);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Container>
          <MealHeader data={data} />
          <MealCard data={data} />
        </Container>
      )}
    </div>
  );
};
