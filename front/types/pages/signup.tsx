import { Button, Checkbox, Form } from "antd";
import Head from "next/head";
import React, { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/app_layout";
import useInput from "../hooks/useInput";
import { SIGN_UP_REQUEST } from "../types/user_types";

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const { signUpLoading } = useSelector((state: any) => state.user);

  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");

  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const onChangePasswordCheck = useCallback(
    (e: any) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [passwordCheck]
  );

  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e: any) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(email, nickname, password);
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname },
    });
  }, [email, password, passwordCheck, term]);

  const errorStyle = useMemo(() => ({ color: "red" }), []);
  return (
    <AppLayout>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email">이메일</label>
          <br />
          <input
            name="user-email"
            value={email}
            onChange={onChangeEmail}
            type={"email"}
            required
          />
        </div>
        <div>
          <label htmlFor="user-nickname">닉네임</label>
          <br />
          <input
            name="user-nickname"
            value={nickname}
            onChange={onChangeNickname}
            required
          />
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
        <div>
          <label htmlFor="user-passwordCheck">비밀번호 체크</label>
          <br />
          <input
            type={"password"}
            name="user-passwordCheck"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
            required
          />
          {passwordError && (
            <div style={errorStyle}>비밀번호가 일치하지 않습니다.</div>
          )}
        </div>
        <div>
          <Checkbox name={"user-term"} checked={term} onChange={onChangeTerm}>
            노렉의 말을 잘 들을 것을 동의합니다.
          </Checkbox>
          {termError && <div style={errorStyle}>약관에 동의하셔야 합니다.</div>}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type={"primary"} htmlType={"submit"} loading={signUpLoading}>
            가입하기
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};
export default SignUp;
