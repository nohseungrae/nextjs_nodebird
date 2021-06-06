import React from "react";
import { useSelector } from "react-redux";
import AppLayout from "../components/app_layout";
import PostCard from "../components/post_card";
import PostForm from "../components/post_form";

const Home: React.FC = () => {
  const { isLoggedIn } = useSelector((state: any) => state?.user);
  const { mainPosts } = useSelector((state: any) => state?.post);
  return (
    <AppLayout>
      {isLoggedIn && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};
export default Home;
