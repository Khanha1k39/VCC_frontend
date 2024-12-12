import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import { Space, Typography } from "antd";
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

function CardComponent() {
  return (
    <Card
      hoverable
      style={{ width: 200, padding: "10px" }}
      cover={
        <img
          alt="example"
          src="https://salt.tikicdn.com/cache/750x750/ts/product/2e/ae/d3/2e400bbfda127802bf5fd46f86ead538.jpg.webp"
        />
      }
    >
      {" "}
      <Text type="secondary">Nguyễn Nhật Ánh</Text>
      <StlyeNameProduct> Tôi thấy hoa vàng trên cỏ xanh</StlyeNameProduct>
      <WrapperReportText>
        <span>
          {/* <StyledRate
            style={{ fontSize: "12px", margin: 0 }}
            disabled
            defaultValue={2}
          /> */}
          4.8
          <StarFilled
            style={{ fontSize: "10px", color: "yellow" }}
          ></StarFilled>
        </span>
        <span>| Da ban 1000+</span>
      </WrapperReportText>
      <WrapperPriceText>
        1.000.000d <WrapperDiscountText>-5%</WrapperDiscountText>
      </WrapperPriceText>
    </Card>
  );
}

export default CardComponent;
