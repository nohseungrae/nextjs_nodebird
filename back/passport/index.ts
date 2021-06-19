import passport from "passport";
import local from "./local";

const { User } = require("../models");

//로그인을 했을경우 실행되는 것
passport.serializeUser((user: typeof User, done) => {
  //유저정보를 다 저장하기 힘드므로 id 만 저장
  done(user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    //DB에서 유저복구
    const user = await User.findOne({ where: id });
    done(null, user);
  } catch (error) {
    console.error(error);
    done(error);
  }
});

export default passport;
