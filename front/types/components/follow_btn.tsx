import { Button } from "antd";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from "../types/user_types";

interface IProps {
  post: any;
}

const FollowButton: React.FC<IProps> = ({ post }) => {
  const dispatch = useDispatch();
  const { me, followingLoading, unFollowingLoading } = useSelector(
    (state: any) => state.user
  );
  const isFollowing = me?.Followings.find((v) => v.id === post.User.id);
  console.log(post);
  const onClickButton = useCallback(() => {
    if (isFollowing) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: post.User.id,
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: post.User.id,
      });
    }
  }, [isFollowing]);
  return (
    <Button
      loading={followingLoading || unFollowingLoading}
      onClick={onClickButton}
    >
      {isFollowing ? "언팔로우" : "팔로우"}
    </Button>
  );
};

export default FollowButton;
