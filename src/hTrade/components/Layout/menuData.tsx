import React from "react";

import {
  UserSwitchOutlined,
  ToolOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
} from "@ant-design/icons";

export default [
  // {
  //   "key": "role",
  //   "title": "角色管理",
  //   "hasChild": 0,
  //   "menuType": 1,
  // },

  {
    key: "user",
    title: "用户管理",
    hasChild: 0,
    menuType: 1,
    icon: <UserSwitchOutlined />,
  },

  // {
  //   "key": "moreUser",
  //   "title": "大户列表",
  //   "hasChild": 0,
  //   "menuType": 1,
  // },

  {
    key: "strategyList",
    title: "策略列表",
    hasChild: 0,
    menuType: 1,
    icon: <ToolOutlined />,
  },

  {
    key: "robotFollowList",
    title: "机器人跟单",
    hasChild: 0,
    menuType: 1,
    icon: <UsergroupAddOutlined />,
  },

  {
    key: "system",
    title: "系统设置",
    hasChild: 0,
    menuType: 1,
    icon: <SettingOutlined />,
  },
];
