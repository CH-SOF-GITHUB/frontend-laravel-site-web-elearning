import React, { createElement, useState } from "react";
import { Comment, Avatar, Tooltip } from "antd";
import "antd/dist/antd.css";
import {
  LikeOutlined,
  DislikeFilled,
  DislikeOutlined,
  LikeFilled
} from "@ant-design/icons";
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

const CommentBlock = ({ comment, onReply }) => {
  // To maintain Like state
  const [likesCount, setLikesCount] = useState(0);
  // To maintain Dislike state
  const [dislikesCount, setDislikesCount] = useState(0);
  // To maintain action state
  const [action, setAction] = useState(null);

  // Ensure replies is an array
  const replies = comment.replies || [];

  return (
    <div style={{display: "block"}} key={comment.id}>
      <Comment
        author={<a>{comment.author}</a>}
        avatar={
          <Avatar style={{ backgroundColor: "green" }}>
            {comment.author[0]}
          </Avatar>
        }
        content={<p>{comment.text}</p>}
        actions={[
          <Tooltip title="Like">
            <span
              onClick={() => {
                setLikesCount(1);
                setDislikesCount(0);
                setAction("liked");
              }}
            >
              {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
              {likesCount}
            </span>
          </Tooltip>,
          <Tooltip title="Dislike">
            <span
              onClick={() => {
                setLikesCount(0);
                setDislikesCount(1);
                setAction("disliked");
              }}
            >
              {React.createElement(
                action === "disliked" ? DislikeFilled : DislikeOutlined
              )}
              {dislikesCount}
            </span>
          </Tooltip>
        ]}
        datetime={
          comment.created_at
            ? new Date(comment.created_at).toLocaleDateString()
            : "Date non disponible"
        }
      />
    </div>
  );
};

export default CommentBlock;
