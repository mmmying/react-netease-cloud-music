import React from "react";
import style from "./style.module.css";
import { Icon } from "@blueprintjs/core";
import { Input, Avatar } from "antd";
import { SearchOutlined, UserOutlined  } from "@ant-design/icons";

const Header = () => {
  return (
    <div className={style.header}>
      <div>
        <Icon icon="music" size={20} />
        欢迎来到音乐世界
      </div>
      <div className={style.right}>
        <Input placeholder="请输入" prefix={<SearchOutlined style={{ color: "rgba(0,0,0,.25)" }} />} />
        <Avatar icon={<UserOutlined />} />
      </div>
    </div>
  );
};

export default Header;
