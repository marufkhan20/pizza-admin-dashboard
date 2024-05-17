import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Breadcrumb, Button, Drawer, Form, Space, Table, theme } from "antd";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import UserForm from "../../components/users/form/UserForm";
import UserFilter from "../../components/users/UserFilter";
import { createUser, getUsers } from "../../http/api";
import { useAuthStore } from "../../store";
import { CreateUserData, User } from "../../types";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "firstName",
    key: "firstName",
    render: (_text: string, record: User) => {
      return (
        <span>
          {record?.firstName} {record?.lastName}
        </span>
      );
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
];

const Users = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const queryClient = useQueryClient();

  // user data
  const [form] = Form.useForm();

  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const { user } = useAuthStore();

  // get users
  const {
    data: users,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await getUsers();
      return data;
    },
    enabled: user?.role === "admin",
  });

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // prepare create user api request
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { mutate: userMutate } = useMutation({
    mutationKey: ["createUser"],
    mutationFn: async (user: CreateUserData) => {
      const { data } = await createUser(user);
      return data;
    },
    onSuccess: async () => {
      setDrawerOpen(false);
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // on submit handler
  const onSubmitHandler = async () => {
    await form.validateFields();
    userMutate(form.getFieldsValue());
  };
  return (
    <>
      <Breadcrumb
        items={[{ title: <Link to="/">Dashboard</Link> }, { title: "Users" }]}
        separator={<RightOutlined />}
      />

      {isPending && <div>Loading...</div>}
      {isError && <div>{error?.message}</div>}

      <UserFilter
        onFilterChange={(filterName: string, filterValue: string) => {
          console.log(filterName, filterValue);
        }}
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setDrawerOpen(true)}
        >
          Create User
        </Button>
      </UserFilter>

      <Table
        style={{ marginTop: 30 }}
        columns={columns}
        dataSource={users}
        rowKey={"id"}
      />

      {/* create new user */}
      <Drawer
        title="Create new user"
        width={720}
        destroyOnClose
        styles={{ body: { background: colorBgLayout } }}
        open={drawerOpen}
        onClose={() => {
          form.resetFields();
          setDrawerOpen(false);
        }}
        extra={
          <Space>
            <Button
              onClick={() => {
                setDrawerOpen(false);
                form.resetFields();
              }}
            >
              Close
            </Button>
            <Button onClick={onSubmitHandler} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" form={form}>
          <UserForm />
        </Form>
      </Drawer>
    </>
  );
};

export default Users;
