import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useFetch from "../../hooks/useFetch";
import { RestaurantsList } from "./RestaurantsList";
import { RecentComments } from "./RecentComments";
import { Searchbar } from "../../components/Searchbar";
import "./Home.css";
export default function Home() {
  // const { city } = useGeolocation(); // getting Current Location
  const [url, setUrl] = useState(`/api/restaurants`);
  const { data, isLoading, isError } = useFetch(url);
  const { name } = useSelector((state) => state.auth);
  console.log(name);
  const handleSearch = (city) => {
    setUrl(`/api/restaurants?city=${city}`);
  };

  if (isError) {
    return (
      <div>
        <h3>Something went wrong</h3>
      </div>
    );
  }

  return (
    <div className="home">
      <h1>imie: {name}</h1>
      <Searchbar handleSearch={handleSearch} />
      <RestaurantsList data={data} isLoading={isLoading} />
      <RecentComments />
    </div>
  );
}
