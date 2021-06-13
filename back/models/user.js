module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING(30),
        allowNull: false, // 필수
        unique: true,
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false, // 필수
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false, // 필수
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", //한글 저장
    }
  ); // model은 대문자 mysql은 소문자 + 복수 -> users 테이블 생성
  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" }); //좋아요 관계
    db.User.belongsToMany(db.User, {
      through: "Follow", // 테이블 아이디를 바꿔주는 것이다.
      as: "Followers", //별칭
      foreignKey: "FollowingId",
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings", //별칭
      foreignKey: "FollowerId",
      //중간 테이블에서 구별하는 id 의 이름이 같은 테이블이면 같기 때문에 forigenKey로 이름을 바꿔주어 비교하는 것이다.
    });
  };
  return User;
};
