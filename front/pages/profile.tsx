import Head from "next/head";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AppLayout from "../components/app_layout";
import FollowList from "../components/follow_list";
import NickNameEditForm from "../components/nickname_edit_form";
import Router from "next/router";

export interface IFollowList {
  nickname: string;
}

const Profile: React.FC = () => {
  const { me } = useSelector((state: any) => state.user);
  useEffect(() => {
    if (!(me && me.id)) {
      Router.push("/");
    }
  }, [me && me.id]);
  if (!me) {
    return null;
  }
  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NickNameEditForm />
        <FollowList header={"팔로잉"} data={me.Followings} />
        <FollowList header={"팔로워"} data={me.Followers} />
      </AppLayout>
    </>
  );
};
export default Profile;
