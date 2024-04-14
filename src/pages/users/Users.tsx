import { RightOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Table } from "antd";
import { Link, Navigate } from "react-router-dom";
import UserFilter from "../../components/users/UserFilter";
import { getUsers } from "../../http/api";
import { useAuthStore } from "../../store";
import { User } from "../../types";

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
  return (
    <>
      <Breadcrumb
        items={[{ title: <Link to="/">Dashboard</Link> }, { title: "Users" }]}
        separator={<RightOutlined />}
      />

      {isPending && <div>Loading...</div>}
      {isError && <div>{error?.message}</div>}

      <UserFilter />

      <Table style={{ marginTop: 30 }} columns={columns} dataSource={users} />
    </>
  );
};

export default Users;
