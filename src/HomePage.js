import React from "react";
import styled from "styled-components";

import GenreList from "./GenreList";
import Container from "./shared/PageContainer";

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
