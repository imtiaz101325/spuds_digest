import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { accountActions } from "./account_duck";

const Container = styled.div`
  text-align: center;
  padding: 0.5em;
`;

const AddLink = styled.a`
  font-family: "Open Sans", sans-serif;
  color: ${({ remove }) => (remove ? "#ad1010" : "#def2f1")};
  cursor: pointer;
  text-decoration: none;
`;

const WatchList = ({ id, isPresent, addToWatchList, removeFromWatchList }) => (
  <Container>
    <AddLink
      onClick={() => {
        if (isPresent) {
          removeFromWatchList(id);
        } else {
          addToWatchList(id);
        }
      }}
      remove={isPresent}
    >
      {isPresent ? "Remove from watchlist" : "Add to watchlist"}
    </AddLink>
  </Container>
);

WatchList.propTypes = {
  id: PropTypes.number.isRequired
};

const mapStateToProps = (state, { id }) => ({
  isPresent: state.user.watchlist.indexOf(id) !== -1
});

const mapDispatchToProps = dispatch => ({
  addToWatchList: id => dispatch(accountActions.account.watchlist.add(id)),
  removeFromWatchList: id =>
    dispatch(accountActions.account.watchlist.remove(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(WatchList);
