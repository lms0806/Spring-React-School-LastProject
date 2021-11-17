import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useHistory } from 'react-router';

const ReplyItem = ({ userId, post, reply }) => {
  const history = useHistory();

  const goBack = () => {
    history.push('/');
  };

  const deletereply = (postId, replyId) => {
    fetch('http://localhost:8000/post/' + postId + '/reply/' + replyId, {
      method: 'DELETE',
      headers: {
        Authorization: localStorage.getItem('Authorization'),
      },
    })
      .then((res) => res.text())
      .then((res) => {
        if (res === 'ok') {
          alert('삭제완료');
          {
            goBack();
          }
        } else {
          alert('삭제실패');
        }
      });
  };

  return (
    <Card>
      <Card.Body>
        {console.log(post)}
        <Card.Text>
          작성자 : {reply.user.username}
          <br /> 댓글 : {reply.content}
        </Card.Text>
        {reply.user.id === userId ? (
          <>
            <Button
              variant="dark"
              type="submit"
              onClick={() => deletereply(post.id, reply.id)}
            >
              삭제
            </Button>
          </>
        ) : (
          ''
        )}
      </Card.Body>
    </Card>
  );
};

export default ReplyItem;
