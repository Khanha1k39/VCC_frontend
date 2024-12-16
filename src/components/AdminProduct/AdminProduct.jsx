import Title from "antd/es/typography/Title";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, InputNumber, Modal } from "antd";
import TableComponent from "../TableComponents/TableComponent";
import { useState } from "preact/hooks";
import TextArea from "antd/es/input/TextArea";

function AdminProduct() {
  const [value, setValue] = useState("hihi");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formDataState, setFormData] = useState({
    title: "hai",
    author: "",
    description: "",
    image_url: "",
    meta_data: {
      coverType: "",
      publisher: "",
      publicationDate: "",
      pages: 0,
    },
    price: 0,
    quantity_available: 0,
    value: 0,
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMetaDataChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      meta_data: {
        ...prevData.meta_data,
        [key]: value,
      },
    }));
  };

  const handleNumberChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    values.title = "5";
    console.log("Form Data:", values);
    setFormData({
      title: "",
      author: "",
      description: "",
      image_url: "",
      meta_data: {
        coverType: "",
        publisher: "",
        publicationDate: "",
        pages: 0,
      },
      price: 0,
      quantity_available: 0,
      value: 0,
    });
    console.log("Form Data:", values);
  };

  return (
    <>
      <Title level={5}>Quản lý sản phẩm </Title>
      <div style={{ marginTop: "10px" }}>
        <Button
          style={{
            height: "150px",
            width: "150px",
            borderRadius: "6px",
            borderStyle: "dashed",
          }}
          onClick={showModal}
        >
          <PlusOutlined></PlusOutlined>
        </Button>
      </div>
      <TableComponent></TableComponent>
      <Modal
        title="Tạo sản phẩm"
        footer={(i) => {}}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <Form
          onFinish={onFinish}
          name="bookForm"
          layout="horizontal"
          labelCol={{
            span: 8,
          }}
          labelAlign="left"
          labelWrap
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          autoComplete="off"
        >
          {/* Title */}
          <Form.Item
            label="Tên sách"
            name="title"
            rules={[
              {
                required: true,
                message: "Xin hãy điền tên sách",
              },
            ]}
          >
            <Input value={formDataState.title} onChange={handleOnChange} />
          </Form.Item>

          {/* Author */}
          <Form.Item
            label="Tác giả"
            name="author"
            rules={[
              {
                required: true,
                message: "Xin hãy điền tác giả!",
              },
            ]}
          >
            <Input value={formDataState.author} onChange={handleOnChange} />
          </Form.Item>

          {/* Description */}
          <Form.Item
            label="Mô tả chi tiết"
            rules={[
              {
                required: true,
                message: "Xin hãy điền mô tả chi tiết của cuốn sách",
              },
            ]}
          >
            <Input.TextArea
              value={formDataState.description}
              onChange={handleOnChange}
              name="description"
            />
          </Form.Item>

          {/* Image URL */}
          <Form.Item
            label="URL hình ảnh"
            name="image_url"
            rules={[
              {
                required: true,
                message: "Xin hãy điền URL hình ảnh!",
              },
            ]}
          >
            <Input
              value={formDataState.image_url}
              onChange={handleOnChange}
              name="image_url"
            />
          </Form.Item>

          <Form.Item
            label="Loại bìa"
            name={["meta_data", "coverType"]}
            rules={[
              {
                required: true,
                message: "Xin hãy điền loại bìa!",
              },
            ]}
          >
            <Input
              value={formDataState.meta_data.coverType}
              onChange={(e) =>
                handleMetaDataChange("coverType", e.target.value)
              }
            />
          </Form.Item>

          <Form.Item
            label="Nhà xuất bản"
            name={["meta_data", "publisher"]}
            rules={[
              {
                required: true,
                message: "Xin hãy điền nhà xuất bản!",
              },
            ]}
          >
            <Input
              value={formDataState.meta_data.publisher}
              onChange={(e) =>
                handleMetaDataChange("publisher", e.target.value)
              }
            />
          </Form.Item>

          <Form.Item
            label="Ngày sản xuất "
            name={["meta_data", "publicationDate"]}
            rules={[
              {
                required: true,
                message: "Xin hãy điền  the ngày sản xuất!",
              },
            ]}
          >
            <Input
              value={formDataState.meta_data.publicationDate}
              onChange={(e) =>
                handleMetaDataChange("publicationDate", e.target.value)
              }
            />
          </Form.Item>

          <Form.Item
            label="Số trang"
            name={["meta_data", "pages"]}
            rules={[
              {
                required: true,
                message: "Xin hãy điền số trang!",
              },
            ]}
          >
            <InputNumber
              value={formDataState.meta_data.pages}
              onChange={(value) => handleMetaDataChange("pages", value)}
            />
          </Form.Item>

          {/* Price */}
          <Form.Item
            label="Giá bán"
            name="price"
            rules={[
              {
                required: true,
                message: "Hãy điền giá bán!",
              },
            ]}
          >
            <InputNumber
              value={formDataState.price}
              onChange={(value) => handleNumberChange("price", value)}
            />
          </Form.Item>

          {/* Quantity Available */}
          <Form.Item
            label="Số lượng sácch"
            name="quantity_available"
            rules={[
              {
                required: true,
                message: "Xin hãy  điền số lượng sách!",
              },
            ]}
          >
            <InputNumber
              value={formDataState.quantity_available}
              onChange={(value) =>
                handleNumberChange("quantity_available", value)
              }
            />
          </Form.Item>

          <Form.Item
            label="Gía gốc"
            name="value"
            rules={[
              {
                required: true,
                message: "Xin hãy điền giá gốc!",
              },
            ]}
          >
            <InputNumber
              value={formDataState.value}
              onChange={(value) => handleNumberChange("value", value)}
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AdminProduct;
