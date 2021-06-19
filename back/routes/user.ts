import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import passport from "passport";
const { User } = require("../models");

const router = express.Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용중인 아이디입니다.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    // cors 처리
    // res.setHeader("Access-Control-Allow-Origin", "*" || "http://localhost:3000");
    //201 - 잘 생성됌
    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error); // status 500
  }
});

//req, res, next 를 사용하기 위해 확장하는 방식
router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    //message
    if (info) {
      return res.status(403).send(info.message);
    }
    return req.login(user, async (loginErr) => {
      //우리 서비스 로그인이 아니라 패스포트 에러
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      return res.json(user);
    });
  })(req, res, next);
});

router.post(
  "/user/logout",
  (req: Request, res: Response, next: NextFunction) => {
    req.logout();
    req.session.destroy((err) => {
      console.log(err);
    });
    res.send("ok");
  }
);

export default router;
