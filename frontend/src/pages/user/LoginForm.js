import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../store';

const LoginForm = (props) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const submitLogin = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        // 로컬 스토리지 저장
        let jwtToken = res.headers.get('Authorization');
        localStorage.setItem('Authorization', jwtToken);
        return res.json();
      })
      .then((res) => {
        console.log(res);
        if (res.code === 1) {
          // 로그인 상태 값 리덕스 저장
          dispatch(userLogin(res.data));
          props.history.push('/');
        } else {
          alert('아이디 혹은 비번을 다시 입력하세요!');
        }
      });
  };

  const changeValue = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          name="username"
          onChange={changeValue}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          name="password"
          onChange={changeValue}
        />
      </Form.Group>
      <br />
      <Button variant="dark" size="lg" type="submit" onClick={submitLogin}>
        로그인
      </Button>
      <br />
      <br />
      <Button
        variant="dark"
        size="sm"
        onClick={() => props.history.push('/SearchIdForm')}
      >
        아이디 찾기
      </Button>
      <Button
        variant="dark"
        size="sm"
        onClick={() => props.history.push('/SearchPasswordForm')}
      >
        비밀번호 찾기
      </Button>
      <t />
    </Form>
  );
};

export default LoginForm;
