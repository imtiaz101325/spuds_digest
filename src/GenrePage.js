import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getAllGenre } from "./genre_duck";

import { isLoading, isInitial } from "./utils/api_utils";

import Navigation from "./Navigation";
import GenreRow from "./GenreRow";
import Title from "./shared/Text";
import Container, { Content } from "./shared/PageContainer";

class GenrePage extends Component {
  state = {
    genre: {}
  };

  componentDidMount() {
    const { initial, getAllGenre, getGenre, match } = this.props;

    if (initial) {
      getAllGenre();
    } else {
      this.setState({
        genre: getGenre(match.params.genreID)
      });
    }
  }

  componentWillReceiveProps(nextPorps) {
    if (this.props.loading !== nextPorps.loading && !nextPorps.loading) {
      const genreID = nextPorps.match.params.genreID;

      this.setState({
        genre: nextPorps.getGenre(genreID)
      });
    }
  }

  render() {
    const { loading } = this.props;
    const {
      genre: { name, id }
    } = this.state;

    return (
      <Container>
        <Navigation />
        <Content>
          {loading ? (
            "Loading..."
          ) : (
            <div>
              <Title>{name}</Title>
              {id && <GenreRow id={id} count={10} />}
            </div>
          )}
        </Content>
      </Container>
    );
  }
}

GenrePage.propropTypes = {
  match: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  getGenre: id => state.entities.genre[id],
  loading: isLoading(state.genre.status),
  initial: isInitial(state.genre.status)
});

const mapDispatchToProps = dispatch => ({
  getAllGenre: () => dispatch(getAllGenre())
});

export default connect(mapStateToProps, mapDispatchToProps)(GenrePage);
