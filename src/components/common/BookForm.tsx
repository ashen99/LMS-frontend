import React, { useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
import { Button } from "antd";
import { Form, Input } from "antd";
import { BookMode } from "../../constants/constants";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { BookDataType, bookViewType } from "../../types/global";
import { saveBook,editBook } from "../../slices/bookSlice";

type Props = {
  mode: string;
  recordDetails: bookViewType | undefined;
  closeDrawer: Function;
  bookList: BookDataType[];
  isOpen: boolean;
};

export type addBookFormData = {
  title: string;
  author: string;
  isbn: string;
  copies : number;
};

const addBookDefaultValues : addBookFormData = {
  title : '',
  author: '',
  isbn: '',
  copies : 0
};

const BookFormPage = (props: Props) => {
  const dispatch = useAppDispatch();
  const { mode, recordDetails, closeDrawer,bookList ,isOpen} = props;
  const [formData, setFormData] = useState<addBookFormData>({
    ...addBookDefaultValues
  });
  const [form] = Form.useForm();


  useEffect(() => {
    if(mode === BookMode.VIEW || mode === BookMode.EDIT){
      const viewBook = {
        id: recordDetails?.id,
        title: recordDetails?.title,
        author: recordDetails?.author,
        isbn: recordDetails?.isbn,
        copies: recordDetails?.copies
      } as bookViewType;
      form.setFieldsValue(viewBook);
    } else if(mode === BookMode.CREATE) {
      form.resetFields()
    }
  }, [isOpen])
  
  
  const validateFields = async () => {
    try {
      await form.validateFields();
      return true;
    } catch (errorInfo: any) {
      return isEmpty(errorInfo);
    }
  };

  const addBook = async () => {
    const isValid = await validateFields();

    if (isValid) {
      const values = form.getFieldsValue();
      setFormData(values);
      const newBook = {
        title: values.title,
        author: values.author,
        isbn: values.isbn,
        copies : values.copies
      } as BookDataType;

      await dispatch(saveBook(newBook))
      closeDrawer(false)
    }
  }

  const updateBook = async () => {
    const isValid = await validateFields();

    if(isValid) {
      const values = form.getFieldsValue();
      setFormData(values);
      const editedBook = {
        id: recordDetails?.id,
        title: values.title,
        author: values.author,
        isbn: values.isbn,
        copies : values.copies
      } as BookDataType;

      await dispatch(editBook(editedBook))
      closeDrawer(false)
    }
  }

  const onsubmit = async () => {
    if(mode === BookMode.CREATE){
      await addBook();
    }else {
      await updateBook();
    }
  };

  return (
    <>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        autoComplete="off"
        layout="vertical"
        disabled={mode === BookMode.VIEW ? true : false}
        form={form}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <div>
            {(mode === BookMode.EDIT || mode === BookMode.VIEW) && (
              <Form.Item
                label="id"
                name="id"
                rules={[{ required: true, message: "Please Enter a Title" }]}
              >
                <Input disabled={true} />
              </Form.Item>
            )}

            <Form.Item
              label="title"
              name="title"
              rules={[{ required: true, message: "Please Enter a Title" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="author"
              name="author"
              rules={[{ required: true, message: "Please the author name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="isbn"
              name="isbn"
              rules={[
                { required: true, message: "Please enter the ISBN number." },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="copies"
              name="copies"
              rules={[
                { required: true, message: "Please enter the number of copies." },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          {(mode === BookMode.CREATE || mode === BookMode.EDIT) && (
            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={onsubmit}>
                {mode === BookMode.CREATE ? "Add Book" : "Edit Book"}
              </Button>
            </Form.Item>
          )}
        </div>
      </Form>
    </>
  );
};

export default BookFormPage;
