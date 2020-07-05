import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

export default ({ countries, onSelect, currentCountry }) => {
  const options = countries;
  const labelOptions = countries.map((item) => item.Country);
  const currentOption = currentCountry || labelOptions[0];

  return (
    <div className="dropdown mt-4">
      <Dropdown
        options={labelOptions}
        onChange={(obj) => {
          onSelect(options.filter((item) => item.Country === obj.value)[0]);
        }}
        value={currentOption}
        placeholder="Select a country"
      />
    </div>
  );
};
