import React from "react";
import { Table } from "antd";

type Props = {
  data: any;
  columns: any;
};

const DataTable = (props: Props) => {
  const { data, columns } = props;

  return <Table columns={columns} dataSource={data} />;
};

export default DataTable;
