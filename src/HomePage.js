import React from "react";
import styled from "styled-components";

import GenreList from "./GenreList";

const Container = styled.div`
  background-color: #3aafa9;
  width: 100vw;
  height: 100vh;
  overflow: auto;
`;

const Header = styled.nav`
  width: 100%;
  height: 8em;
  display: flex;
  align-items: center;
`;

const Brand = styled.h1`
  font-family: "Roboto Slab", serif;
  font-size: 48px;
  color: #feffff;
  margin: 0;
  padding: 1rem 2rem;
`;

const HomePage = () => (
  <Container>
    <Header>
      <Brand>Spud's Digest</Brand>
    </Header>
    <GenreList />
  </Container>
);

export default HomePage;
