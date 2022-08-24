import { useState, setState } from "react";
import { useNavigate } from "react-router-dom";

export const CheckoutForm = ({ authData, order }) => {
  const [deliveryAddress, setDeliveryAddress] = useState({
    streetAddress: "",
    apartmentAddess: "",
  });
  const redirect = useNavigate();
  const deliveryAddressForm = [
    {
      name: "streetAddress",
      placeholder: "Street Addres",
      type: "text",
      id: "streetAddress",
    },
    {
      name: "apartmentAddress",
      placeholder: "Apartment Addres",
      type: "text",
      id: "apartmentAddress",
    },
  ];

  const handleChange = (e) => {
    setDeliveryAddress({
      ...deliveryAddress,
      [e.target.name]: e.target.value,
    });
  };
  console.log(process.env);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch("/api/order-summary/complete-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          street_address: deliveryAddress.streetAddress,
          apartment_address: deliveryAddress.apartmentAddress,
          user_id: authData.id,
        }),
      });
      if (!resp.ok) {
        throw new Error("Something went wrong");
      }

      window.location.replace(
        process.env.REACT_APP_STRIPE_SESSION_LINK + order.id
      );
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      <h3>Fullfill Shipment credentials</h3>
      <form onSubmit={handleSubmit}>
        {deliveryAddressForm.map(({ name, placeholder, type, id }) => (
          <input
            required
            key={id}
            placeholder={placeholder}
            type={type}
            name={name}
            value={deliveryAddressForm[name]}
            onChange={handleChange}
          />
        ))}

        <button style={{ marginTop: "50px" }} className="button">
          Get to the payment
        </button>
      </form>
    </div>
  );
};
