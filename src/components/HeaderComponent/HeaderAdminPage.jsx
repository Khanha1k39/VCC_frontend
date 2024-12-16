import {
  WrapperHeader,
  WrapperHeaderAccount,
  WrapperHeaderAdmin,
  WrapperTextHeader,
  WrapperTextHeaderSmall,
} from "./style";
import { CaretDownOutlined } from "@ant-design/icons";
import { Col, Flex } from "antd";
import Search from "antd/es/input/Search";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

function HeaderAdminPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <WrapperHeaderAdmin gutter={16}>
      <Col span={6}>
        <WrapperTextHeader
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          KhanhBanSach
        </WrapperTextHeader>
      </Col>
      <Col span={12}>
        <Search
          style={{ display: "none" }}
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          //   onSearch={() => {}}
        />
      </Col>
      <></>
      <Col
        span={6}
        style={{ display: "flex", gap: "20px", alignItems: "center" }}
      >
        <WrapperHeaderAccount>
          <div>
            <Flex gap={4} style={{ cursor: "pointer" }}>
              <WrapperTextHeaderSmall>{user.name}</WrapperTextHeaderSmall>
              <CaretDownOutlined></CaretDownOutlined>
            </Flex>
          </div>
        </WrapperHeaderAccount>
      </Col>
    </WrapperHeaderAdmin>
  );
}

export default HeaderAdminPage;
