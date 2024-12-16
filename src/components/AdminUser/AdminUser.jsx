import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Title from "antd/es/typography/Title";
import TableComponent from "../TableComponents/TableComponent";

function AdminUser() {
  return (
    <>
      <Title level={5}>Quản lý người dùng </Title>
      <div style={{ marginTop: "10px" }}>
        <Button
          style={{
            height: "150px",
            width: "150px",
            borderRadius: "6px",
            borderStyle: "dashed",
          }}
        >
          <PlusOutlined></PlusOutlined>
        </Button>
      </div>
      <TableComponent></TableComponent>
    </>
  );
}

export default AdminUser;
