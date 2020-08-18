import TextField from '@material-ui/core/TextField/TextField';
import React, { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { BASE_URL } from '../../data_service/constants';
import { getAuthTokenHeaders } from '../../authUtils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  margin: 50px auto;
  padding: 15px 25px;
  background-color: aliceblue;
`;

const Title = styled.div`
  font-size: 24px;
  text-align: center;
  font-weight: 600;
`;

const Error = styled.div`
  color: red;
`;

const SubTitle = styled.div`
  font-size: 18px;
  text-align: center;
`;

export const AUTH_TOKEN = 'auth_token';
export const AUTH_TOKEN_IV = 'auth_token_iv';

export const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState('');

  const login = async () => {
    const res = await axios.post(`${BASE_URL}/auth`, {
      username, password
    }, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (res.data.result === false) {
      setError('login failed');
    } else {
      document.cookie = `${AUTH_TOKEN}=${res.data.result.encryptedData}`;
      document.cookie = `${AUTH_TOKEN_IV}=${res.data.result.iv}`;
      window.location.reload();
    }
  };

  return (
    <Container>
      <Title>Product Manager</Title>
      <SubTitle>Login</SubTitle>
      <br/>
      <br/>
      <TextField
        value={username}
        placeholder="Username"
        onChange={(event) => setUsername(event.target.value)}
      />
      <br/>
      <br/>

      <TextField
        value={password}
        placeholder="Password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <br/>
      {error && <Error>wrong login details</Error>}
      <br/>
      <br/>

      <Button onClick={login}>Login</Button>
    </Container>
  )
};
