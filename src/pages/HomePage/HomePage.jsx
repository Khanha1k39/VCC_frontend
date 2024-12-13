import { Col, Pagination, Row } from "antd";
import CardComponent from "../../components/CardComponents/CardComponent";

function HomePage() {
  return (
    <div style={{ padding: "0 120px" }}>
      <div
        id="container"
        style={{ backgroundColor: "#efefef", padding: "16px" }}
      >
        <div>
          <Row justify={"center"} gutter={[0, 16]} style={{ gap: "16px" }}>
            <Col span={4}>
              <CardComponent></CardComponent>
            </Col>
            <Col span={4}>
              <CardComponent></CardComponent>
            </Col>
            <Col span={4}>
              <CardComponent></CardComponent>
            </Col>
            <Col span={4}>
              <CardComponent></CardComponent>
            </Col>
            <Col span={4}>
              <CardComponent></CardComponent>
            </Col>
            <Col span={4}>
              <CardComponent></CardComponent>
            </Col>
            <Col span={4}>
              <CardComponent></CardComponent>
            </Col>
          </Row>
          <Pagination
            defaultCurrent={6}
            total={600}
            style={{ justifyContent: "center", marginTop: "10px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
