import React, { Component } from "react";
import { connect } from "react-redux";

import { getAllGenre } from "./genre_duck";

import { isLoading, isInitial } from "./utils/api_utils";

import GenreRow from "./GenreRow";
import { TitleLink } from "./shared/Link";
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
            <TitleLink to={`movies/${id}`}>{name}</TitleLink>
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
