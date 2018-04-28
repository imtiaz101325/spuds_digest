import React from "react";

import Navigation from "./Navigation";
import GenreList from "./GenreList";
import Container from "./shared/PageContainer";

const HomePage = () => (
  <Container>
    <Navigation />
    <GenreList />
  </Container>
);

export default HomePage;
