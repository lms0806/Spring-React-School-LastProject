import React, { useEffect, useState } from 'react';
import { Pagination, Table } from 'react-bootstrap';
import { BsFlagFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import PostItem from '../../components/PostItem';

const Search = (props) => {
  const [posts, setPosts] = useState([]);
  const [last, setLast] = useState('');
  const [page, setPage] = useState(0);

  console.log(props.match.params.keyword);
  console.log(props.match.params.type);
  console.log(page);

  const isLogin = useSelector((store) => store.isLogin);

  useEffect(() => {
    if (!isLogin) {
      alert('로그인 후 이용할 수 있습니다.');
      props.history.push('/');
      return;
    }

    fetch(
      'http://localhost:8000/post/search/' +
        props.match.params.keyword +
        '/' +
        props.match.params.type +
        '?page=' +
        page,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: localStorage.getItem('Authorization'),
        },
      },
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        console.log('hi');
        console.log(res.content);
        console.log('hi');
        setPosts(res.content);
        setLast(res.last);
      });
  }, [page]);

  const prev = () => {
    setPage(page - 1);
  };

  const next = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>
              <BsFlagFill /> 조회수
            </th>
          </tr>
        </thead>
        {posts.map((post) => (
          <PostItem
            key={post.id}
            id={post.id}
            title={post.title}
            writer={post.user.username}
            views={post.views}
          />
        ))}
      </Table>
      <br />
      <div className="d-flex justify-content-center">
        <Pagination>
          {page === 0 ? (
            <Pagination.Item onClick={prev} disabled>
              Prev
            </Pagination.Item>
          ) : (
            <Pagination.Item onClick={prev}>Prev</Pagination.Item>
          )}
          {last === true ? (
            <Pagination.Item onClick={next} disabled>
              Next
            </Pagination.Item>
          ) : (
            <Pagination.Item onClick={next}>Next</Pagination.Item>
          )}
        </Pagination>
      </div>
    </div>
  );
};

export default Search;
