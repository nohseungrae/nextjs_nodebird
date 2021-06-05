import Head from "next/head";
import React from "react";
import AppLayout from "../components/app_layout";

const Profile: React.FC = () => {
  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>프로필 페이지</AppLayout>
    </>
  );
};
export default Profile;
