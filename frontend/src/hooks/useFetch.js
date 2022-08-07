import { useEffect, useState } from "react";

export default function useFetch(url, token = null) {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("idle");
  const getData = async (fetchURL) => {
    try {
      let res;
      setStatus("pending");
      if (token === null) {
        res = await fetch(fetchURL);
      } else {
        res = await fetch(fetchURL, {
          method: "GET",
          headers: { Authorization: `Token ${token}` },
        });
      }
      const data = await res.json();
      setData(data);
      setStatus("approved");
    } catch (error) {
      setStatus("rejected");
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData(url);
  }, [url]);

  return {
    data: data,
    isLoading: status === "idle" || status === "pending",
    isError: status === "rejected",
  };
}
