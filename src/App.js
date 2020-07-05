import React, { useState, useEffect } from "react";
import "./App.css";
import Loader from "./components/Loader/Loader";
import { covidAPI } from "./api/api";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "./components/Dropdown/Dropdown";
import Cards from "./components/Cards/Cards";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [covidData, setCovidData] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [isCurrentDataEmpty, setIsCurrentDataEmpty] = useState(false);
  const [currentlyConfirmed, setCurrentlyConfirmed] = useState(0);
  const [currentlyDeaths, setCurrentlyDeaths] = useState(0);
  const [currentlyRecovered, setCurrentlyRecovered] = useState(0);
  const [lastChecked, setLastChecked] = useState(null);

  useEffect(() => {
    const foo = async () => {
      const { data: countries } = await covidAPI.getCountries();
      const current = countries[0];
      setCountries(countries);
      setCurrentCountry(current);
    };
    foo();
  }, []);

  useEffect(() => {
    const foo = async () => {
      const { data } = await covidAPI.getCountryData(currentCountry.Slug);
      console.log(data);
      if (data.length) {
        const { Confirmed, Deaths, Recovered, Date } = data[data.length - 1];
        setCurrentlyConfirmed(Confirmed);
        setCurrentlyDeaths(Deaths);
        setCurrentlyRecovered(Recovered);
        setLastChecked(Date);
        setCovidData(data);
        setIsCurrentDataEmpty(false);
      } else {
        setIsCurrentDataEmpty(true);
      }
    };
    if (currentCountry) foo();
  }, [currentCountry]);

  const onSelect = (country) => {
    setCurrentCountry(country);
  };

  return (
    <div className="container">
      {!currentCountry ? (
        <Loader />
      ) : (
        <>
          <Dropdown
            countries={countries}
            onSelect={onSelect}
            currentCountry={currentCountry.Country}
          />
          {!isCurrentDataEmpty ? (
            covidData ? (
              <Cards
                currentlyConfirmed={currentlyConfirmed}
                currentlyDeaths={currentlyDeaths}
                currentlyRecovered={currentlyRecovered}
                lastChecked={lastChecked}
              />
            ) : (
              <Loader />
            )
          ) : (
            <h1 className="mt-5 text-center">
              No data was provided for this country{" "}
              <span role="img" aria-label="Crying emoji">
                😭
              </span>
            </h1>
          )}
        </>
      )}
    </div>
  );
};

export default App;
