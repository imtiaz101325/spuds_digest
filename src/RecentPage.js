import React from "react";
import { connect } from "react-redux";

import Container, { Content } from "./shared/PageContainer";
import Navigation from "./Navigation";
import MovieCard, { MovieBlock } from "./MovieCard";
import Title from "./shared/Text";

const RecentPage = ({ movies }) => (
  <Container>
    <Navigation />
    <Content>
      <Title>Recently Visited</Title>
      <MovieBlock>
        {movies.map(({ title, poster_path, id, genre_ids, genres }) => (
          <MovieCard
            id={id}
            genreID={(genre_ids && genre_ids[0]) || (genres && genres[0])}
            title={title}
            image={`https://image.tmdb.org/t/p/original${poster_path}`}
          />
        ))}
      </MovieBlock>
    </Content>
  </Container>
);

const mapStateToProps = state => ({
  movies: state.user.visited.map(id => state.entities.movie[id])
});

export default connect(mapStateToProps)(RecentPage);
