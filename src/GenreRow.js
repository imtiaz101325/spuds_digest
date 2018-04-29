import React, { Component } from "react";
import { connect } from "react-redux";

import { isLoading } from "./utils/api_utils";
import { getMoviesByGenre } from "./genre_duck";

import MovieCard, { MovieBlock } from "./MovieCard";

class GenreRow extends Component {
  componentDidMount() {
    const { id, getMovies } = this.props;

    getMovies(id);
  }

  render() {
    const { loading, movies, id: genreID } = this.props;

    return (
      <MovieBlock>
        {loading
          ? "Loading..."
          : movies.map(({ title, poster_path, id }) => (
              <MovieCard
                id={id}
                genreID={genreID}
                title={title}
                image={`https://image.tmdb.org/t/p/original${poster_path}`}
              />
            ))}
      </MovieBlock>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  movies: state.entities.genre[ownProps.id].movies.data
    .slice(0, ownProps.count || 5)
    .map(id => state.entities.movie[id]),
  loading: isLoading(state.entities.genre[ownProps.id].movies.status)
});

const mapDispatchToProps = dispatch => ({
  getMovies: id => dispatch(getMoviesByGenre(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(GenreRow);
