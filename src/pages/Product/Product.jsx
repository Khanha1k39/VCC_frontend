import { Breadcrumb, Button, Col, Divider, Flex, Image, Row } from "antd";
import Title from "antd/es/typography/Title";
import { Space, Typography } from "antd";
import { useParams } from "react-router-dom";
import { getDerailsProduct } from "../../services/ProductServices";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Loading from "../../components/LoadingComponent/Loading";
const { Text, Link } = Typography;
function ProductDetail() {
  const { id } = useParams();
  // const fetchGetDetailsProduct = async (context) => {
  //   const id = context?.queryKey && context?.queryKey[1];
  //   const res = await getDerailsProduct(id);
  //   return res.data;
  // };
  // const { isLoading: idPending, data: detailProduct } = useQuery({
  //   queryKey: ["product-detail", id],
  //   queryFn: () => fetchGetDetailsProduct(id),
  //   enabled: !!id,
  // });
  // console.log("detail", detailProduct);
  const transferTypetoTitle = (type) => {
    switch (type) {
      case "genre":
        return "Thể loại";
        break;

      case "coverType":
        return "Loại bìa";
        break;
      case "publisher":
        return "Nhà xuất bản";
        break;
      case "publicationDate":
        return "Ngày xuất bản";
        break;
      case "pages":
        return "Số trang";
        break;
      default:
        break;
    }
  };
  const fetchBookDetail = async (id) => {
    const response = await getDerailsProduct(id);

    return response;
  };
  const { data, isLoading } = useQuery({
    queryKey: ["book-detail", id],
    queryFn: () => fetchBookDetail(id),
    enabled: !!id,
  });
  console.log(data?.data);
  const metaDataArray = Object.entries(data?.data?.meta_data || {});
  console.log(metaDataArray);
  return (
    <Loading isLoading={isLoading}>
      <div
        style={{ padding: "0 120px", backgroundColor: "rgb(239, 239, 239)" }}
      >
        <Breadcrumb
          items={[
            {
              title: "Tất cả sản phẩm",
            },
            {
              title: `${data?.data?.title}`,
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
            <Image src={`${data?.data?.image_url}`} preview={false}></Image>
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
                <Title level={2}>{`${data?.data?.title}`}</Title>
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
                    đ{Number(data?.data?.price).toLocaleString("VN-vi")}
                  </Title>
                  <Flex gap={3} align="center">
                    <Title
                      level={4}
                      style={{
                        color: "rgb(156, 163, 175)",
                        textDecoration: "line-through",
                      }}
                    >
                      đ{Number(data?.data?.value).toLocaleString("VN-vi")}
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
                <Text>{`${data?.data?.description}`}</Text>
              </div>
            </div>
          </Col>
        </Row>
        <div
          style={{
            marginTop: "32px",
            padding: "24px",
            backgroundColor: "white",
          }}
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
                <Text strong>{data?.data?.author}</Text>
              </Col>
            </Row>
            {metaDataArray.map((e, i) => (
              <Row
                key={i}
                style={{
                  padding: "24px",
                  border: "1px solid rgb(222, 226, 230)",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              >
                <Col span={6}>
                  <Text>{transferTypetoTitle(e[0])}</Text>
                </Col>
                <Col>
                  <Text strong>{e[1]}</Text>
                </Col>
              </Row>
            ))}

            {/* <Row
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
          </Row> */}
          </Flex>
        </div>
      </div>
    </Loading>
  );
}

export default ProductDetail;
