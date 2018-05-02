import styled from "styled-components";

import media from "./MediaTemplate";

const Container = styled.div`
  background-color: #3aafa9;
  width: 100vw;
  height: 100vh;
  overflow: auto;
`;

export const Content = styled.section`
  width: 90%;
  margin: 0 auto;
  ${media.tablet`
    width: 95%s;
  `};
`;

export default Container;
