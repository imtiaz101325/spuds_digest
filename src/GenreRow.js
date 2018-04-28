import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { isLoading } from "./utils/api_utils";
import { getMoviesByGenre } from "./genre_duck";

const GenreBlock = styled.div`
  width: 100%;
  padding: 0.5em 2em;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const GenreMedia = styled.img`
  height: 90%;
  width: 100%;
`;
const GenreLabel = styled.h3`
  padding: 0 1em;
  margin: 0 auto;
  text-align: center;
`;
const GenreCardContainer = styled.div`
  height: 50vh;
  width: calc(50vh * (2 / 3));
`;

const GenreCard = withRouter(({ id, title, image, history, genreID }) => (
  <GenreCardContainer onClick={() => history.push(`/movies/${genreID}/${id}`)}>
    <GenreMedia src={image} />
    <GenreLabel>{title}</GenreLabel>
  </GenreCardContainer>
));

class GenreRow extends Component {
  componentDidMount() {
    const { id, getMovies } = this.props;

    getMovies(id);
  }

  render() {
    const { loading, movies, id: genreID } = this.props;

    return (
      <GenreBlock>
        {loading
          ? "Loading..."
          : movies.map(({ title, poster_path, id }) => (
              <GenreCard
                id={id}
                genreID={genreID}
                title={title}
                image={`https://image.tmdb.org/t/p/original${poster_path}`}
              />
            ))}
      </GenreBlock>
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
