import { Col, Pagination, Row } from "antd";
import CardComponent from "../../components/CardComponents/CardComponent";
import { useQuery } from "@tanstack/react-query";
import { getAllProduct } from "../../services/ProductServices";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "preact/hooks";
import { current } from "@reduxjs/toolkit";
import { Navigate, useNavigate, useParams } from "react-router-dom";

function HomePage() {
  let { page } = useParams();
  if (!page) {
    page = 1;
  }
  const navigate = useNavigate();
  const product = useSelector((state) => {
    state.product;
  });
  const refSearch = useRef();
  // useEffect(() => {

  //   if (refSearch.current) {
  //     console.log("chay chay");
  //   }
  //   refSearch.current = true;
  // }, [product?.search]);

  useEffect(() => {
    if (refSearch.current) {
      console.log("chay chay");
    }
    refSearch.current = true;
  }, [product?.search]);
  const fetProductAll = async (page) => {
    const res = await getAllProduct(page);
    if (res?.status == "ok") {
      // setPaginate({ ...paginate, total: res?.totalBook });
    }
    return res;
  };
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["products", page],
    queryFn: () => fetProductAll(page),
  });
  const products = data;
  console.log(products, products);
  const onChange = (page, size) => {
    navigate(`/product/page/${page}`);
  };
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
            defaultCurrent={page}
            total={products?.totalBook}
            pageSize={8}
            style={{ justifyContent: "center", marginTop: "10px" }}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
