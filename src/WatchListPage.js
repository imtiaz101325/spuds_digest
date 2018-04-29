import React, { Component } from "react";
import { connect } from "react-redux";

import { getWatchlist } from "./account_duck";
import { isSuccess, isLoading } from "./utils/api_utils";

import Container, { Content } from "./shared/PageContainer";
import Navigation from "./Navigation";
import MovieCard, { MovieBlock } from "./MovieCard";
import Title from "./shared/Text";

class WatchListPage extends Component {
  componentDidMount() {
    const {
      successWithUser,
      userID,
      getWatchlist,
      loadingWatchlist
    } = this.props;

    if (successWithUser && !loadingWatchlist) {
      getWatchlist(userID);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.successWithUser !== nextProps.successWithUser) {
      if (nextProps.successWithUser && !nextProps.loadingWatchlist) {
        nextProps.getWatchlist(nextProps.userID);
      }
    }
  }

  render() {
    const { successWithWatchlist, movies } = this.props;

    return (
      <Container>
        <Navigation />
        <Content>
          <Title>Watch List</Title>
          <MovieBlock>
            {successWithWatchlist
              ? movies.map(({ title, poster_path, id, genre_ids }) => (
                  <MovieCard
                    id={id}
                    genreID={genre_ids[0]}
                    title={title}
                    image={`https://image.tmdb.org/t/p/original${poster_path}`}
                  />
                ))
              : "Loading..."}
          </MovieBlock>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  userID: state.user.account.id,
  successWithUser: isSuccess(state.user.account.status),
  movies: state.user.watchlist.results,
  successWithWatchlist: isSuccess(state.user.watchlist.status),
  loadingWatchlist: isLoading(state.user.watchlist.status)
});

const mapDispatchToProps = dispatch => ({
  getWatchlist: id => dispatch(getWatchlist(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(WatchListPage);
