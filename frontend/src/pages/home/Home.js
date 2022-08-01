import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
export default function Home() {
  const [url, setUrl] = useState("/api/users-list");
  const { data, isLoading, isError } = useFetch(url);
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        data.map((data) => (
          <div key={data.id}>
            <h1>{data.username}</h1>
          </div>
        ))
      )}
    </div>
  );
}
