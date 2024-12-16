import { Badge, Button, Col, Dropdown, Flex, Popover, Row } from "antd";
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
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/UserServices";
import { resetUser } from "../../redux/slides/userSlide";
import { Navigate, useNavigate } from "react-router-dom";
import { searchProduct } from "../../redux/slides/productSlide";
import { useState } from "preact/hooks";

function HeaderComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const user = useSelector((state) => state.user);
  const items =
    (user.isAdmin == true) == false
      ? [
          {
            key: "1",
            label: <span>Thông tin người dùng</span>,
          },
          {
            key: "2",
            label: <span>Đăng xuất</span>,
          },
        ]
      : [
          {
            key: "1",
            label: <span>Thông tin người dùng</span>,
          },
          {
            key: "3",
            label: <span>Quản lý hệ thống</span>,
          },
          {
            key: "2",
            label: <span>Đăng xuất</span>,
          },
        ];
  const onSearch = (e) => {
    setSearch(e);
    dispatch(searchProduct(e));
  };
  return (
    <WrapperHeader gutter={16}>
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
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </Col>
      <Col
        span={6}
        style={{ display: "flex", gap: "20px", alignItems: "center" }}
      >
        <WrapperHeaderAccount>
          <UserOutlined style={{ fontSize: "30px" }} />
          <div>
            {user?.name ? (
              // <Popover content={content} trigger="click">
              <Dropdown
                menu={{
                  items,
                  onClick: async (e) => {
                    if (e?.key == 2) {
                      await logout();
                      dispatch(resetUser());
                    }
                    if (e?.key == 3) {
                      navigate("/system/admin");
                    }
                  },
                }}
              >
                <Flex gap={4} style={{ cursor: "pointer" }}>
                  <WrapperTextHeaderSmall>{user.name}</WrapperTextHeaderSmall>
                  <CaretDownOutlined></CaretDownOutlined>
                </Flex>
              </Dropdown>
            ) : (
              // </Popover>
              <WrapperTextHeaderSmall
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/sign-in");
                }}
              >
                Đăng nhập/đăng kí
              </WrapperTextHeaderSmall>
            )}
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
