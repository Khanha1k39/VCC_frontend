import { Badge, Col, Row } from "antd";
import {
  WrapperHeader,
  WrapperHeaderAccount,
  WrapperTextHeader,
  WrapperTextHeaderSmall,
} from "./style";
import { Input } from "antd";
const { Search } = Input;
import {
  CaretDownOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
function HeaderComponent() {
  return (
    <WrapperHeader gutter={16}>
      <Col span={6}>
        <WrapperTextHeader>KhanhBanSach</WrapperTextHeader>
      </Col>
      <Col span={12}>
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          //   onSearch={() => {}}
        />
      </Col>
      <Col
        span={6}
        style={{ display: "flex", gap: "20px", alignItems: "center" }}
      >
        <WrapperHeaderAccount>
          <UserOutlined style={{ fontSize: "30px" }} />
          <div>
            <WrapperTextHeaderSmall>Đăng nhập/đăng kí</WrapperTextHeaderSmall>
            <div>
              <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
              <CaretDownOutlined></CaretDownOutlined>
            </div>
          </div>
        </WrapperHeaderAccount>
        <div>
          <Badge count={1}>
            <ShoppingCartOutlined
              style={{ fontSize: "30px", color: "#fff" }}
            ></ShoppingCartOutlined>
          </Badge>
          <WrapperTextHeaderSmall>Giỏ hàng </WrapperTextHeaderSmall>
        </div>
      </Col>
    </WrapperHeader>
  );
}

export default HeaderComponent;
