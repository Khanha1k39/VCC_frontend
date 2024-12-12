import { Rate } from "antd";
import styled from "styled-components";

export const StlyeNameProduct = styled.div`
  font-weight: 400;
  font-size: 16 px;
  line-height: 16px;
  color: rgb(56, 56, 61);
`;

export const WrapperReportText = styled.div`
  font-size: 11px;
  line-height: 16px;
  color: rgb(128, 128, 137);
  align-items: center;
`;
export const WrapperPriceText = styled.div`
  color: rgb(255, 66, 78);
  font-size: 16px;
  font-weight: 500;
  margin: 6px 0 0px;
`;
export const WrapperDiscountText = styled.span`
  color: rgb(255, 66, 78);
  font-size: 12px;
  font-weight: 500;
`;
export const StyledRate = styled(Rate)`
  font-size: 12px;
  margin: 0;

  .ant-rate-star {
    margin: 0;
    font-size: 14px; /* Thay đổi kích thước */
  }
`;
