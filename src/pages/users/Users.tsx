import { RightOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const Users = () => {
  return (
    <>
      <Breadcrumb
        items={[{ title: <Link to="/">Dashboard</Link> }, { title: "Users" }]}
        separator={<RightOutlined />}
      />
    </>
  );
};

export default Users;