import { useState } from "react";
import { CartTable } from "./CartTable";
import useFetch from "../../hooks/useFetch";
import { AuthChecker } from "../../utilities/AuthChecker";
import { useSelector } from "react-redux";

export const Cart = () => {
  const [url, setUrl] = useState("/api/cart");
  const { token } = useSelector((state) => state.auth);
  const { data, isLoading, isError } = useFetch(url, token);

  return (
    <AuthChecker>
      <div>
        <CartTable data={data} isLoading={isLoading} token={token} />
      </div>
    </AuthChecker>
  );
};
