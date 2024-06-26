import React, { useState } from "react";
import { Space, Table, Drawer } from "antd";
import type { TableProps } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DataTable from "../common/DataTable";

interface DataType {
  key: string;
  name: string;
  contact: number;
  address: string;
}

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    contact: 11234689,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    contact: 11234689,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    contact: 11234689,
    address: "Sydney No. 1 Lake Park",
  },
];

const Members = () => {
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

  return (
    <>
      <DataTable data={data} />
      <Drawer
        title="Basic Drawer"
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
        getContainer={false}
      >
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default Members;
