import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProjectsPage from './pages/projects/ProjectsPage';
import ProjectPage from './pages/project/ProjectPage';
import { AUTH_TOKEN_IV, Login } from './pages/login/Login';
import axios from 'axios';
import { BASE_URL } from './data_service/constants';
import {AUTH_TOKEN} from './pages/login/Login';
import Button from '@material-ui/core/Button';
import { deleteCookie, getAuthTokenHeaders, getCookie } from './authUtils';

const Container = styled.div`
  padding: 0 20px;
`;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    (async () => {
      const res = await axios.get(`${BASE_URL}/verifyAuth`, {
        headers: getAuthTokenHeaders()
      });
      if (res.data === true) {
        setIsAuthenticated(true);
      }
    })();
  }, []);

  const onLogoutClick = () => {
    deleteCookie(AUTH_TOKEN);
    deleteCookie(AUTH_TOKEN_IV);
    window.location.reload();
  };

  if (!isAuthenticated) {
    return <Login />
  }
  return (
    <Container>
      <Button onClick={onLogoutClick}>Logout</Button>
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
