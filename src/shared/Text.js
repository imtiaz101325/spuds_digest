import styled, { css } from "styled-components";

export const titleMixin = css`
  font-family: "Roboto Slab", serif;
  font-size: 32px;
  color: #feffff;
  margin: 0;
  padding: 0.5em 0;
`;

const Title = styled.h2`
  ${titleMixin};
`;

export const SubTitle = styled.h3`
  ${titleMixin};
  font-size: 24px;
`;

export default Title;
