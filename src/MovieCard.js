import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import WatchList from "./WatchList";

export const MovieBlock = styled.div`
  width: 100%;
  padding: 0.5em 2em;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const MovieMedia = styled.img`
  height: 50vh;
  width: calc(50vh * (2 / 3));
`;
const MovieLabel = styled.h3`
  padding: 0 1em;
  margin: 0 auto;
  text-align: center;
`;
const MovieCardContainer = styled.div`
  width: calc(50vh * (2 / 3));
`;

const MovieCard = withRouter(({ id, title, image, history, genreID }) => (
  <MovieCardContainer>
    <div onClick={() => history.push(`/movies/${genreID}/${id}`)}>
      <MovieMedia src={image} />
      <MovieLabel>{title}</MovieLabel>
    </div>
    <WatchList id={id} />
  </MovieCardContainer>
));

export default MovieCard;
