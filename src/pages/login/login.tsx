import { LockFilled, LockOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Flex,
  Form,
  Input,
  Layout,
  Space,
} from "antd";
import Logo from "../../components/icons/Logo";
import { usePermission } from "../../hooks/usePermission";
import { getSelf, login, logout } from "../../http/api";
import { useAuthStore } from "../../store";
import { Credentials } from "../../types";

const loginUser = async (userData: Credentials) => {
  const { data } = await login(userData);
  return data;
};

const getSelfData = async () => {
  const { data } = await getSelf();
  return data;
};

const Login = () => {
  const { setUser } = useAuthStore();
  const { isAllowed } = usePermission();

  // get self data for login user
  const { refetch } = useQuery({
    queryKey: ["self"],
    queryFn: getSelfData,
    enabled: false,
  });

  // logout user
  const { mutate: logoutMutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
  });

  // login user
  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginUser,
    onSuccess: async () => {
      // get self data
      const { data: selfData } = await refetch();

      // set data in store
      if (isAllowed(selfData)) {
        setUser(selfData);
      } else {
        logoutMutate();
      }
    },
  });
  return (
    <>
      <Layout
        style={{ height: "100vh", display: "grid", placeItems: "center" }}
      >
        <Space direction="vertical" align="center" size="large">
          <Layout.Content
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Logo />
          </Layout.Content>

          <Card
            bordered={false}
            style={{ width: 350 }}
            title={
              <Space
                style={{
                  width: "100%",
                  fontSize: 16,
                  justifyContent: "center",
                }}
              >
                <LockFilled />
                Sign in
              </Space>
            }
          >
            <Form
              onFinish={(values) => {
                mutate({
                  email: values.username,
                  password: values.password,
                });
              }}
              initialValues={{ remember: true }}
            >
              {isError && (
                <Alert
                  style={{ marginBottom: 24 }}
                  type="error"
                  message={error?.message}
                />
              )}

              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username",
                  },
                  {
                    type: "email",
                    message: "Email is not valid",
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<UserOutlined />}
                  placeholder="Username"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>

              <Flex justify="space-between">
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a href="#" id="login-form-forgot">
                  Forgot password
                </a>
              </Flex>

              <Form.Item>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                  loading={isPending}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Space>
      </Layout>
    </>
  );
};

export default Login;
