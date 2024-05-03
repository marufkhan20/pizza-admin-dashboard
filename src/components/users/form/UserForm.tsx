import { useQuery } from "@tanstack/react-query";
import { Card, Col, Form, Input, Row, Select, Space } from "antd";
import { getTenants } from "../../../http/api";
import { Tenant } from "../../../types";

const UserForm = () => {
  // get tenants
  const { data: tenants } = useQuery({
    queryKey: ["tenants"],
    queryFn: async () => {
      const { data } = await getTenants();
      return data;
    },
  });
  return (
    <Row>
      <Col span={24}>
        <Space direction="vertical" size="large">
          <Card title="Basic Info">
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item label="First Name" name="firstName">
                  <Input size="large" placeholder="enter first name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Last Name" name="lastName">
                  <Input size="large" placeholder="enter last name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email" name="email">
                  <Input size="large" placeholder="enter email" />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card title="Security Info">
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item label="Passwrod" name="password">
                  <Input
                    type="password"
                    size="large"
                    placeholder="enter password"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card title="Roles">
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item label="Role" name="role">
                  <Select
                    style={{ width: "100%" }}
                    allowClear
                    placeholder="Select Role"
                    size="large"
                  >
                    <Select.Option value="admin">Admin</Select.Option>
                    <Select.Option value="customer">Customer</Select.Option>
                    <Select.Option value="manager">Manager</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Restaurant" name="tenantId">
                  <Select
                    style={{ width: "100%" }}
                    allowClear
                    placeholder="Select Restuarant"
                    size="large"
                  >
                    {tenants?.map((tenant: Tenant) => (
                      <Select.Option key={tenant?.id} value={tenant?.id}>
                        {tenant?.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Space>
      </Col>
    </Row>
  );
};

export default UserForm;
