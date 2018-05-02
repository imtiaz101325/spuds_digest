import React from "react";
import styled from "styled-components";

import { BrandLink, NavLink as RawNavlink } from "./shared/Link";

const Header = styled.nav`
  width: 100%;
  height: 8em;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavLink = RawNavlink.extend`
  margin-right: 2em;
`;

const Navigation = () => (
  <Header>
    <BrandLink to="/">Spud's Digest</BrandLink>
    <NavLink to="/watchlist">watchlist</NavLink>
  </Header>
);

export default Navigation;
