import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProjectsPage from './pages/projects/ProjectsPage';
import ProjectPage from './pages/project/ProjectPage';

function App() {
  return (
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
  );
}

export default App;
