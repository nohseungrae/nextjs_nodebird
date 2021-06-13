module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4", //이모티콘도 쓰려면
      collate: "utf8mb4_general_ci", //한글 저장
    }
  ); // model은 대문자 mysql은 소문자 + 복수 -> posts 테이블 생성
  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    // id content RetweetId
    db.Post.belongsTo(db.Post, { as: "Retweet" }); //리트윗을 위한 것
    db.Post.belongsToMany(db.HashTag, { through: "PostHashtag" }); // 다 대 다
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" }); // 좋아요 관계 - through를 사용하지 않으면 UserPost 라는 이름으로 생긴다.
  };
  return Post;
};
