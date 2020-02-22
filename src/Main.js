import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import ResultCard from "./ResultCard";
import Search from "./Search";
import Status from "./Status";

const MainWrapper = styled.div`
  text-align: center;
`;

const ResultsWrapper = styled.div`
  display: grid;
  margin: 0px 10%;
  max-width: 100%;
`;
class Main extends React.Component {
  render() {
    return (
      <MainWrapper>
        <div>Car Search App</div>
        <Search />
        <Status />
        <ResultsWrapper>
          {this.props.fetching.items.map(car => (
            <ResultCard car={car} />
          ))}
        </ResultsWrapper>
      </MainWrapper>
    );
  }
}

const mapStateToProps = state => ({
  fetching: state.fetchingReducers,
  search: state.searchReducers
});

export default connect(mapStateToProps, null)(Main);
