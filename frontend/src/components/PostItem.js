import React from 'react';
import { Link } from 'react-router-dom';

const PostItem = ({ id, title, writer, views }) => {
  console.log(title);
  console.log('작성자 : ' + writer);
  return (
    <tbody>
      <tr>
        <td>{id}</td>
        <td>
          <Link to={'/post/' + id} variant="primary">
            {title}
          </Link>
        </td>
        <td>{writer}</td>
        <td>{views}</td>
      </tr>
    </tbody>
  );
};

export default PostItem;
