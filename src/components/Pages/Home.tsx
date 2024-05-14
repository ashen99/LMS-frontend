import { Col, Row } from "antd";
import React from "react";

const Home = () => {
  return (
    <>
      <Row>
        <Col span={12}>
          <div className="containerHeader" style={{ paddingLeft: "10px" }}>
            <h1>Library Management System</h1>
          </div>
        </Col>
        <Col span={12}>col-12</Col>
      </Row>
    </>
  );
};

export default Home;
