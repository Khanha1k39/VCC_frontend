import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  Radio,
  Row,
  Table,
  Typography,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseOrderAmount,
  increaseOrderAmount,
} from "../../redux/slides/orderSlide";
import { useMutaionHook } from "../../hooks/useMutaionHook";
import { createOrder } from "../../services/OrderServices";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formatCurrency = (value) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);

  const order = useSelector((state) => state.order);
  const calculateTotalPrice = () => {
    return order?.orderItems?.reduce(
      (total, item) => total + item.price * item.amount,
      0
    );
  };
  const mutationCreateOrder = useMutaionHook((data) => {
    const res = createOrder(data);
    return res;
  });
  const [form] = Form.useForm();

  const handleCreateOrder = (values) => {
    console.log(values);
    mutationCreateOrder.mutate(
      {
        ...order,
        shippingAddress: {
          fullname: values.fullName,
          email: values.email,
          address: values.address,
          phone: values.phoneNumber,
        },
        paymentMethod: values.paymentMethod,
      },
      {
        onSuccess: (e) => {
          navigate(`/order/success/${e._id}`);
        },
      }
    );
  };
  return (
    <div
      style={{
        padding: "0 120px",
        backgroundColor: "#efefef",
      }}
    >
      <Typography.Title> Thanh toán</Typography.Title>

      <Row gutter={[16, 0]}>
        <Col
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
          }}
          span={16}
        >
          <Typography.Title level={4} style={{ textAlign: "center" }}>
            Thông tin giao hàng
          </Typography.Title>
          <Divider />
          <Form
            form={form}
            layout="vertical"
            onFinish={handleCreateOrder}
            style={{ maxWidth: "600px", margin: "0 auto" }}
          >
            <Form.Item
              name="fullName"
              label="Họ và tên"
              rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
            >
              <Input placeholder="Nhập họ và tên" />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              label="Số điện thoại"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
              ]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Vui lòng nhập email hợp lệ!",
                },
              ]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>
            <Form.Item
              name="address"
              label="Địa chỉ cụ thể"
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
            >
              <Input.TextArea placeholder="Nhập địa chỉ cụ thể" rows={3} />
            </Form.Item>
            <Form.Item
              name="shippingMethod"
              label="Phương thức giao hàng"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn phương thức giao hàng!",
                },
              ]}
            >
              <Radio.Group>
                <Radio defaultChecked value="Giao hàng ngay">
                  Giao hàng ngay
                </Radio>
                <Radio value="Giao hàng nhanh">Giao hàng nhanh</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="paymentMethod"
              label="Phương thức thanh toán"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn phương thức thanh toán!",
                },
              ]}
            >
              <Radio.Group>
                <Radio value="VNPay">VNPay</Radio>
                <Radio value="Tiền mặt">Tiền mặt</Radio>
              </Radio.Group>
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
                backgroundColor: "#1890ff",
                color: "white",
                fontWeight: "bold",
                fontSize: "16px",
                height: "45px",
              }}
            >
              Giao hàng ngay
            </Button>
          </Form>
        </Col>
        <Col
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
          }}
          span={8}
        >
          <Typography.Title level={4} style={{ textAlign: "center" }}>
            Thông tin thanh toán
          </Typography.Title>
          <Divider />
          <div
            style={{
              marginBottom: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography.Text>Tổng giá trị sản phẩm:</Typography.Text>
            <Typography.Text strong>
              {formatCurrency(calculateTotalPrice())}
            </Typography.Text>
          </div>
          <div
            style={{
              marginBottom: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography.Text>VAT(10%):</Typography.Text>
            <Typography.Text strong>
              {formatCurrency(calculateTotalPrice() * 0.1)}
            </Typography.Text>
          </div>
          <Divider />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography.Text style={{ fontSize: "16px", fontWeight: "bold" }}>
              Tổng cộng:
            </Typography.Text>
            <Typography.Text
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#d32f2f",
              }}
            >
              {formatCurrency(calculateTotalPrice() * 1.1)}
            </Typography.Text>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default CheckoutPage;
