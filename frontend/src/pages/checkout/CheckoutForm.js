import { useState, setState } from "react";

export const CheckoutForm = (items) => {
  const [deliveryAddress, setDeliveryAddress] = useState({
    streetAddress: "",
    apartmentAddess: "",
  });

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
  return (
    <div>
      {deliveryAddressForm.map(({ name, placeholder, type, id }) => (
        <input
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
    </div>
  );
};
