import React from "react";
import { connect } from "react-redux";
import { fetchProducts, setMake, setYear, setModel } from "./redux/actions";
import styled from "styled-components";

const makes = [
  "Alfa Romeo",
  "Aston Martin",
  "Audi",
  "Bentley",
  "BMW",
  "Bugatti",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Citroën",
  "Dacia",
  "Daewoo",
  "Dodge",
  "Donkervoort",
  "Ferrari",
  "Fiat",
  "Ford",
  "Honda",
  "Hummer",
  "Hyundai",
  "Infiniti",
  "Jaguar",
  "Jeep",
  "Kia",
  "Lada",
  "Lamborghini",
  "Land Rover",
  "Lexus",
  "Lotus",
  "Maserati",
  "Maybach",
  "Mazda",
  "McLaren",
  "Mercedes-Benz",
  "MG",
  "Mini",
  "Mitsubishi",
  "Morgan",
  "Nissan",
  "Porsche",
  "Renault",
  "Rolls-Royce",
  "Rover",
  "Saab",
  "Seat",
  "Skoda",
  "Smart",
  "Subaru",
  "Suzuki",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo"
];

const years = [
  1999,
  2000,
  2001,
  2002,
  2003,
  2004,
  2005,
  2006,
  2007,
  2008,
  2009,
  2010,
  2011,
  2012,
  2013,
  2014,
  2015,
  2016,
  2017,
  2018,
  2019
];

const SearchAreaWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledInput = styled.input`
  width: 50%;
`;

const StyledSelect = styled.select`
  height: 50px;
  background: white;
`;

const StyledButton = styled.button`
  height: 50px;
  transition: box-shadow 0.3s;
  background: white;
  border: 1px solid black;
  :hover {
    box-shadow: 1 2 11px rgba(33, 33, 33, 0.2);
  }
`;

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noGeo: false,
      city: "",
      latitude: null,
      longitude: null
    };
  }

  componentDidMount() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(result =>
        this.setState({
          latitude: result.coords.latitude,
          longitude: result.coords.longitude
        })
      );
    } else {
      this.setState({ noGeo: true });
    }
  }

  changeMake = event => {
    this.props.dispatch(setMake(event.target.value));
  };

  changeModel = event => {
    this.props.dispatch(setModel(event.target.value));
  };

  changeCity = event => {
    this.setState({ city: event.target.value });
  };

  changeYear = event => {
    this.props.dispatch(setYear(event.target.value));
  };

  renderOptions = option => {
    return (
      <option key={option} value={option}>
        {option}
      </option>
    );
  };

  render() {
    return (
      <React.Fragment>
        <SearchAreaWrapper>
          <StyledSelect
            value={this.props.search.make}
            onChange={this.changeMake}
          >
            {makes.map(this.renderOptions)}
          </StyledSelect>
          <StyledInput
            value={this.props.search.model}
            onChange={this.changeModel}
            placeholder="Model"
          />
          <StyledSelect
            value={this.props.search.year}
            onChange={this.changeYear}
          >
            {years.map(this.renderOptions)}
          </StyledSelect>
          <StyledButton
            onClick={() =>
              this.props.dispatch(
                fetchProducts(
                  this.props.search.make,
                  this.props.search.model,
                  this.props.search.year,
                  this.state.city,
                  this.state.latitude,
                  this.state.longitude
                )
              )
            }
          >
            Submit Vehicle
          </StyledButton>
          <StyledButton
            onClick={() => this.setState({ noGeo: !this.state.noGeo })}
          >
            {this.state.noGeo ? "Use GeoLocation" : "Change City"}
          </StyledButton>
        </SearchAreaWrapper>
        {this.state.noGeo && (
          <SearchAreaWrapper>
            <StyledInput value={this.state.city} onChange={this.changeCity} />
          </SearchAreaWrapper>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  fetch: state.fetchingReducers,
  search: state.searchReducers
});

export default connect(mapStateToProps, null)(Search);
