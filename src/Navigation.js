import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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

const Navigation = () => (
  <Header>
    <Link to="/">
      <Brand>Spud's Digest</Brand>
    </Link>
  </Header>
);

export default Navigation;
