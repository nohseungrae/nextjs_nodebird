import Link from "next/link";
import React from "react";

interface IPostCardContentProps {
  postData: string;
}

const PostCardContent: React.FC<IPostCardContentProps> = ({ postData }) => {
  console.log();
  return (
    <div>
      {/* 사용자의 의도가 아니면 절대 바뀔 일이 없는 애 그러므로 index를 키로 써도 괜찮다 */}
      {postData.split(/(#[^\s#]+)/g).map((v, i) => {
        if (v.match(/(#[^\s#]+)/)) {
          return (
            <Link key={i} href={`/hashtag/${v.slice(1)}`}>
              <a>{v}</a>
            </Link>
          );
        }
        return v;
      })}
    </div>
  );
};

export default PostCardContent;
