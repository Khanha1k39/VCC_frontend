import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductService } from "../../services/products.service";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";
import {
  FaStar,
  FaBook,
  FaUser,
  FaBookOpen,
  FaBuilding,
  FaCalendarAlt,
  FaFileAlt,
  FaLanguage,
  FaTheaterMasks,
  FaMusic,
  FaCompactDisc,
  FaFilm,
  FaClock,
  FaIndustry,
  FaClosedCaptioning,
  FaSearch,
} from "react-icons/fa";
import Button from "@mui/material/Button";
import { useCart } from "../carts/CartContext";
import ToastUtil from "../../common/utils";
import { formatNumber } from "../../common/utils";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const { addMediaToCart } = useCart();
  useEffect(() => {
    const getMediaDetail = async () => {
      try {
        const response = await ProductService.getMediaById(id);

        const metaDataObject = JSON.parse(response?.data?.data?.metaData);

        setProduct({
          ...response?.data?.data,
          metaData: metaDataObject,
        });
      } catch (error) {
        console.error("Error fetching media:", error);
      }
    };

    getMediaDetail();
  }, [id]);

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      Tất cả sản phẩm
    </Link>,
    <Typography key="2" color="text.primary">
      {product?.title}
    </Typography>,
  ];

  const infoItems = [
    {
      label: "Tác giả",
      key: "authors",
      icon: <FaUser className="text-blue-500" />,
    },
    {
      label: "Loại bìa",
      key: "coverType",
      icon: <FaBook className="text-indigo-500" />,
    },
    {
      label: "Nhà xuất bản",
      key: "publisher",
      icon: <FaBuilding className="text-purple-500" />,
    },
    {
      label: "Ngày xuất bản",
      key: "publicationDate",
      icon: <FaCalendarAlt className="text-red-500" />,
    },
    {
      label: "Số trang",
      key: "pages",
      icon: <FaFileAlt className="text-green-500" />,
    },
    {
      label: "Ngôn ngữ",
      key: "language",
      icon: <FaLanguage className="text-yellow-600" />,
    },
    {
      label: "Thể loại",
      key: "genre",
      icon: <FaTheaterMasks className="text-pink-500" />,
    },
    {
      label: "Nghệ sĩ",
      key: "artists",
      icon: <FaMusic className="text-purple-600" />,
    },
    {
      label: "Hãng ghi âm",
      key: "recordLabel",
      icon: <FaCompactDisc className="text-blue-600" />,
    },
    {
      label: "Đạo diễn",
      key: "director",
      icon: <FaFilm className="text-gray-600" />,
    },
    {
      label: "Thời lượng",
      key: "runTime",
      icon: <FaClock className="text-orange-500" />,
    },
    {
      label: "Hãng sản xuất",
      key: "studio",
      icon: <FaIndustry className="text-teal-500" />,
    },
    {
      label: "Phụ đề",
      key: "subtitles",
      icon: <FaClosedCaptioning className="text-cyan-500" />,
    },
  ];

  const getDiscountValue = (value, price) => {
    if (!value || !price) {
      return 0;
    }
    return (((value - price) * 100) / product.value).toFixed(0);
  };
  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {ToastUtil.initializeToastContainer()}

      <div className="container max-w-7xl mx-auto px-4 pt-8">
        <Breadcrumbs
          aria-label="breadcrumb"
          className="bg-white p-4 rounded-lg shadow-sm mb-6"
          sx={{
            "& .MuiTypography-root": {
              fontSize: "0.95rem",
              fontWeight: 500,
            },
            "& a": {
              color: "#3b82f6",
              "&:hover": {
                color: "#2563eb",
              },
            },
          }}
        >
          {breadcrumbs}
        </Breadcrumbs>

        <div className="grid grid-cols-12 gap-8 mb-8">
          <div className="col-span-12 md:col-span-4">
            <div className="bg-white p-6 rounded-xl shadow-md overflow-hidden">
              <div className="relative group cursor-pointer">
                <img
                  src={product?.imageUrl}
                  alt={product?.title}
                  className="w-full h-auto object-cover rounded-lg transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-lg" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <FaSearch className="text-white text-3xl drop-shadow-lg" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="font-bold text-2xl md:text-3xl text-gray-800 leading-tight mb-2">
                    {product?.title}
                  </h1>
                  <div className="flex items-center gap-4">
                    <Chip
                      sx={{
                        background: "linear-gradient(45deg, #2563eb, #3b82f6)",
                        color: "#ffffff",
                        fontWeight: "600",
                        fontSize: "0.875rem",
                        padding: "4px 8px",
                        height: "32px",
                        "& .MuiChip-label": {
                          padding: "0 8px",
                        },
                      }}
                      label={product?.type}
                    />
                    <div className="flex text-amber-400 gap-1">
                      {[...Array(5)].map((_, index) => (
                        <FaStar key={index} className="w-5 h-5" />
                      ))}
                    </div>
                  </div>
                </div>

                <Button
                  size="large"
                  sx={{
                    background: "linear-gradient(45deg, #2563eb, #3b82f6)",
                    color: "white",
                    padding: "10px 24px",
                    fontSize: "1rem",
                    fontWeight: "600",
                    textTransform: "none",
                    borderRadius: "0.75rem",
                    boxShadow: "0 4px 6px -1px rgb(59 130 246 / 0.3)",
                    "&:hover": {
                      background: "linear-gradient(45deg, #1d4ed8, #2563eb)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 8px -1px rgb(59 130 246 / 0.4)",
                    },
                    transition: "all 0.2s ease",
                  }}
                  variant="contained"
                  onClick={() => addMediaToCart(product)}
                >
                  Thêm vào giỏ hàng
                </Button>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="font-bold text-3xl text-blue-600">
                    ₫{formatNumber(product?.price)}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg text-gray-400 line-through">
                      ₫{formatNumber(product?.value)}
                    </span>
                    <span className="text-sm font-semibold px-3 py-1 bg-red-100 text-red-600 rounded-full">
                      Giảm {getDiscountValue(product?.value, product?.price)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-emerald-600 font-medium">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                Còn hàng: {product?.quantityAvailable ?? 0} sản phẩm
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaBookOpen className="text-blue-500" />
                  Mô tả sản phẩm
                </h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  {product?.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b flex items-center gap-2">
            <FaBookOpen className="text-blue-500" />
            Thông tin chi tiết
          </h3>
          <div className="space-y-4">
            {infoItems.map(
              (item) =>
                product?.metaData?.[item.key] && (
                  <div
                    key={item.key}
                    className="grid grid-cols-12 hover:bg-gray-50 p-4 rounded-lg transition-all duration-200 border border-gray-100"
                  >
                    <div className="col-span-12 sm:col-span-3">
                      <div className="flex items-center gap-2 text-gray-700 font-medium">
                        {item.icon}
                        <span className="text-sm uppercase tracking-wide">
                          {item.label}
                        </span>
                      </div>
                    </div>
                    <div className="col-span-12 sm:col-span-9 mt-2 sm:mt-0">
                      <div className="text-gray-900 font-medium pl-7 sm:pl-0">
                        {product?.metaData?.[item.key]}
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b flex items-center gap-2">
            <FaStar className="text-yellow-500" />
            Đánh giá sản phẩm
          </h3>
          {/* Nội dung đánh giá */}
        </div>
      </div>
    </div>
  );
}
