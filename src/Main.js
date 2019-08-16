import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { fetchProducts } from './redux/actions';
import styled from 'styled-components';

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
]


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
  2019,
]

const MainWrapper = styled.div`
text-align: center;
`

const HeaderWrapper = styled.h1`
`

const SearchAreaWrapper = styled.div` 
display: flex;
justify-content: center;

`

const StyledInput = styled.input`
width: 50%;
`

const StyledSelect = styled.select`
height: ${ props => props.inputHeight}
background: white;
`

const StyledButton = styled.button`
height: ${ props => props.inputHeight};
transition: box-shadow .3s;
background: white;
border: 1px solid black;
:hover {
  box-shadow: 1 2 11px rgba(33,33,33,.2); 
}
`

const ResultsWrapper = styled.div`
display: grid;
margin: 0px 10%;
max-width: 100%
`

const StyledLink = styled.a`
width: 100%;
text-decoration: none;
color: black;

`
const CarItemWrapper = styled.div`
display: grid;
grid-template-columns: 1fr 3fr 1fr 1fr;
`
const DealerName = styled.h2`
margin: 0px;
`
const CarHeadline = styled.h2`
margin: 0px;
text-align: left;
`

const CarPrice = styled.h3`
margin: 0px;
text-align: left;
`

const CrossedOutPrice = styled(CarPrice)`
text-decoration: line-through;
color: grey;
font-size: 90%;
`

const CarItemFooter = styled.div`
display: grid
grid-template-columns: 1fr 1fr 1fr;
`


const ItemWrapper = styled.div`
min-width:100%;
:hover{
  background: #EEEEEE;
}
`

const ImageWrapper = styled.div`
display: grid;
align-content: center;
`

const inputHeight = "50px";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      make: '',
      model: '',
      year: '',
      noGeo: false,
      city: '',
      latitude: null,
      longitude: null
    };
  }

  componentDidMount() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(result => this.setState({ latitude: result.coords.latitude, longitude: result.coords.longitude }, () => console.log(this.state)))
    } else {
      this.setState({ noGeo: true })
    }
  }

  changeMake = event => {
    this.setState({ make: event.target.value });
  }

  changeModel = event => {
    this.setState({ model: event.target.value });
  }

  changeCity = event => {
    this.setState({ city: event.target.value });
  }

  changeYear = event => {
    this.setState({ year: event.target.value });
  }

  renderOptions = (cars) => {
    return (
      <option key={cars} value={cars}>{cars}</option>
    );
  }

  renderYears = years => {
    return (
      <option key={years} value={years}>{years}</option>
    );
  }


  render() {
    console.log(this.props.redux)
    return (
      <MainWrapper>
        <HeaderWrapper>Car Search App</HeaderWrapper>
        <SearchAreaWrapper>

          <StyledSelect
            inputHeight={inputHeight}
            value={this.state.make}
            type="text"
            onChange={this.changeMake}
          >
            {makes.map(this.renderOptions)}
          </StyledSelect>
          <StyledInput
            inputHeight={inputHeight}
            value={this.state.model}
            type="text"
            onChange={this.changeModel}
            placeholder="Model"
          />

          <StyledSelect
            inputHeight={inputHeight}
            value={this.state.year}
            type="text"
            onChange={this.changeYear}
          >
            {years.map(this.renderYears)}
          </StyledSelect>

          <StyledButton inputHeight={inputHeight}
            onClick={() => this.props.dispatch(fetchProducts(this.state.make, this.state.model, this.state.year, this.state.city, this.state.latitude, this.state.longitude))}>
            Submit Vehicle
            </StyledButton>
          <StyledButton inputHeight={inputHeight}
            onClick={() => this.setState({ noGeo: !this.state.noGeo })}>{this.state.noGeo ? 'Use GeoLocation' : 'Change City'}
          </StyledButton>
        </SearchAreaWrapper>
        {this.state.noGeo &&
          <SearchAreaWrapper>
            <StyledInput
              inputHeight={inputHeight}
              value={this.state.city}
              type="text"
              onChange={this.changeCity}
            />
          </SearchAreaWrapper>
        }
        <h1>
          {this.props.redux.loading && <div>Loading...</div>}
          {this.props.redux.error && <div>Error. Please Try another vehicle Model</div>}
          {this.props.redux.items.length ? `Results for ${this.state.make} ${this.state.model} ${this.state.year}` : null}
        </h1>
        <ResultsWrapper>{this.props.redux.items.map(car =>
          <ItemWrapper >
            <StyledLink
              href={car.vdp_url}
              key={car.vin}
              target="_blank"
            >
              <CarItemWrapper>
                <ImageWrapper>
                  <img src={car.media.photo_links[0]} width={150} height={100} />
                </ImageWrapper>
                <div >
                  <CarHeadline>{car.heading} </CarHeadline>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                    <div style={{ textAlign: 'left' }}>
                      <div>Mileage: {car.miles}</div>
                      <div>Engine: {car.build.engine}</div>
                      <div>Transmission: {car.build.transmission}</div>
                      <div>Drivetrain: {car.build.drivetrain}</div>
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <div>MPG (City): {car.build.city_miles}</div>
                      <div>MPG (HWY): {car.build.highway_miles}</div>
                      <div>Fuel Type: {car.build.fuel_type}</div>
                      <div>Brakes: {car.build.antibrake_sys}</div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: 'grid',
                    alignItems: 'center',
                    margin: '24px 0px'
                  }}
                >

                  <CarPrice>{car.price ? "$" + car.price.toFixed(2) : "Call for Price"}</CarPrice>
                  <CrossedOutPrice>{car.price ? car.msrp ? "MSRP: $" + car.msrp.toFixed(2) : "" : ""}</CrossedOutPrice>
                </div>
                <div>
                  <DealerName>{car.dealer.name} </DealerName>
                  <div>{car.dealer.phone} </div>
                  <div>{car.dealer.website} </div>
                </div>
              </CarItemWrapper>
              {/* <CarItemFooter>
                <DealerName>{car.dealer.name} </DealerName>
                <div>{car.dealer.phone} </div>
                <div>{car.dealer.website} </div>
              </CarItemFooter> */}
            </StyledLink>
            <br />

          </ItemWrapper>
        )}
        </ResultsWrapper>
      </MainWrapper >
    );
  }
}

const mapStateToProps = state => ({ redux: state.fetchingReducers })

export default connect(mapStateToProps, null)(Main);
