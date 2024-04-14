import { Card, Col, Form, Input, Row } from "antd";

const UserForm = () => {
  return (
    <Row>
      <Col span={24}>
        <Card title="Basic Info">
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item label="First Name" name="firstName">
                <Input placeholder="enter your first name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Last Name" name="lastName">
                <Input placeholder="enter your last name" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default UserForm;
