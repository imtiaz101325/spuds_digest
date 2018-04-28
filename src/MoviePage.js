import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

import { getMovieById } from "./movie_duck";

import Navigation from "./Navigation";
import Container, { Content } from "./shared/PageContainer";
import Title, { SubTitle } from "./shared/Text";

const DetailsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

const PosterColumn = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 2em;
`
const Poster = styled.img`
  height: 80vh;
  width: clac(80vh * (2/3));
`;

const DetailsColumn = styled.div`
  width: 50%;
  padding-left: 2em;
`;

const OverviewRow = styled.p`
  padding-left: 1em;
`
class MoviePage extends Component {
  state = {
    movie: {
      meta: {
        status: "initial"
      }
    }
  };

  async componentDidMount() {
    const { match, getMovieFromState, getMovieFromAPI } = this.props;

    const movieID = match.params.movieID;
    const movie = getMovieFromState(movieID);

    if (movie) {
      if (movie.meta.byGenre) {
        const response = await getMovieFromAPI(movieID);

        this.setState({
          movie: response
        });
      } else {
        this.setState({
          movie
        });
      }
    } else {
      const response = await getMovieFromAPI(movieID);

      this.setState({
        movie: response
      });
    }
  }

  render() {
    const { movie } = this.state;

    const loading =
      movie.meta &&
      (movie.meta.status === "initial" || movie.meta.status === "loading");

    return (
      <Container>
        <Navigation />
        <Content>
          {
            loading 
              ? "Loading..."
              : <div>
                  <Title>{movie.title}</Title>
                  <DetailsContainer>
                    <PosterColumn>
                      <Poster src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} />
                    </PosterColumn>
                    <DetailsColumn>
                      <SubTitle>Overview</SubTitle>
                      <OverviewRow>
                        {movie.overview}
                      </OverviewRow>
                    </DetailsColumn>
                  </DetailsContainer>
                </div>
          }
        </Content>
      </Container>
    );
  }
}

MoviePage.propropTypes = {
  match: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  getMovieFromState: id => state.entities.movie[id]
});

const mapDispatchToProps = dispatch => ({
  getMovieFromAPI: id => dispatch(getMovieById(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
