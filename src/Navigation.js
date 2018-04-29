import React from "react";
import styled from "styled-components";

import { BrandLink } from "./shared/Link";
import User from "./User";

const Header = styled.nav`
  width: 100%;
  height: 8em;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Navigation = () => (
  <Header>
    <BrandLink to="/">Spud's Digest</BrandLink>
    <User />
  </Header>
);

export default Navigation;
