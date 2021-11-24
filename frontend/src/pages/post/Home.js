import React, { useState, useEffect } from 'react';
import PostItem from '../../components/PostItem';
import { Pagination, Table } from 'react-bootstrap';
import { BsFlagFill } from 'react-icons/bs';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [last, setLast] = useState('');
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch('http://localhost:8000?page=' + page, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        console.log('hi');
        console.log(res.content);
        console.log('hi');
        console.log(res.content);
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
          &nbsp;
          {page}
          &nbsp;
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

export default Home;
