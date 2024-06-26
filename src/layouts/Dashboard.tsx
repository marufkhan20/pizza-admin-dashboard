import Icon, { BellFilled } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import {
  Avatar,
  Badge,
  Dropdown,
  Flex,
  Layout,
  Menu,
  Space,
  theme,
} from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import BasketIcon from "../components/icons/BasketIcon";
import { foodIcon } from "../components/icons/FoodIcon";
import GiftIcon from "../components/icons/GiftIcon";
import Home from "../components/icons/Home";
import Logo from "../components/icons/Logo";
import UserIcon from "../components/icons/UserIcon";
import { logout } from "../http/api";
import { useAuthStore } from "../store";

const getMenuItems = (role: string) => {
  const baseItems = [
    {
      key: "/",
      icon: <Icon component={Home} />,
      label: <NavLink to="/">Home</NavLink>,
    },
    {
      key: "/restaurants",
      icon: <Icon component={foodIcon} />,
      label: <NavLink to="/restaurants">Restaurants</NavLink>,
    },
    {
      key: "/products",
      icon: <Icon component={BasketIcon} />,
      label: <NavLink to="/products">Products</NavLink>,
    },
    {
      key: "/promos",
      icon: <Icon component={GiftIcon} />,
      label: <NavLink to="/promos">Promos</NavLink>,
    },
  ];

  if (role === "admin") {
    const menus = [...baseItems];

    menus.splice(1, 0, {
      key: "/users",
      icon: <Icon component={UserIcon} />,
      label: <NavLink to="/users">Users</NavLink>,
    });

    return menus;
  }

  return baseItems;
};

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const { logout: logoutFromState } = useAuthStore();

  // logout user
  const { mutate: logoutMutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      logoutFromState();
      return;
    },
  });

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  const items = getMenuItems(user?.role);

  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          theme="light"
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="logo">
            <Logo />
          </div>
          <Menu
            theme="light"
            defaultSelectedKeys={["/"]}
            mode="inline"
            items={items}
          />
        </Sider>

        <Layout>
          <Header style={{ padding: "0 16px", background: colorBgContainer }}>
            <Flex gap="middle" align="center" justify="space-between">
              <Badge
                text={
                  user.role === "admin"
                    ? "You are an admin"
                    : user?.tenant?.name
                }
                status="success"
              />
              <Space size={16}>
                <Badge dot style={{ cursor: "pointer" }}>
                  <BellFilled style={{ cursor: "pointer" }} />
                </Badge>
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "logout",
                        label: "Logout",
                        onClick: () => logoutMutate(),
                      },
                    ],
                  }}
                  placement="bottomLeft"
                >
                  <Avatar
                    style={{
                      backgroundColor: "#fde3cf",
                      color: "#f56a00",
                      cursor: "pointer",
                    }}
                  >
                    U
                  </Avatar>
                </Dropdown>
              </Space>
            </Flex>
          </Header>

          <Content style={{ margin: "24px" }}>
            <Outlet />
          </Content>

          <Footer style={{ textAlign: "center" }}>Mernspace Pizza Shop</Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default Dashboard;
