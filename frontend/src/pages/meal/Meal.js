import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Container from "react-bootstrap/Container";
import { MealCard } from "./MealCard";
import { MealHeader } from "./MealHeader";
import { AuthChecker } from "../../utilities/AuthChecker";
export const Meal = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useFetch(`/api/dish/${id}`);

  return (
    <AuthChecker>
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
    </AuthChecker>
  );
};
