import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

import { isSuccess } from "./utils/api_utils";
import { addToWatchList } from "./account_duck";

const Container = styled.div`
  text-align: center;
  padding: 0.5em;
`;

const AddLink = styled.a`
  font-family: "Open Sans", sans-serif;
  color: #def2f1;
  cursor: pointer;
  text-decoration: none;
`;

const WatchList = ({ id, userID, success, history, location }) => {
  if (
    window.localStorage &&
    !!window.localStorage.getItem("sessionID") &&
    location.pathname !== "/watchlist"
  ) {
    return (
      <Container>
        <AddLink
          onClick={async () => {
            if (success) {
              try {
                const response = await addToWatchList(userID, id);
                if (response.status_code === 1) {
                  history.push("/watchlist");
                }
              } catch (err) {
                // todo
              }
            }
          }}
        >
          Add to watchlist
        </AddLink>
      </Container>
    );
  }

  return null;
};

WatchList.propTypes = {
  id: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  userID: state.user.account.id,
  success: isSuccess(state.user.account.status)
});

export default compose(withRouter, connect(mapStateToProps))(WatchList);
