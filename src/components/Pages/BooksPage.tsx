import React, { useCallback, useEffect, useState } from "react";
import { Drawer, Button, Row, Col, Space, Form, Input } from "antd";
import DataTable from "../common/DataTable";
import { DataType } from "../../types/global";
import type { TableProps } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { fetchBookList } from "../../slices/bookSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { BookMode } from "../../constants/constants";
import BookFormPage from "../common/BookForm";
import { getBookList } from "../../services/BookService";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type FieldType = {
  title?: string;
  author?: string;
  isbn?: string;
};

const BooksPage = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.book.bookList);
  const fetchingComplete = useAppSelector((state) => state.book.booksFetched);
  const [title, setTitle] = useState("");
  const [mode, setMode] = useState("");
  const [open, setOpen] = useState(false);
  const [recordDetails, setRecordDetails] = useState({});

  const showDrawer = (mode: string, record: any) => {
    setTitle(mode);
    setMode(mode);
    setOpen(true);
    setRecordDetails(record);
  };

  const onClose = () => {
    setOpen(false);
  };

  const fetchList = useCallback(() => {
    dispatch(fetchBookList());
  }, [dispatch]);

  useEffect(() => {
    console.log("dispatch");
    // debugger;
    fetchList();
  }, [fetchList]);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: "isbn",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <>
            <Space size="middle">
              <span
                onClick={() => showDrawer(BookMode.VIEW, record)}
                style={{ cursor: "pointer" }}
              >
                <EyeOutlined />
              </span>
              <span
                onClick={() => showDrawer(BookMode.EDIT, record)}
                style={{ cursor: "pointer" }}
              >
                <EditOutlined />
              </span>
              <span style={{ cursor: "pointer" }}>
                <DeleteOutlined />
              </span>
            </Space>
          </>
        );
      },
    },
  ];
  return (
    <>
      <Row justify="end" style={{ padding: "20px" }}>
        <Col>
          <Button
            onClick={() => showDrawer(BookMode.CREATE, {})}
            type="primary"
          >
            Add Book
          </Button>
        </Col>
      </Row>

      <DataTable data={data ?? []} columns={columns} />
      <Drawer
        title={title}
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
        getContainer={false}
      >
        <BookFormPage
          mode={mode}
          recordDetails={recordDetails}
          closeDrawer={setOpen}
        />
      </Drawer>
    </>
  );
};

export default BooksPage;
