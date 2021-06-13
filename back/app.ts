import express, { Request, Response } from "express";
import postRouter from "./routes/post";
import userRouter from "./routes/user";
import cors from "cors";

const db = require("./models");
const app = express();
const passportConfig = require("./passport");
app.use(
  cors({
    //나중에 우리의 도메인 주소만 허용해주겠다 할 수 있음
    origin: "*",
    //https 사용하겠다
    credentials: false,
  })
);
passportConfig();
//프론트에서 json형태의 데이터를 req.body안에 넣어줌
app.use(express.json());
//프론트에서 form 형태의 데이터를 req.body안에 넣어줌
app.use(express.urlencoded({ extended: true }));
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
