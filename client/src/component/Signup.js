import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default function SignUp(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(
        'http://localhost:4000/api/auth/register',
        { username, password, department },
        {
          headers: {
            Authorization: localStorage.token
          }
        }
      )
      .then(_ => {
        props.history.push('/signin');
      })
      .catch(err => {
        console.log(err);
      });
    setUsername('');
    setPassword('');
    setDepartment('');
  };
  console.log('in SIGN UP!');
  return (
    <>
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
        <input
          type='text'
          value={department}
          onChange={e => setDepartment(e.target.value)}
          placeholder='department'
        />
        <button type='submit'>Sign Up</button>
      </form>
    </>
  );
}
