import { Divider, Radio, Table } from "antd";
import { useState } from "preact/hooks";
import Loading from "../LoadingComponent/Loading";

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    // Column configuration not to be checked
    name: record.name,
  }),
};
function TableComponent(props) {
  const {
    selectionType = "checkbox",
    data = [],
    columns = [],
    isLoading = false,
    option = {},
  } = props;

  return (
    <div style={{ marginTop: "20px" }}>
      <Loading isLoading={isLoading}>
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          {...option}
          columns={columns}
          dataSource={data}
        />
      </Loading>
    </div>
  );
}

export default TableComponent;
