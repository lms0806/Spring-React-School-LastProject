import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store';

const Myinfo = (props) => {
  const { user } = useSelector((store) => store);
  const [users, setUsers] = useState({
    username: user.username,
    password: '',
    email: user.email,
  });
  const dispatch = useDispatch();
  const [pCount, setpCount] = useState(0);
  const [rCount, setrCount] = useState(0);

  useEffect(() => {
    fetch('http://localhost:8000/myinfo/postCount/' + user.id, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('Authorization'),
      },
    })
      .then((res) => res.text())
      .then((res) => {
        setpCount(res);
      });

    fetch('http://localhost:8000/myinfo/replyCount/' + user.id, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('Authorization'),
      },
    })
      .then((res) => res.text())
      .then((res) => {
        setrCount(res);
      });
  }, []);

  console.log('rcount : ' + rCount);
  console.log('pcount : ' + pCount);

  const deleteuser = () => {
    fetch('http://localhost:8000/user/' + user.id, {
      method: 'DELETE',
      headers: {
        Authorization: localStorage.getItem('Authorization'),
      },
    })
      .then((res) => res.text())
      .then((res) => {
        console.log(res);
        if (res === 'ok') {
          alert('회원탈퇴 완료');
          localStorage.removeItem('Authorization');
          dispatch(logout());
          props.history.push('/');
        } else {
          alert('회원탈퇴 실패');
        }
      });
  };

  const updateuser = () => {
    console.log(users);
    fetch('http://localhost:8000/user/' + user.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(users),
    })
      .then((res) => res.text())
      .then((res) => {
        console.log(res);
        if (res === 'ok') {
          alert('회원수정 완료');
          props.history.push('/');
        } else {
          alert('회원수정 실패');
        }
      });
  };

  const changeValue = (e) => {
    setUsers({
      ...users,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <Card>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <Link to={'/post/search/' + user.username + '/writer'}>
              게시글 수
            </Link>
            : {pCount}
          </blockquote>
          <br />
          <blockquote className="blockquote mb-0">
            댓글 수 : {rCount}
          </blockquote>
        </Card.Body>
      </Card>
      <br />
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder={user.username}
            name="username"
            readOnly
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter password"
            name="password"
            onChange={changeValue}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder={user.email}
            name="email"
            readOnly
          />
        </Form.Group>
        <Button variant="dark" size="lg" onClick={updateuser}>
          회원수정
        </Button>
      </Form>
      <br />
      <Button variant="dark" size="lg" onClick={deleteuser}>
        회원탈퇴
      </Button>
    </div>
  );
};

export default Myinfo;
