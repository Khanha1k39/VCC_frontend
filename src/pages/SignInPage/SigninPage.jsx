import Title from "antd/es/typography/Title";
import { WrapperContainer } from "./styles";
import { Button, Checkbox, Flex, Form, Input, message, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "preact/hooks";
import { useNavigate } from "react-router-dom";
import { useMutaionHook } from "../../hooks/useMutaionHook";
import { getDetailUser, loginUser } from "../../services/UserServices";
import Loading from "../../components/LoadingComponent/Loading";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";
import { Bounce, toast } from "react-toastify";

function SignInPage() {
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const handleNavigateSingup = () => {
    navigate("/sign-up");
  };
  const mutation = useMutaionHook((data) => loginUser(data));
  const { data, isPending, isError, isSuccess } = mutation;
  console.log("mutation", mutation);
  const onFinish = (values) => {
    mutation.mutate(values, {
      onError: (error) => {
        console.log("error", error);
        message.error(error?.response?.data?.message);
      },
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("access_token", data?.access_token);

      navigate("/");
      console.log("data", data);
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        console.log("decoded", decoded);
        if (decoded?.id) {
          handleGetDetailUser(decoded?.id, data?.access_token);
        }
      }
    }
  }, [isSuccess, isError]);
  const handleGetDetailUser = async (id, token) => {
    const res = await getDetailUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
    console.log("res get detail", res);
  };
  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <WrapperContainer>
        <Title style={{ textAlign: "center" }} level={2}>
          Đăng nhập bằng email
        </Title>
        <Form
          name="login"
          style={{ width: 300 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
            />
          </Form.Item>
          <Form.Item>
            <Loading isLoading={false}>
              <Button block type="primary" htmlType="submit">
                Đăng nhập
              </Button>
            </Loading>
            hoặc <a onClick={handleNavigateSingup}>Đăng kí ngay!</a>
          </Form.Item>
        </Form>
      </WrapperContainer>
    </Flex>
  );
}

export default SignInPage;
