import React, { useCallback } from "react";
import { Card, Avatar, Button } from "antd";

interface IProps {
  setIsLoggedIn: Function;
}

const UserProfile: React.FC<IProps> = ({ setIsLoggedIn }) => {
  const onLogOut = useCallback(() => {
    setIsLoggedIn(false);
  }, []);
  return (
    <Card
      actions={[
        <div key="twit">짹짹</div>,
        <div key="followings">팔로잉</div>,
        <div key="followers">팔로워</div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>NOLEC</Avatar>}
        title={"로그인 성공 후 프로필"}
      />
      <Button onClick={onLogOut}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
