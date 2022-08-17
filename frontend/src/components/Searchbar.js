import { useState } from "react";
import Button from "react-bootstrap/Button";

import "./Searchbar.css";
export const Searchbar = ({ handleSearch }) => {
  const [searchingTerm, setSearchingTerm] = useState("");

  return (
    <div className="searchbar-container">
      <div className="searchbar-form">
        <label>
          <input
            placeholder="Search by city"
            value={searchingTerm}
            onChange={(e) => {
              setSearchingTerm(e.target.value);
            }}
          />
        </label>
        <Button
          variant="outline-secondary"
          onClick={() => {
            handleSearch(searchingTerm);
          }}
          className="button search-button"
        >
          Search
        </Button>
      </div>
    </div>
  );
};
