export const getRestaurant = async (restaurantId) => {
  const resp = await fetch(`/api/restaurant/${restaurantId}`);
  const data = await resp.json();

  return data;
};
