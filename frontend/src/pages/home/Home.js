import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { RestaurantsList } from "./RestaurantsList";
import { RecentComments } from "./RecentComments";
import { Searchbar } from "../../components/Searchbar";
import "./Home.css";
export default function Home() {
  const [url, setUrl] = useState("/api/restaurants");
  const { data, isLoading, isError } = useFetch(url);

  const handleSearch = (name) => {
    setUrl(`/api/restaurants?name=${name}`);
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
      <Searchbar handleSearch={handleSearch} />
      <RestaurantsList data={data} isLoading={isLoading} />
      <RecentComments />
    </div>
  );
}
