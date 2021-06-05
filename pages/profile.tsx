import Head from "next/head";
import React from "react";
import AppLayout from "../components/app_layout";
import FollowList from "../components/follow_list";
import NickNameEditForm from "../components/nickname_edit_form";

export interface IFollowList {
  nickname: string;
}

const Profile: React.FC = () => {
  const followingList: IFollowList[] = [
    { nickname: "1" },
    { nickname: "2" },
    { nickname: "3" },
  ];
  const followerList: IFollowList[] = [
    { nickname: "4" },
    { nickname: "5" },
    { nickname: "6" },
  ];
  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NickNameEditForm />
        <FollowList header={"팔로잉"} data={followingList} />
        <FollowList header={"팔로워"} data={followerList} />
      </AppLayout>
    </>
  );
};
export default Profile;
