import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function SignIn(props) {
  useEffect(() => {
    if (localStorage.getItem('token')) {
      props.history.push('/users');
    }
    console.log('in Sign In!')
  }, []);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(
        'http://localhost:4000/api/auth/register',
        { username, password },
        {
          headers: {
            Authorization: localStorage.token
          }
        }
      )
      .then(res => {
        localStorage.setItem('token', res.data.token);
        props.history.push('/users');
      })
      .catch(err => {
        console.log(err);
      });
    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder='username'
      />
      <input
        type='text'
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder='password'
      />
      <button type='submit'>Sign in</button>
    </form>
  );
}
