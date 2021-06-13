import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";

const { User } = require("../models");

export default passport.use(
  new Strategy(
    {
      //req.body 필드 !!
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({
          where: {
            email,
          },
        });
        if (!user) {
          return done(null, false, { message: "존재하지 않는 사용자입니다." });
        }
        const result = bcrypt.compare(password, user.password);
        if (result) {
          return done(null, user);
        }
        return done(null, false, { message: "비밀번호가 틀렸습니다." });
      } catch (error) {
        console.error(error);
        return done(error);
      }
    }
  )
);
