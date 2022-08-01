import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("idle");

  const getData = async () => {
    try {
      setStatus("pending");
      const res = await fetch(url);
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
