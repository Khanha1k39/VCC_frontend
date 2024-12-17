import { Button, Divider, Radio, Table } from "antd";
import { useState } from "preact/hooks";
import Loading from "../LoadingComponent/Loading";

// rowSelection object indicates the need for row selection
// const rowSelection = {
//   onChange: (selectedRowKeys, selectedRows) => {
//     console.log(
//       `selectedRowKeys: ${selectedRowKeys}`,
//       "selectedRows: ",
//       selectedRows
//     );
//   },
//   getCheckboxProps: (record) => ({
//     disabled: record.name === "Disabled User",
//     // Column configuration not to be checked
//     name: record.name,
//   }),
// };
function TableComponent(props) {
  // rowSelection object indicates the need for row selection

  const [rowSelectedKeys, setSelectedRowKeys] = useState([]);
  const {
    selectionType = "checkbox",
    data = [],
    columns = [],
    handleDeleteManyProducts,
    isLoading = false,
    option = {},
  } = props;
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setSelectedRowKeys(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  const handleDeleteAll = () => {
    handleDeleteManyProducts(rowSelectedKeys);
    setSelectedRowKeys([]);
  };
  return (
    <div style={{ marginTop: "20px" }}>
      <Loading isLoading={isLoading}>
        <Button
          color="danger"
          type="primary"
          variant="filled"
          disabled={!rowSelectedKeys.length}
          onClick={handleDeleteAll}
        >
          Xóa tất cả
        </Button>
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          {...option}
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </Loading>
    </div>
  );
}

export default TableComponent;
