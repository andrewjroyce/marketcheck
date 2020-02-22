import React from "react";
import styled from "styled-components";

const StyledLink = styled.a`
  width: 100%;
  text-decoration: none;
  color: black;
`;
const CarItemWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 1fr;
`;
const DealerName = styled.h2`
  margin: 0px;
`;
const CarHeadline = styled.h2`
  margin: 0px;
  text-align: left;
`;

const CarPrice = styled.h3`
  margin: 0px;
  text-align: left;
`;

const CrossedOutPrice = styled(CarPrice)`
  text-decoration: line-through;
  color: grey;
  font-size: 90%;
`;

const ItemWrapper = styled.div`
  min-width: 100%;
  :hover {
    background: #eeeeee;
  }
`;

const ImageWrapper = styled.div`
  display: grid;
  align-content: center;
`;

const ResultCard = ({ car }) => {
  return (
    <ItemWrapper>
      <StyledLink href={car.vdp_url} key={car.vin} target="_blank">
        <CarItemWrapper>
          <ImageWrapper>
            <img
              alt={car.heading}
              src={car.media.photo_links[0]}
              width={150}
              height={100}
            />
          </ImageWrapper>
          <div>
            <CarHeadline>{car.heading}</CarHeadline>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr"
              }}
            >
              <div style={{ textAlign: "left" }}>
                <div>Mileage: {car.miles}</div>
                <div>Engine: {car.build.engine}</div>
                <div>Transmission: {car.build.transmission}</div>
                <div>Drivetrain: {car.build.drivetrain}</div>
              </div>
              <div style={{ textAlign: "left" }}>
                <div>MPG (City): {car.build.city_miles}</div>
                <div>MPG (HWY): {car.build.highway_miles}</div>
                <div>Fuel Type: {car.build.fuel_type}</div>
                <div>Brakes: {car.build.antibrake_sys}</div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              alignItems: "center",
              margin: "24px 0px"
            }}
          >
            <CarPrice>
              {car.price ? "$" + car.price.toFixed(2) : "Call for Price"}
            </CarPrice>
            <CrossedOutPrice>
              {car.price
                ? car.msrp
                  ? "MSRP: $" + car.msrp.toFixed(2)
                  : ""
                : ""}
            </CrossedOutPrice>
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
  );
};

export default ResultCard;
