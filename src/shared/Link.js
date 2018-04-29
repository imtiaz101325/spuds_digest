import styled from "styled-components";
import { Link } from "react-router-dom";

import { titleMixin } from "./Text";

export const BrandLink = styled(Link)`
  font-family: "Roboto Slab", serif;
  font-size: 48px;
  color: #feffff;
  margin: 0;
  padding: 1rem 2rem;
  text-decoration: none;
`;

export const TitleLink = styled(Link)`
  ${titleMixin};
  text-decoration: none;
`;

export const NavLink = styled(Link)`
  ${titleMixin};
  padding: 0;
  font-size: 20px;
`;
