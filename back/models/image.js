module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      src: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", //한글 저장
    }
  ); // model은 대문자 mysql은 소문자 + 복수 -> images 테이블 생성
  Image.associate = (db) => {
    db.Image.belongsTo(db.Post);
  };
  return Image;
};
