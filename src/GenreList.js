import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getAllGenre } from "./genre_duck";

import { isLoading, isInitial } from "./utils/api_utils";

import GenreRow from "./GenreRow";
import Title from "./shared/Text";
import { Content } from "./shared/PageContainer";

class GenreList extends Component {
  componentDidMount() {
    const { initial, getAllGenre } = this.props;

    if (initial) {
      getAllGenre();
    }
  }

  render() {
    const { loading, genres } = this.props;

    return (
      <Content>
        {loading && "Loading..."}
        {genres.map(({ name, id }) => (
          <div>
            <Link to={`movies/${id}`}>
              <Title>{name}</Title>
            </Link>
            <GenreRow id={id} />
          </div>
        ))}
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  genres: state.genre.data.map(id => state.entities.genre[id]),
  loading: isLoading(state.genre.status),
  initial: isInitial(state.genre.status)
});

const mapDispatchToProps = dispatch => ({
  getAllGenre: () => dispatch(getAllGenre())
});

export default connect(mapStateToProps, mapDispatchToProps)(GenreList);
