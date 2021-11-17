import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchIdForm = (props) => {
  const [email, setEmail] = useState({
    email: '',
    username: '',
  });

  const submitsearchpassword = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/searchpassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(email),
    })
      .then((res) => {
        return res.text();
      })
      .then((res) => {
        console.log(res);
        if (res !== 'fail') {
          alert('가입된 아이디의 비밀번호는 ' + res + '입니다.');
          props.history.push('/loginForm');
        } else {
          alert('가입된 아이디가 없습니다.');
        }
      });
  };

  const changeValue = (e) => {
    setEmail({
      ...email,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          onChange={changeValue}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          name="username"
          onChange={changeValue}
        />
      </Form.Group>
      <br />
      <Button variant="dark" type="submit" onClick={submitsearchpassword}>
        비밀번호 찾기
      </Button>
    </Form>
  );
};

export default SearchIdForm;
