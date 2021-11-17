import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PostItem = ({ id, title }) => {
  console.log(title);
  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Link to={'/post/' + id} variant="dark" className="btn btn-dark">
          상세보기
        </Link>
      </Card.Body>
    </Card>
  );
};

export default PostItem;
