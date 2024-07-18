import React, { useCallback, useEffect, useState } from "react";
import { Drawer, Button, Row, Col, Space, Form, Input } from "antd";
import { Modal } from "antd"; // Add this import
import DataTable from "../common/DataTable";
import { DataType, bookViewType } from "../../types/global";
import type { TableProps } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteBook, fetchBookList } from "../../slices/bookSlice";
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
  const [title, setTitle] = useState("");
  const [mode, setMode] = useState("");
  const [open, setOpen] = useState(false);
  const [recordDetails, setRecordDetails] = useState<bookViewType>();

  const showDrawer = (mode: string, record?: bookViewType) => {
    setTitle(mode);
    setMode(mode);
    setOpen(true);
    if(mode === BookMode.VIEW || mode === BookMode.EDIT){
      setRecordDetails(record);
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  const fetchList = useCallback(() => {
    dispatch(fetchBookList());
  }, [dispatch]);

  useEffect(() => {
    fetchList();
  }, [fetchList,open]);


  const removeBook = async (id: string) => {
    await dispatch(deleteBook(id));
  }

  const showDeleteConfirm = (record: bookViewType) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this book?',
      content: `Title: ${record.title}`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        // Add your delete logic here
        console.log('Deleted', record);
        await removeBook(record.id);
        fetchList();
      },
    });
  };

  const columns: TableProps<bookViewType>["columns"] = [
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
              <span onClick={() => showDeleteConfirm(record)} style={{ cursor: "pointer" }}>
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
            onClick={() => showDrawer(BookMode.CREATE)}
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
          bookList = {data}
          mode={mode}
          recordDetails={recordDetails}
          closeDrawer={setOpen}
          isOpen={open}
        />
      </Drawer>
    </>
  );
};

export default BooksPage;
