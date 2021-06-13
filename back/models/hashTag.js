module.exports = (sequelize, DataTypes) => {
  const HashTag = sequelize.define(
    "HashTag",
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4", //이모티콘도 쓰려면
      collate: "utf8mb4_general_ci", //한글 저장
    }
  ); // model은 대문자 mysql은 소문자 + 복수 -> hashTags 테이블 생성
  HashTag.associate = (db) => {
    db.HashTag.belongsToMany(db.Post, { through: "PostHashtag" }); // 다 대 다
  };
  return HashTag;
};
