import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Card, Form } from 'react-bootstrap';
import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import { BsFillHandThumbsUpFill } from 'react-icons/bs';
import ReplyItem from '../../components/ReplyItem';

const Detail = (props) => {
  const [replys, setReplys] = useState([]);
  const { user } = useSelector((store) => store);
  const [userId, setUserId] = useState();
  const [post, setPost] = useState({
    id: '',
    title: '',
    content: '',
    user: {
      id: 0,
    },
  });
  const [content, setContent] = useState({
    userId: '',
    postId: '',
    content: '',
  });

  const isLogin = useSelector((store) => store.isLogin);

  useEffect(() => {
    if (!isLogin) {
      alert('로그인 후 이용할 수 있습니다.');
      props.history.push('/');
      return;
    }

    let jwtTokenTemp = localStorage.getItem('Authorization');
    let jwtToken = jwtTokenTemp.replace('Bearer ', '');

    setUserId(jwt_decode(jwtToken).id);

    fetch('http://localhost:8000/post/' + props.match.params.id, {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('Authorization'),
      },
    })
      .then((res) => res.text())
      .then();

    fetch('http://localhost:8000/post/' + props.match.params.id, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('Authorization'),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.replys);
        setReplys(res.replys);
        setPost(res);
      });
  }, []);

  const deletePost = (postId) => {
    fetch('http://localhost:8000/post/' + postId, {
      method: 'DELETE',
      headers: {
        Authorization: localStorage.getItem('Authorization'),
      },
    })
      .then((res) => res.text())
      .then((res) => {
        if (res === 'ok') {
          alert('삭제완료');
          props.history.push('/');
        } else {
          alert('삭제실패');
        }
      });
  };

  const addreply = (postId) => {
    fetch('http://localhost:8000/post/' + postId + '/reply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: localStorage.getItem('Authorization'),
      },
      body: JSON.stringify(content),
    })
      .then((res) => res.text())
      .then((res) => {
        console.log(res);
        if (res === 'ok') {
          alert('댓글 추가 완료');
          props.history.push('/');
        } else {
          alert('댓글 추가 실패');
        }
      });
  };

  const changeValue = useCallback(
    (e) => {
      setContent({
        userId: userId,
        postId: post.id,
        content: e.target.value,
      });
    },
    [content],
  );
  return (
    <div>
      {post.user.id === userId ? (
        <>
          <Link to={'/updateForm/' + post.id} className="btn btn-warning">
            수정
          </Link>{' '}
          <Button
            className="btn btn-danger"
            onClick={() => deletePost(post.id)}
          >
            삭제
          </Button>
        </>
      ) : (
        ''
      )}

      <br />
      <hr />
      <h1>제목 : {post.title}</h1>
      <hr />
      <div>내용 : {post.content}</div>
      <br />
      <div>작성자 : {post.user.username}</div>
      <hr />
      <div>조회수 : {post.views}</div>
      <hr />
      <Card className="text-center">
        <Card.Body>
          <Form.Group>
            <Form.Label>댓글을 입력하세요.</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter content"
              row={5}
              name="content"
              onChange={changeValue}
            />
          </Form.Group>
          <Button
            variant="dark"
            type="submit"
            onClick={() => addreply(post.id)}
          >
            등록
          </Button>
        </Card.Body>
      </Card>

      <hr />
      {replys.map((reply) => (
        <ReplyItem
          key={reply.id}
          props={props}
          userId={userId}
          post={post}
          reply={reply}
        />
      ))}
      <hr />
    </div>
  );
};

export default Detail;
