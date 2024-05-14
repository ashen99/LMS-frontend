import React, { useState } from "react";
import type { TableProps } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Space, Table, Tag, Drawer } from "antd";

interface DataType {
  key: string;
  name: string;
  contact: number;
  address: string;
}

const DataTable = (props: any) => {
  const { data } = props;
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <span onClick={() => showDrawer()} style={{ cursor: "pointer" }}>
            <EyeOutlined />
          </span>
          <span onClick={() => showDrawer()} style={{ cursor: "pointer" }}>
            <EditOutlined />
          </span>
          <span onClick={() => showDrawer()} style={{ cursor: "pointer" }}>
            <DeleteOutlined />
          </span>
        </Space>
      ),
    },
  ];
  return <Table columns={columns} dataSource={data} />;
};

export default DataTable;
