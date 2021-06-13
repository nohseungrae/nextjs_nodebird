import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/app_layout";
import PostCard from "../components/post_card";
import PostForm from "../components/post_form";
import { LOAD_POST_REQUEST } from "../types/post.types";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state: any) => state?.user);
  const { mainPosts, hasMorePost, loadPostLoading } = useSelector(
    (state: any) => state?.post
  );

  useEffect(() => {
    dispatch({
      type: LOAD_POST_REQUEST,
    });
  }, []);

  useEffect(() => {
    function onScroll(e: any) {
      const dynamicScrollY = window.scrollY;
      const clientHeight = document.documentElement.clientHeight;
      const allScrollY = document.documentElement.scrollHeight;
      if (
        hasMorePost &&
        !loadPostLoading &&
        dynamicScrollY + clientHeight > allScrollY - 200
      ) {
        dispatch({
          type: LOAD_POST_REQUEST,
        });
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasMorePost, loadPostLoading]);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};
export default Home;
