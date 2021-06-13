module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
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
  ); // model은 대문자 mysql은 소문자 + 복수 -> comments 테이블 생성
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User); // Comment는 User에 속한다
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
};
