import React, { useCallback, useMemo, useState } from "react";
import { Button, Form } from "antd";
import Link from "next/link";
import useInput from "../hooks/useInput";
import { useDispatch } from "react-redux";
import { loginAction } from "../reducers/user";

interface IProps {}

const LoginForm: React.FC<IProps> = () => {
  const dispatch = useDispatch();
  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");

  //useCallback 은 함수를 캐싱하는 것!
  //useMemo 는 값을 캐싱하는 것!

  const onSubmitForm = useCallback(() => {
    console.log(id, password);
    dispatch(loginAction({ id, password }));
  }, [id, password]);

  const loginFormStyle = useMemo(() => ({ padding: "10px" }), []);
  const btnWraaperStyle = useMemo(() => ({ marginTop: 10 }), []);
  return (
    <Form style={loginFormStyle} onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <input name="user-id" value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <input
          type={"password"}
          name="user-password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <div style={btnWraaperStyle}>
        <Button type="primary" htmlType="submit" loading={false}>
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;
