import React from "react";
import isEmpty from "lodash/isEmpty";
import { Button } from "antd";
import { Form, Input } from "antd";
import { BookMode } from "../../constants/constants";

type Props = {
  mode: string;
  recordDetails: any;
  closeDrawer: Function;
};

const BookFormPage = (props: Props) => {
  const { mode, recordDetails, closeDrawer } = props;

  const [form] = Form.useForm();

  const validateFields = async () => {
    try {
      await form.validateFields();
      console.log("true");
      return true;
    } catch (errorInfo: any) {
      return isEmpty(errorInfo);
    }
  };

  const onsubmit = async () => {
    const isValid = await validateFields();
    console.log(isValid, "is valid form");
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
