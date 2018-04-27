import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { getAllGenre } from "./genre_duck";

import { isLoading } from "./utils/api_utils";

import GenreRow from "./GenreRow";

const Content = styled.section`
  width: 90%;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-family: "Roboto Slab", serif;
  font-size: 32px;
  color: #feffff;
  margin: 0;
  padding: 0.5em 0;
`;

class GenreList extends Component {
  componentDidMount() {
    this.props.getAllGenre();
  }

  render() {
    const { loading, genres } = this.props;

    return (
      <Content>
        {loading && "Loading..."}
        {genres.map(({ name, id }) => (
          <div>
            <Title>{name}</Title>
            <GenreRow id={id} />
          </div>
        ))}
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  genres: state.genre.data.map(id => state.entities.genre[id]),
  loading: isLoading(state.genre.status)
});

const mapDispatchToProps = dispatch => ({
  getAllGenre: () => dispatch(getAllGenre())
});

export default connect(mapStateToProps, mapDispatchToProps)(GenreList);
