import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Users(props) {
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      props.history.push('/signin');
    }
  }, []);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:4000/api/auth/users', {
        headers: {
          Authorization: localStorage.token
        }
      })
      .then(res => {
        setUsers([...res.data]);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <h1>You need to log in</h1>
    </>
  );
}
