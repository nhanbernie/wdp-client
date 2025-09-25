import { CartItem, CartSummary } from "../types/cart.types";

export const SAMPLE_CART_ITEMS: CartItem[] = [
  {
    id: "1",
    name: "Xi măng Portland PC40",
    description: "Xi măng chất lượng cao cho các công trình xây dựng",
    price: 85000,
    originalPrice: 95000,
    quantity: 2,
    image:
      "https://www.bing.com/images/search?view=detailV2&ccid=ClHEKuJA&id=8B0EDE136766BFEB3A1CA43FA481B694422377B1&thid=OIP.ClHEKuJA-AOauEb2jsXBUgHaEK&mediaurl=https%3a%2f%2fcdn.nhathuoclongchau.com.vn%2funsafe%2fhttps%3a%2f%2fcms-prod.s3-sgn09.fptcloud.com%2fbo_san_pham_cocoon_giup_cham_soc_da_toan_dien_moi_ngay_v_TCTW_1680073824_407fe6b521.jpg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.0a51c42ae240f8039ab846f68ec5c152%3frik%3dsXcjQpS2gaQ%252fpA%26pid%3dImgRaw%26r%3d0&exph=675&expw=1200&q=%e1%ba%a3nh+s%e1%ba%a3n+ph%e1%ba%a9m&FORM=IRPRST&ck=D344EA3A0D60E0FD5695A57DF3856926&selectedIndex=36&itb=0",
    category: "Xi măng",
    brand: "Vicem",
    weight: 50,
    dimensions: "50kg/bao",
    inStock: true,
    maxQuantity: 100,
  },
  {
    id: "2",
    name: "Thép cây D12",
    description: "Thép cây cường độ cao cho kết cấu bê tông",
    price: 125000,
    quantity: 5,
    image:
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop",
    category: "Thép",
    brand: "Hòa Phát",
    weight: 12,
    dimensions: "D12mm",
    inStock: true,
    maxQuantity: 50,
  },
  {
    id: "3",
    name: "Gạch ống 4 lỗ",
    description: "Gạch ống chất lượng cao cho xây dựng",
    price: 2500,
    quantity: 100,
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300&h=300&fit=crop",
    category: "Gạch",
    brand: "Viglacera",
    weight: 1.5,
    dimensions: "10x20x40cm",
    inStock: true,
    maxQuantity: 1000,
  },
  {
    id: "4",
    name: "Cát xây dựng",
    description: "Cát vàng chất lượng cao cho xây dựng",
    price: 180000,
    originalPrice: 200000,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop",
    category: "Cát",
    brand: "Sông Đà",
    weight: 1000,
    dimensions: "1m³",
    inStock: true,
    maxQuantity: 10,
  },
];

export const SAMPLE_CART_SUMMARY: CartSummary = {
  subtotal: 5250000,
  shipping: 500000,
  tax: 525000,
  discount: 200000,
  total: 6075000,
  itemCount: 4,
};
