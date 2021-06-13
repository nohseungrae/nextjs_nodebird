import React, { useState } from "react";
import Link from "next/link";
import { Col, Input, Menu, Row } from "antd";
import UserProfile from "./user_profile";
import LoginForm from "./login_form";
import styled from "styled-components";
import { useSelector } from "react-redux";

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout: React.FC = ({ children }) => {
  const { me } = useSelector((state: any) => state?.user);

  return (
    <div>
      <Menu mode={"horizontal"}>
        <Menu.Item key={1}>
          <Link href="/">
            <a>노드버드</a>
          </Link>
        </Menu.Item>
        <Menu.Item key={2}>
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item key={3}>
          <SearchInput enterButton style={{ verticalAlign: "middle" }} />
        </Menu.Item>
        <Menu.Item key={4}>
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Menu.Item>
      </Menu>
      <Row>
        <Col xs={24} sm={12} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          오른쪽 메뉴
        </Col>
      </Row>
    </div>
  );
};

export default AppLayout;
