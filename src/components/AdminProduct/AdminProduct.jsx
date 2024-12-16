import Title from "antd/es/typography/Title";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
} from "antd";
import TableComponent from "../TableComponents/TableComponent";
import { useEffect, useState } from "preact/hooks";
import TextArea from "antd/es/input/TextArea";
import { useMutaionHook } from "../../hooks/useMutaionHook";
import {
  createProduct,
  deleteManyProduct,
  deleteProduct,
  getAllProduct,
  getDerailsProduct,
  updateProduct,
} from "../../services/ProductServices";
import Loading from "../LoadingComponent/Loading";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";
function AdminProduct() {
  const user = useSelector((state) => state.user);

  const [drawerForm] = Form.useForm();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const fetchGetDetailsProduct = async (id) => {
    const res = await getDerailsProduct(id);
    if (res?.data) {
      drawerForm.setFieldsValue(res.data);
    }
  };
  const handleDetailsProduct = () => {
    // if (rowSelected) {
    //  await fetchGetDetailsProduct();
    // }
    setIsOpenDrawer(true);
  };
  useEffect(() => {
    if (rowSelected) {
      fetchGetDetailsProduct(rowSelected);
    }
  }, [rowSelected]);
  const columns = [
    {
      title: "Title",
      dataIndex: "_id",
      sorter: (a, b) => {
        a.title.length - b.title.length;
      },
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Title",
      dataIndex: "title",
      render: (text) => <strong>{text}</strong>,
      sorter: (a, b) => {
        a.title.length - b.title.length;
      },
    },
    {
      title: "Author",
      dataIndex: "author",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Image",
      dataIndex: "image_url",
      render: (url) => (
        <img src={url} alt="Book cover" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: "Cover Type",
      dataIndex: ["meta_data", "coverType"], // Lấy từ meta_data.coverType
    },
    {
      title: "Publisher",
      dataIndex: ["meta_data", "publisher"], // Lấy từ meta_data.publisher
    },
    {
      title: "Publication Date",
      dataIndex: ["meta_data", "publicationDate"], // Lấy từ meta_data.publicationDate
      render: (date) => date || "N/A", // Hiển thị "N/A" nếu không có ngày
    },
    {
      title: "Pages",
      dataIndex: ["meta_data", "pages"], // Lấy từ meta_data.pages
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => `$${price.toFixed(2)}`,
      sorter: (a, b) => {
        return a.price - b.price;
      },
    },
    {
      title: "Quantity Available",
      dataIndex: "quantity_available",
    },
    {
      title: "Value",
      dataIndex: "value",
      render: (value) => `$${value.toFixed(2)}`,
      sorter: (a, b) => {
        return a.value - b.value;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <div>
          <DeleteOutlined
            onClick={() => {
              setIsDeleteModalOpen(true);
            }}
            style={{ fontSize: "30px", color: "red" }}
          ></DeleteOutlined>
          <EditOutlined
            style={{ fontSize: "30px", color: "orange" }}
            onClick={handleDetailsProduct}
          ></EditOutlined>
        </div>
      ),
    },
  ];

  const [form] = Form.useForm();

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
  const mutation = useMutaionHook((data) => {
    const res = createProduct(data);
    return res;
  });
  const mutationUpdate = useMutaionHook(({ id, token, ...rest }) => {
    const res = updateProduct(id, token, rest?.data);
    return res;
  });
  const mutationDelete = useMutaionHook(({ id, token }) => {
    console.log("mutationDelete", id, token);
    const res = deleteProduct(id, token);
    return res;
  });
  const mutationDeleteMany = useMutaionHook(({ ids, token }) => {
    const res = deleteManyProduct(ids, token);
    return res;
  });
  const handleDeleteManyProducts = (ids) => {
    mutationDeleteMany.mutate(
      { ids, token: user?.access_token },
      {
        onSettled: () => {
          refetch();
        },
      }
    );
  };
  const { data, isError, isSuccess, isPending } = mutation;
  const {
    data: dataUpdate,
    isError: isErrorUpdate,
    isSuccess: isSuccessUpdate,
    isPending: isPendingUpdatde,
  } = mutationUpdate;
  const {
    data: dataDeleted,
    isError: isErrorDeleted,
    isSuccess: isSuccessDeleted,
    isPending: isPendingDeleted,
  } = mutationDelete;
  console.log("isDeleteModal", isDeleteModalOpen);

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success("Thành công");
      form.resetFields();
      handleCancel();
    } else if (isError) {
      message.error();
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isSuccessUpdate && dataUpdate?.status === "ok") {
      message.success("Thành công");
      // drawerForm.resetFields();
      setIsOpenDrawer(false);
      console.log("isopen", isOpenDrawer);
    } else if (isErrorUpdate) {
      message.error();
    }
  }, [isSuccessUpdate]);
  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "ok") {
      message.success("Thành công");
      // drawerForm.resetFields();
      setIsDeleteModalOpen(false);
    } else if (isErrorDeleted) {
      message.error();
    }
  }, [isSuccessDeleted]);
  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };
  const onFinish = (values) => {
    mutation.mutate(values, {
      onSettled: () => {
        refetch();
      },
    });
  };
  const onFinishUpdateProduct = (values) => {
    mutationUpdate.mutate(
      {
        id: rowSelected,
        token: user?.access_token,
        data: values,
      },
      {
        onSettled: () => {
          refetch();
        },
      }
    );
  };
  const handleDeleteProduct = () => {
    mutationDelete.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          refetch();
        },
      }
    );
    console.log("delete product");
  };
  const getAllProducts = async () => {
    const res = await getAllProduct();

    return res;
  };
  const {
    isLoading: isLoadingAllProduct,
    data: allProduct,
    refetch, // Hàm để gọi lại request
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  const dataTable = allProduct?.data?.map((product) => {
    return { ...product, key: product._id };
  });
  return (
    <Loading isLoading={false}>
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
      <TableComponent
        data={dataTable}
        isLoading={isLoadingAllProduct}
        columns={columns}
        handleDeleteManyProducts={handleDeleteManyProducts}
        option={{
          onRow: (record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id);
              },
            };
          },
        }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setRowSelected(record._id);
            },
          };
        }}
      ></TableComponent>
      <Modal
        getContainer={false}
        title="Tạo sản phẩm"
        footer={(i) => {}}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <Loading isLoading={isPending}>
          <Form
            form={form}
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
            initialValues={{
              title: "s",
              author: "s",
              description: "s",
              image_url: "s",
              meta_data: {
                coverType: "s",
                publisher: "s",
                publicationDate: "s",
                pages: 0,
              },
              price: 0,
              quantity_available: 0,
              value: 0,
            }}
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
              name="description"
            >
              <Input.TextArea
                value={formDataState.description}
                onChange={handleOnChange}
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
        </Loading>
      </Modal>
      <DrawerComponent
        title="Chi tiết sản phẩm"
        isOpen={isOpenDrawer}
        onClose={() => {
          setIsOpenDrawer(false);
        }}
        width="50%"
      >
        <Loading isLoading={isPendingUpdatde}>
          <Form
            form={drawerForm}
            name="bookUpdateForm"
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
            onFinish={onFinishUpdateProduct}
            // initialValues={{
            //   title: "s",
            //   author: "s",
            //   description: "s",
            //   image_url: "s",
            //   meta_data: {
            //     coverType: "s",
            //     publisher: "s",
            //     publicationDate: "s",
            //     pages: 0,
            //   },
            //   price: 0,
            //   quantity_available: 0,
            //   value: 0,
            // }}
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
              <Input />
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
              name="description"
            >
              <Input.TextArea
                value={formDataState.description}
                onChange={handleOnChange}
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
        </Loading>
      </DrawerComponent>

      <Modal
        // getContainer={false}
        title="Xóa sản phẩm"
        open={isDeleteModalOpen}
        onOk={handleDeleteProduct}
        onCancel={handleCancelDelete}
      >
        <Loading isLoading={isPendingDeleted}>
          <div>Bạn có chắc xóa sản phẩm này không</div>
        </Loading>
      </Modal>
    </Loading>
  );
}

export default AdminProduct;
