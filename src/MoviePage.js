import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

import { getMovieById } from "./movie_duck";

import Navigation from "./Navigation";
import WatchList from "./WatchList";
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
  align-items: flex-start;
  margin: 2em 0;
`;
const Poster = styled.img`
  height: 80vh;
  width: clac(80vh * (2/3));
`;

const DetailsColumn = styled.div`
  width: 50%;
  padding-left: 2em;
`;

const DetailsText = styled.p`
  font-family: "Open Sans", sans-serif;
  color: #17252a;
  padding-left: 1em;
`;

const DetailsLabel = styled.label`
  font-family: "Open Sans", sans-serif;
  color: #feffff;
`;

const DetailsLink = styled.p`
  font-family: "Open Sans", sans-serif;
  color: #feffff;
  text-align: center;
  cursor: pointer;
`;

class MoviePage extends Component {
  state = {
    movie: {
      meta: {
        status: "initial"
      }
    },
    showAllCast: false,
    showAllCrew: false
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
    const { movie, showAllCast, showAllCrew } = this.state;

    const loading =
      movie.meta &&
      (movie.meta.status === "initial" || movie.meta.status === "loading");

    return (
      <Container>
        <Navigation />
        <Content>
          {loading ? (
            "Loading..."
          ) : (
            <div>
              <Title>{movie.title}</Title>
              <DetailsContainer>
                <PosterColumn>
                  <div>
                    <Poster
                      src={`https://image.tmdb.org/t/p/original${
                        movie.poster_path
                      }`}
                    />
                    <WatchList id={movie.id} />
                  </div>
                </PosterColumn>
                <DetailsColumn>
                  <SubTitle>Overview</SubTitle>
                  <DetailsText>{movie.overview}</DetailsText>
                  <DetailsText>
                    <DetailsLabel>IMDB Link:</DetailsLabel>{" "}
                    {`www.imdb.com/title/${movie.imdb_id}`}
                  </DetailsText>
                  <DetailsText>
                    <DetailsLabel>Rating:</DetailsLabel> {movie.vote_average}/10
                  </DetailsText>
                  <SubTitle>Cast</SubTitle>
                  {movie.castCrew.cast
                    .slice(0, showAllCast ? movie.castCrew.cast.length - 1 : 5)
                    .map(({ character, name }) => (
                      <DetailsText>
                        {character} - {name}
                      </DetailsText>
                    ))}
                  <DetailsLink
                    onClick={() =>
                      this.setState({
                        showAllCast: !showAllCast
                      })
                    }
                  >
                    {showAllCast ? "Show Less" : "Show More"}
                  </DetailsLink>
                  <SubTitle>Crew</SubTitle>
                  {movie.castCrew.crew
                    .slice(0, showAllCrew ? movie.castCrew.crew.length - 1 : 5)
                    .map(({ job, name }) => (
                      <DetailsText>
                        {job} - {name}
                      </DetailsText>
                    ))}
                  <DetailsLink
                    onClick={() =>
                      this.setState({
                        showAllCrew: !showAllCrew
                      })
                    }
                  >
                    {showAllCrew ? "Show Less" : "Show More"}
                  </DetailsLink>
                </DetailsColumn>
              </DetailsContainer>
            </div>
          )}
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
