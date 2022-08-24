import { useEffect, useState } from "react";

export function useGeolocation() {
  const [city, setCity] = useState([]);

  const getGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function (pos) {
        const [lat, lon] = [pos.coords.latitude, pos.coords.longitude];
        const response = await fetch(
          `https://geocode.xyz/${lat},${lon}?geoit=json&auth=468016896624561516439x32094`
        );
        const data = await response.json();
        setCity(data.city);
      });
    }
  };
  useEffect(() => {
    getGeolocation();
  }, []);

  return { city: city };
}
