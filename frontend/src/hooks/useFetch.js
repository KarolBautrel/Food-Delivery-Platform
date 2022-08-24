import { useEffect, useState } from "react";

export default function useFetch(url, token = null) {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("idle");
  const getData = async () => {
    try {
      let res;
      setStatus("pending");
      if (token === null) {
        res = await fetch(url);
      } else {
        res = await fetch(url, {
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
    getData();
  }, [url]);

  return {
    data: data,
    isLoading: status === "idle" || status === "pending",
    isError: status === "rejected",
  };
}
