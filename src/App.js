import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProjectsPage from './pages/projects/ProjectsPage';
import ProjectPage from './pages/project/ProjectPage';

const Container = styled.div`
  padding: 0 20px;
`;

function App() {
  return (
    <Container>
      <Router>
        <Switch>
          <Route exact={true} path="/projects">
            <ProjectsPage />
          </Route>
          <Route path="/projects/:projectId">
            <ProjectPage />
          </Route>
          <Route path="/">
            <ProjectsPage />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
