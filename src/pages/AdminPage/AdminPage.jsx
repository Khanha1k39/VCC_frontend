import { Flex, Menu } from "antd";
import { useState } from "preact/hooks";
import {
  AppstoreOutlined,
  BookOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct/AdminProduct";

const items = [
  {
    key: "user",
    icon: <UserOutlined />,
    label: "Người dùng",
  },
  {
    key: "product",
    icon: <BookOutlined />,
    label: "Sản phẩm",
  },
];
const getLevelKeys = (items1) => {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};
const levelKeys = getLevelKeys(items);
function AdminPage() {
  const [stateOpenKeys, setStateOpenKeys] = useState("user");
  const [keySelected, setSelectedKey] = useState("user");
  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // close
      setStateOpenKeys(stateOpenKeys);
    }
  };
  const handleOnClick = ({ key }) => {
    setSelectedKey(key);
  };
  const render = (key) => {
    switch (key) {
      case "user":
        return <AdminUser></AdminUser>;
      case "product":
        return <AdminProduct></AdminProduct>;
      default:
        return <AdminProduct></AdminProduct>;
    }
  };
  return (
    <Flex gap={16}>
      <Menu
        mode="inline"
        defaultSelectedKeys={"user"}
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        style={{ width: 256, boxShadow: "1px 1px 2px #ccc", height: "100vh" }}
        items={items}
        onClick={handleOnClick}
      />
      <div>{render(keySelected)}</div>
    </Flex>
  );
}

export default AdminPage;
