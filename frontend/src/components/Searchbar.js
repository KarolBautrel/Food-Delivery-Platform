import { useState } from "react";
import "./Searchbar.css";
export const Searchbar = ({ handleSearch }) => {
  const [searchingTerm, setSearchingTerm] = useState("");

  return (
    <div className="searchbar-container">
      <div className="searchbar-form">
        <label>
          <input
            placeholder="Search restaurant"
            value={searchingTerm}
            onChange={(e) => {
              setSearchingTerm(e.target.value);
            }}
          />
        </label>
        <button
          onClick={() => {
            handleSearch(searchingTerm);
          }}
          className="button search-button"
        >
          Search
        </button>
      </div>
    </div>
  );
};
