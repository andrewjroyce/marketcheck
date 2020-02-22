import React from "react";
import { connect } from "react-redux";

const Status = ({ fetching, search }) => {
  const statusFunction = () => {
    if (fetching.loading) {
      return <div>Loading...</div>;
    } else if (fetching.error) {
      return <div>Error. Please Try another vehicle Model</div>;
    } else if (fetching.items.length) {
      return (
        <div>
          Results for {search.make} {search.model} {search.year}
        </div>
      );
    }
    return null;
  };

  return <h1>{statusFunction()}</h1>;
};

const mapStateToProps = state => ({
  fetching: state.fetchingReducers,
  search: state.searchReducers
});

export default connect(mapStateToProps, null)(Status);
