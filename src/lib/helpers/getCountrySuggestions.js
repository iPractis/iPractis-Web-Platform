import { fetchCountries } from "../utils/fetchCountries";

// React imports
import { useEffect, useState } from "react";

export const getCountrySuggestions = (input) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchCountries();
      setCountries(data);
    };

    getCountries();
  }, []);

  return countries.filter((country) =>
    country.toLowerCase().startsWith(input.toLowerCase())
  );
};
