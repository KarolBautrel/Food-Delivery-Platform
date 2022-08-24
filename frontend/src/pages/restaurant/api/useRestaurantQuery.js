import { getRestaurant } from "./requests/getRestaurant";
import { useQuery } from "@tanstack/react-query";

const restaurantQueryKey = "restaurant";

export const useRestaurantQuery = (restaurantId) => {
  console.log(restaurantId);
  const restaurantQuery = useQuery([restaurantQueryKey, restaurantId], () =>
    getRestaurant(restaurantId)
  );

  return { restaurantQuery };
};
