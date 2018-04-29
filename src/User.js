import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import PropTypes from "prop-types";

import { isLoading, isInitial, isSuccess } from "./utils/api_utils";
import { getAuthToken, getSessionID } from "./auth_duck";
import { getAccountDetails } from "./account_duck";

const Container = styled.div`
  padding: 0.5em 1em;
`;

const Button = styled.button`
  font-family: "Open Sans", sans-serif;
  color: #17252a;
  background: #2b7a78;
  padding: 0.5em 1em;
  border: 0;
`;

class User extends Component {
  state = {
    loggedIn: false,
    error: false,
    message: ""
  };

  async componentDidMount() {
    const { location, history, getAccountDetails } = this.props;

    const { approved, request_token } = queryString.parse(location.search);

    if (approved) {
      history.replace(location.pathname);

      try {
        const data = await getSessionID(request_token);

        if (data.success) {
          this.setState({
            loggedIn: true
          });
          getAccountDetails();
        }
      } catch (err) {
        if (err) {
          this.setState({
            error: true,
            message: err
          });
        } else {
          this.setState({
            error: true
          });
        }
      }
    } else {
      if (window.localStorage && !!window.localStorage.getItem("sessionID")) {
        this.setState({
          loggedIn: true
        });
        getAccountDetails();
      }
    }
  }

  render() {
    const { loading, getToken, success, token } = this.props;
    const { loggedIn } = this.state;

    if (success) {
      window.location.replace(
        `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:3000/movies/`
      );
    }

    return (
      <Container>
        <Button
          onClick={() => {
            if (loggedIn) {
              window.localStorage.removeItem("sessionID");
              this.setState({
                loggedIn: false
              });
            } else {
              getToken();
            }
          }}
        >
          {loading ? "Logging in..." : loggedIn ? "Log Out" : "Log In"}
        </Button>
      </Container>
    );
  }
}

User.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  loading: isLoading(state.auth.status),
  initial: isInitial(state.auth.status),
  success: isSuccess(state.auth.status),
  token: state.auth.request_token
});

const mapDispatchToProps = dispatch => ({
  getToken: () => dispatch(getAuthToken()),
  getAccountDetails: () => dispatch(getAccountDetails())
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(User);
