import { useState } from "react";
import { CartTable } from "./CartTable";
import { AuthChecker } from "../../utilities/AuthChecker";
import { useSelector } from "react-redux";

export const Cart = () => {
  const { token } = useSelector((state) => state.auth);

  return (
    <AuthChecker>
      <div>
        <CartTable token={token} />
      </div>
    </AuthChecker>
  );
};
