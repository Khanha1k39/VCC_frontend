import Title from "antd/es/typography/Title";
import { WrapperContainer } from "./styles";
import { Button, Checkbox, Flex, Form, Input, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "preact/hooks";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../services/UserServices";
import Loading from "../../components/LoadingComponent/Loading";
import { useMutaionHook } from "../../hooks/useMutaionHook";
function SignUpPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleNavigateSingin = () => {
    navigate("/sign-in");
  };
  const mutation = useMutaionHook((data) => signupUser(data));
  const onFinish = (values) => {
    mutation.mutate(values);

    console.log("Success:", values);
  };
  const { data, isPending } = mutation;

  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <WrapperContainer>
        <Title style={{ textAlign: "center" }} level={2}>
          Đăng kí tài khoản
        </Title>
        {/* <Form
          name="login"
          initialValues={{ remember: true }}
          style={{ width: 300 }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
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
              // visibilityToggle={{
              //   visible: passwordVisible,
              //   onVisibleChange: setPasswordVisible,
              // }}
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please input your confirm password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
              visibilityToggle={{
                visible: passwordVisible,
              }}
            />
          </Form.Item>

          <Form.Item>
            <Loading isLoading={isPending}>
              <Button block type="primary" htmlType="submit">
                Đăng kí
              </Button>
            </Loading>
            hoặc <a onClick={handleNavigateSingin}>Đăng nhập ngay!</a>
          </Form.Item>
        </Form> */}
        <Form
          name="register"
          initialValues={{ remember: true }}
          style={{ width: 300 }}
          onFinish={onFinish}
        >
          {/* Email */}
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              {
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "The input is not a valid email address!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>

          {/* Password */}
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              {
                min: 6,
                message: "Password must be at least 6 characters long!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
            />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Loading isLoading={isPending}>
              <Button block type="primary" htmlType="submit">
                Đăng kí
              </Button>
            </Loading>
            hoặc <a onClick={handleNavigateSingin}>Đăng nhập ngay!</a>
          </Form.Item>
        </Form>
      </WrapperContainer>
    </Flex>
  );
}

export default SignUpPage;
