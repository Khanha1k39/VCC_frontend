import { Button, Col, Divider, Row, Table, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseOrderAmount,
  increaseOrderAmount,
} from "../../redux/slides/orderSlide";

function OrderPage() {
  const dispatch = useDispatch();
  const formatCurrency = (value) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);

  const updateQuantity = (productId, amountChange) => {
    if (amountChange === 1) {
      dispatch(increaseOrderAmount({ id: productId }));
    } else if (amountChange === -1) {
      dispatch(decreaseOrderAmount({ id: productId }));
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => index + 1, // Tính STT dựa trên index
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        console.log("text,record", text, record);
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={record.image}
              style={{ width: 50, height: 50, marginRight: 10 }}
            />
            <span>{text}</span>
          </div>
        );
      },
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (price) => formatCurrency(price),
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
      key: "amount",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            type="primary"
            onClick={() => updateQuantity(record.product, -1)}
            style={{ marginRight: 5 }}
            size="small"
            disabled={record.amount < 1 === true}
          >
            -
          </Button>
          <span>{record.amount}</span>
          <Button
            type="primary"
            onClick={() => updateQuantity(record.product, 1)}
            style={{ marginLeft: 5 }}
            size="small"
          >
            +
          </Button>
        </div>
      ),
    },
    {
      title: "Tổng",
      dataIndex: "total",
      key: "total",
      render: (_, record) => formatCurrency(record.price * record.amount), // Tính tổng giá
    },
  ];
  const order = useSelector((state) => state.order);
  const calculateTotalPrice = () => {
    return order?.orderItems?.reduce(
      (total, item) => total + item.price * item.amount,
      0
    );
  };
  return (
    <div
      style={{
        padding: "0 120px",
        backgroundColor: "#efefef",
      }}
    >
      <Typography.Title> Giỏ hàng của bạn</Typography.Title>
      <Typography.Title level={3}>
        Tổng số {order?.orderItems?.length} sản phẩm
      </Typography.Title>

      <Row gutter={[16, 0]}>
        <Col style={{ backgroundColor: "white" }} span={16}>
          <Table
            pagination={false}
            dataSource={order?.orderItems}
            columns={columns}
          ></Table>
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
          <Divider />
          <Button
            type="primary"
            style={{
              width: "100%",
              backgroundColor: "#1890ff",
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
              height: "45px",
            }}
          >
            Thanh toán ngay
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default OrderPage;
