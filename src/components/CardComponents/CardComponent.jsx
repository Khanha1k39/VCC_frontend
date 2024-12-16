import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import { Flex, Image, Space, Typography } from "antd";
const { Text, Link } = Typography;
import {
  StlyeNameProduct,
  StyledRate,
  WrapperDiscountText,
  WrapperPriceText,
  WrapperReportText,
} from "./style";
import { StarFilled } from "@ant-design/icons";
import { Button, Rate } from "antd";
import Title from "antd/es/typography/Title";
import { getDiscountValue } from "../../comma/utils";

function CardComponent({ book }) {
  return (
    <Card
      hoverable
      style={{ padding: "10px", height: "450px" }}
      cover={<img alt="example" src={book?.image_url} />}
    >
      <Text type="secondary">{book?.author}</Text>
      <StlyeNameProduct> {book.title}</StlyeNameProduct>
      {/* <WrapperReportText>
        <span>
          4.8
          <StarFilled
            style={{ fontSize: "10px", color: "yellow" }}
          ></StarFilled>
        </span>
        <span>| Da ban 1000+</span>
      </WrapperReportText> */}
      <WrapperPriceText>
        <Flex align="center" justify="space-between">
          <Flex vertical gap={0}>
            <Title level={4} style={{ color: "#DC2626", margin: 0 }}>
              đ{Number(book.price).toLocaleString("VN-vi")}
            </Title>
            <Title
              level={5}
              style={{
                color: "rgb(156, 163, 175)",
                textDecoration: "line-through",
                margin: 0,
              }}
            >
              đ{Number(book.value).toLocaleString("VN-vi")}
            </Title>
          </Flex>
          <WrapperDiscountText style={{ padding: "6px 12px" }}>
            - {getDiscountValue(book.value, book.price)}%
          </WrapperDiscountText>
        </Flex>
      </WrapperPriceText>
    </Card>
  );
}

export default CardComponent;
