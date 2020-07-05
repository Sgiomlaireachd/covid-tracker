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
  const [currentCountry, setCurrentCountry] = useState("");
  const [currentlyConfirmed, setCurrentlyConfirmed] = useState([]);
  const [currentlyDeaths, setCurrentlyDeaths] = useState([]);
  const [currentlyRecovered, setCurrentlyRecovered] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);

  useEffect(() => {
    const foo = async () => {
      const { data: countries } = await covidAPI.getCountries();
      setCountries(countries);
      setCurrentCountry(countries[0].Slug);
    };
    foo();
  }, []);

  useEffect(() => {
    const foo = async () => {
      const { data } = await covidAPI.getCountryData(currentCountry);
      const { Confirmed, Deaths, Recovered, Date } = data[data.length - 1];
      debugger;
      setCurrentlyConfirmed(Confirmed);
      setCurrentlyDeaths(Deaths);
      setCurrentlyRecovered(Recovered);
      setLastChecked(Date);
      setCovidData(data);
    };
    if (currentCountry.length) foo();
  }, [currentCountry]);

  const onSelect = ({ Country, Slug, ISO2 }) => {
    setCurrentCountry(Slug);
  };

  return (
    <div className="container">
      {!countries.length ? (
        <Loader />
      ) : (
        <>
          <Dropdown countries={countries} onSelect={onSelect} />
          {covidData.length ? (
            <Cards
              currentlyConfirmed={currentlyConfirmed}
              currentlyDeaths={currentlyDeaths}
              currentlyRecovered={currentlyRecovered}
              lastChecked={lastChecked}
            />
          ) : null}
        </>
      )}
    </div>
  );
};

export default App;
