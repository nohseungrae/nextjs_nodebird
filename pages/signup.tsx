import Head from "next/head";
import React from "react";
import AppLayout from "../components/app_layout";

const SignUp: React.FC = () => {
  return (
    <>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <AppLayout>회원가입 페이지</AppLayout>
    </>
  );
};
export default SignUp;
