import React from "react";
import styled from "styled-components";

import { BrandLink, NavLink as RawNavLink } from "./shared/Link";

const Header = styled.nav`
  width: 100%;
  height: 8em;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Nav = styled.div`
  margin-right: 2em;
`;

const NavLink = RawNavLink.extend`
  padding: 0 1em;
`;

const Navigation = () => (
  <Header>
    <BrandLink to="/">Spud's Digest</BrandLink>
    <Nav>
      <NavLink to="/watchlist">watchlist</NavLink>
      <NavLink to="/recent">recent</NavLink>
    </Nav>
  </Header>
);

export default Navigation;
