import { Button, Form, Input } from "antd";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import useInput from "../hooks/useInput";

interface ICommentFormProps {
  post: any;
}

const CommentForm: React.FC<ICommentFormProps> = ({ post }) => {
  const id = useSelector((state: any) => state.user.me?.id);
  const [commentText, onChangeCommentText] = useInput("");
  const onSubmitComment = useCallback(() => {}, [commentText]);
  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: "relative", margin: 0 }}>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          rows={4}
        />
        <Button
          style={{ position: "absolute", right: 0, bottom: -40 }}
          type={"primary"}
          htmlType={"submit"}
        >
          삐약
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommentForm;
