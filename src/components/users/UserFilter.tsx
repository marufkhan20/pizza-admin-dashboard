import { Card, Col, Input, Row, Select } from "antd";
import React from "react";

type UserFilterProps = {
  children: React.ReactNode;
  onFilterChange: (filterName: string, filterValue: string) => void;
};

const UserFilter = ({ onFilterChange, children }: UserFilterProps) => {
  return (
    <Card style={{ marginTop: 20 }}>
      <Row gutter={20} justify="space-between">
        <Col span={16}>
          <Row gutter={20}>
            <Col span={8}>
              <Input.Search
                allowClear
                placeholder="Search"
                onChange={(e) => onFilterChange("searchFilter", e.target.value)}
              />
            </Col>
            <Col span={8}>
              <Select
                style={{ width: "100%" }}
                allowClear
                placeholder="Select Role"
                onChange={(selectedItem) =>
                  onFilterChange("roleFilter", selectedItem)
                }
              >
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="manager">Manager</Select.Option>
                <Select.Option value="customer">Customer</Select.Option>
              </Select>
            </Col>
            <Col span={8}>
              <Select
                style={{ width: "100%" }}
                allowClear
                placeholder="Select Status"
                onChange={(selectedItem) =>
                  onFilterChange("statusFilter", selectedItem)
                }
              >
                <Select.Option value="banned">Banned</Select.Option>
                <Select.Option value="active">Active</Select.Option>
              </Select>
            </Col>
          </Row>
        </Col>
        <Col span={8} style={{ display: "flex", justifyContent: "end" }}>
          {children}
        </Col>
      </Row>
    </Card>
  );
};

export default UserFilter;
