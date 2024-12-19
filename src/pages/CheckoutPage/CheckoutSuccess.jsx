import React from "react";
import { Button, Result } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const SuccessOrder = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <Result
      status="success"
      title="Bạn đã đặt hàng thành công"
      subTitle={`Order number: ${id}`}
      extra={[
        <Button type="primary" key="console" onClick={() => navigate("/")}>
          Về trang chủ
        </Button>,
      ]}
    />
  );
};
export default SuccessOrder;
