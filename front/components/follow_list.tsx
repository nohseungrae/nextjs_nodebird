import { Button, Card, List } from "antd";
import { StopOutlined } from "@ant-design/icons";
import React from "react";
import { IFollowList } from "../pages/profile";

interface IFollowListProps {
  header: string;
  data: IFollowList[];
}

const FollowList: React.FC<IFollowListProps> = ({ header, data }) => {
  return (
    <List
      style={{ marginBottom: 20 }}
      size="small"
      grid={{ gutter: 4, xs: 2, md: 3 }}
      header={<div>{header}</div>}
      loadMore={
        <div style={{ textAlign: "center", margin: "10px 0" }}>
          <Button>더 보기</Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item: IFollowList) => {
        return (
          <List.Item style={{ marginTop: 20 }}>
            <Card actions={[<StopOutlined key={"stop"} />]}>
              <Card.Meta description={item.nickname} />
            </Card>
          </List.Item>
        );
      }}
    ></List>
  );
};

export default FollowList;
