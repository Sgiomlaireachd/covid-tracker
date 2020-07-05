import React from "react";
import Card from "../Card/Card";
import "./Cards.css";

export default ({
  currentlyConfirmed,
  currentlyDeaths,
  currentlyRecovered,
  lastChecked,
}) => {
  return (
    <div className="cards mt-5">
      <Card
        cardType="Confirmed"
        cases={currentlyConfirmed}
        lastChecked={lastChecked}
      />
      <Card
        cardType="Deaths"
        cases={currentlyDeaths}
        lastChecked={lastChecked}
      />
      <Card
        cardType="Recovered"
        cases={currentlyRecovered}
        lastChecked={lastChecked}
      />
    </div>
  );
};
