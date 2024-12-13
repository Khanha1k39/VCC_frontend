import { Col, Pagination, Row } from "antd";
import CardComponent from "../../components/CardComponents/CardComponent";
import { useQuery } from "@tanstack/react-query";
import { getAllProduct } from "../../services/ProductServices";

function HomePage() {
  const fetProductAll = async () => {
    const res = await getAllProduct();
    return res;
  };
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetProductAll,
  });
  console.log(products, isLoading);
  return (
    <div style={{ padding: "0 120px" }}>
      <div
        id="container"
        style={{ backgroundColor: "#efefef", padding: "16px" }}
      >
        <div>
          <Row justify={"center"} gutter={[16, 16]}>
            {products?.data?.map((e, i) => {
              return (
                <Col key={e._id} span={6}>
                  <CardComponent book={e}></CardComponent>
                </Col>
              );
            })}
          </Row>
          <Pagination
            defaultCurrent={products?.pageCurrent}
            total={products?.totalBook}
            style={{ justifyContent: "center", marginTop: "10px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
