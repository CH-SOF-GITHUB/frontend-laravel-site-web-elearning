import React from "react";
import { Avatar } from "antd";
// Inline styles for better design
const styles = {
  commentContent: {
    flex: 1
  },
  authorName: {
    margin: "0 0 5px 0",
    fontWeight: "bold"
  }
};

const Comment = ({ comment, onReply }) => {
  // Ensure replies is an array
  const replies = comment.replies || [];

  return (
    <div className="comment-card">
      <p className="comment-avatar">{comment.author[0]}</p>
      <div style={styles.commentContent}>
        <h4 style={styles.authorName}>{comment.author}</h4>
        <p>{comment.text}</p>
      </div>
      {replies.length > 0 && (
        <ul>
          {replies.map((reply) => (
            <li key={reply.id}>
              <Comment
                comment={reply}
                onReply={onReply}
                className="reply-comment"
              />
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => onReply(comment.id)}>Reply</button>
    </div>
  );
};

export default Comment;
