import { Breadcrumb, Button, Col, Divider, Flex, Image, Row } from "antd";
import Title from "antd/es/typography/Title";
import { Space, Typography } from "antd";
const { Text, Link } = Typography;
function ProductDetail() {
  return (
    <div style={{ padding: "0 120px", backgroundColor: "rgb(239, 239, 239)" }}>
      <Breadcrumb
        items={[
          {
            title: "Tất cả sản phẩm",
          },
          {
            title: "Tôi thấy hoa vàng trên cỏ xanh",
          },
        ]}
      />
      <Row gutter={32}>
        <Col
          span={10}
          style={{
            borderRadius: "5px",
            padding: "24px",
            backgroundColor: "#fff",
          }}
        >
          <Image
            src="https://luketscharke.com/tscharke/wp-content/uploads/2017/10/main-image-1000px.jpg"
            preview={false}
          ></Image>
        </Col>
        <Col span={14}>
          <div
            style={{
              padding: "32px",
              backgroundColor: "#fff",
              borderRadius: "5px ",
            }}
          >
            <Flex justify="space-between" align="center">
              <Title level={2}>Tôi thấy hoa vàng trên cỏ xanh</Title>
              <Button type="primary" style={{ padding: "10px 24px" }}>
                Thêm vào giỏ hàng{" "}
              </Button>
            </Flex>
            <div
              style={{
                marginTop: "32px",
                padding: "24px",
                backgroundColor: "rgb(239, 246, 255)",
                borderRadius: "12px",
              }}
            >
              <Flex gap={4} align="center">
                <Title level={2} style={{ color: "rgb(37, 99, 235)" }}>
                  đ{Number(141000).toLocaleString("VN-vi")}
                </Title>
                <Flex gap={3} align="center">
                  <Title
                    level={4}
                    style={{
                      color: "rgb(156, 163, 175)",
                      textDecoration: "line-through",
                    }}
                  >
                    đ{Number(141000).toLocaleString("VN-vi")}
                  </Title>

                  <Title
                    style={{
                      backgroundColor: "rgb(254, 226, 226)",
                      padding: "4px 16px",
                      borderRadius: "9999px",
                      margin: 0,
                    }}
                    type="danger"
                    level={5}
                  >
                    Giảm 12%
                  </Title>
                </Flex>
              </Flex>
            </div>
            <div style={{ marginTop: "32px" }}>
              <Title level={3}>Mô tả sản phẩm</Title>
              <Text>
                Tôi Thấy Hoa Vàng Trên Cỏ Xanh (Nguyễn Nhật Ánh) - (Bản in mới -
                Cuối 2018 đầu 2019)
              </Text>
            </div>
          </div>
        </Col>
      </Row>
      <div
        style={{ marginTop: "32px", padding: "24px", backgroundColor: "white" }}
      >
        <Title level={3}>Thông tin chi tiết</Title>
        <Divider></Divider>
        <Flex vertical gap={32}>
          <Row
            style={{
              padding: "24px",
              border: "1px solid rgb(222, 226, 230)",
              borderRadius: "10px",
            }}
          >
            <Col span={6}>
              <Text>Tác giả</Text>
            </Col>
            <Col>
              <Text strong>Nguyễn Nhật Ánh</Text>
            </Col>
          </Row>
          <Row
            style={{
              padding: "24px",
              border: "1px solid rgb(222, 226, 230)",
              borderRadius: "10px",
            }}
          >
            <Col span={6}>
              <Text>Ngôn ngữ</Text>
            </Col>
            <Col>
              <Text strong>Tiếng việt</Text>
            </Col>
          </Row>
        </Flex>
      </div>
    </div>
  );
}

export default ProductDetail;
