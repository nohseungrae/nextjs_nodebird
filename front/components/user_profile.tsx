import React, { useCallback } from "react";
import { Card, Avatar, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequestAction } from "../reducers/user";

interface IProps {}

const UserProfile: React.FC<IProps> = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state: any) => state.user);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);
  return (
    <Card
      actions={[
        <div key="twit">{me.Posts.length}</div>,
        <div key="followings">{me.Followings.length}</div>,
        <div key="followers">{me.Followers.length}</div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.nickname}</Avatar>}
        title={me.nickname[0]}
      />
      <Button onClick={onLogOut} loading={logOutLoading}>
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;
