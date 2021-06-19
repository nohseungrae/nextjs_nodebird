import express, { Request, Response } from "express";
import postRouter from "./routes/post";
import userRouter from "./routes/user";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import passportConfig from "./passport";

const dotenv = require("dotenv");
dotenv.config();
const db = require("./models");
const app = express();
app.use(
  cors({
    //나중에 우리의 도메인 주소만 허용해주겠다 할 수 있음
    origin: "*",
    //https 사용하겠다
    credentials: false,
  })
);
passportConfig;
//프론트에서 json형태의 데이터를 req.body안에 넣어줌
app.use(express.json());
//프론트에서 form 형태의 데이터를 req.body안에 넣어줌
app.use(express.urlencoded({ extended: true }));

//로그인 했을 경우 브라우저랑 서버랑 같은 정보를 들고 있어야한다.(brower = front != back)
//서버에서 비밀번호같은 사용자 정보를 보내주면 보안의 위협 때문에 쿠키에 담아서 이상한 랜덤문자를 보낸다.
//쿠키에다가 아이디만 매칭해서 보내어 메모리 절약!!
app.use(cookieParser(process.env.COOKIE_SECRET));
//패스포트가 로그인 된 정보를 저장해야되는데 세션을 사용한다.
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: "nodebirdsecret",
  })
);
app.use(passport.initialize());
app.use(passport.session());
//CREATE TABLE IF NOT EXISTS [TABLE] sync 할 경우 테이블을 만들어야 하는데
//이미 만든 경우에는 또 만들면 안되기 때문에 이런 명령어가 쓰여진다.
db.sequelize
  .sync()
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch(console.error);

app.get("/api", (req: Request, res: Response) => {
  console.log("hello api");
});
app.use("/post", postRouter);
app.use("/user", userRouter);
app.listen(3001, () => {
  console.log("server 실행");
});
