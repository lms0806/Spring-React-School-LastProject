import React, { useState } from 'react';
import { Navbar, Nav, Button, FormControl, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';

const Header = () => {
  const isLogin = useSelector((store) => store.isLogin);
  const dispatch = useDispatch();
  const [types, setTypes] = useState('title');
  const [keyword, setKeyword] = useState({
    keyword: '',
  });

  const changeValue = (e) => {
    setKeyword({
      ...keyword,
      [e.target.name]: e.target.value,
    });
  };

  const logoutProc = () => {
    localStorage.removeItem('Authorization');
    dispatch(logout());
  };

  const { user } = useSelector((store) => store);
  return (
    <div>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Link to="/" className="navbar-brand">
          블로그홈
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {isLogin ? (
              <>
                <Link to="/saveForm" className="nav-link">
                  글쓰기
                </Link>
                <Link to="/myinfo" className="nav-link">
                  내 정보
                </Link>
                <Link to="/loginForm" className="nav-link" onClick={logoutProc}>
                  로그아웃
                </Link>
              </>
            ) : (
              <>
                <Link to="/loginForm" className="nav-link">
                  로그인
                </Link>
                <Link to="/joinForm" className="nav-link">
                  회원가입
                </Link>
              </>
            )}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              as="select"
              value={types}
              aria-label="Default select example"
              onChange={(e) => {
                setTypes(e.target.value);
              }}
            >
              <option value="title">제목</option>
              <option value="content">내용</option>
              <option value="writer">작성자</option>
            </Form.Control>
            <t />
            <FormControl
              type="search"
              placeholder="Search"
              name="keyword"
              className="me-2"
              aria-label="Search"
              onChange={changeValue}
            />
            <Link to={'/post/search/' + keyword.keyword + '/' + types}>
              <Button variant="outline-success">Search</Button>
            </Link>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <br />
    </div>
  );
};

export default Header;
