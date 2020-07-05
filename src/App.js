import React from "react";
import "./App.css";
import Loader from "./components/Loader/Loader";
import { covidAPI } from "./api/api";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "./components/Dropdown/Dropdown";
import Cards from "./components/Cards/Cards";

class App extends React.Component {
  state = {
    countries: [],
    covidData: [],
    currentCountry: "",
  };

  async componentDidMount() {
    const { data: countries } = await covidAPI.getCountries();

    return this.setState({
      countries,
      currentCountry: countries[0].Slug,
    });
  }

  onSelect = ({ Country, Slug, ISO2 }) => {
    this.setState({
      currentCountry: Slug,
    });
  };

  render() {
    return (
      <div className="container">
        {!this.state.countries.length ? (
          <Loader />
        ) : (
          <>
            <Dropdown
              countries={this.state.countries}
              onSelect={this.onSelect}
            />
            <Cards />
          </>
        )}
      </div>
    );
  }
}

export default App;
