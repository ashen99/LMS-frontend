import React, { useState } from "react";
import {
  HomeOutlined,
  UsergroupAddOutlined,
  ReadOutlined,
  ShoppingCartOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const items: any = [
  {
    label: "Home",
    key: "home",
    icon: <HomeOutlined />,
    path: "/",
  },
  {
    label: "Manage Members",
    key: "member",
    icon: <UsergroupAddOutlined />,
    path: "/members",
  },
  {
    label: "Manage Books",
    key: "books",
    icon: <ReadOutlined />,
    path: "/books",
  },
  {
    label: "Issue Books",
    key: "issuebooks",
    icon: <ShoppingCartOutlined />,
    path: "/issueBooks",
  },
  {
    label: "Handle Returns",
    key: "returns",
    icon: <RedoOutlined />,
    path: "/returnBooks",
  },
];

const HeaderNav: React.FC = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("home");

  const onClick = (e: any) => {
    setCurrent(e.key);
    const selectedItem = items.find((item: any) => item.key === e.key);
    if (selectedItem) {
      console.log("Path:", selectedItem.path);
      navigate(selectedItem.path);
    }
  };

  return (
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
      {items.map((item: any) => (
        <Menu.Item key={item.key} icon={item.icon}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default HeaderNav;
