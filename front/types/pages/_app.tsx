import { AppProps } from "next/dist/next-server/lib/router/router";
import Head from "next/head";
import "antd/dist/antd.css";
import wrapper from "../store/configure_store";
import withReduxSaga from "next-redux-saga";
import { NextPage } from "next";

//페이지에 공통되는 것들 처리하기 위해
const MyApp: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  console.log({ ...pageProps });
  return (
    <>
      <Head>
        <meta charSet={"utf-8"} />
        <title>NodeBird</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};
export default wrapper.withRedux(withReduxSaga(MyApp));
