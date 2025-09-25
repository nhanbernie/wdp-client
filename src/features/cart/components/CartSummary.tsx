"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    ShoppingCart,
    Truck,
    Shield,
    CreditCard,
    Tag,
    ChevronDown,
    ChevronUp,
    CheckCircle,
    Sparkles,
    Gift
} from "lucide-react";
import { CartSummary as CartSummaryType } from "../types/cart.types";

interface CartSummaryProps {
    summary: CartSummaryType;
    onCheckout: () => void;
    onApplyCoupon?: (coupon: string) => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
    summary,
    onCheckout,
    onApplyCoupon,
}) => {
    const [couponCode, setCouponCode] = useState("");
    const [showCouponForm, setShowCouponForm] = useState(false);
    const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    const handleApplyCoupon = () => {
        if (couponCode.trim() && onApplyCoupon) {
            onApplyCoupon(couponCode.trim());
            setAppliedCoupon(couponCode.trim());
            setCouponCode("");
            setShowCouponForm(false);
        }
    };

    const handleRemoveCoupon = () => {
        setAppliedCoupon(null);
        if (onApplyCoupon) {
            onApplyCoupon("");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="sticky top-6"
        >
            <div className="rounded-3xl p-8 shadow-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 backdrop-blur-sm">

                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg">
                        <ShoppingCart className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Tóm tắt đơn hàng
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            {summary.itemCount} sản phẩm trong giỏ
                        </p>
                    </div>
                </div>

                {/* Item Count Badge */}
                <div className="flex items-center justify-between py-4 px-6 rounded-2xl mb-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                            Đơn hàng hợp lệ
                        </span>
                    </div>
                    <span className="text-lg font-bold text-slate-900 dark:text-white">
                        {summary.itemCount} sản phẩm
                    </span>
                </div>

                {/* Order Summary */}
                <div className="space-y-6 mb-8">
                    {/* Subtotal */}
                    <div className="flex items-center justify-between py-3">
                        <span className="text-lg font-medium text-slate-700 dark:text-slate-300">
                            Tạm tính
                        </span>
                        <span className="text-lg font-bold text-slate-900 dark:text-white">
                            {formatPrice(summary.subtotal)}
                        </span>
                    </div>

                    {/* Shipping */}
                    <div className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                            <Truck className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                            <span className="text-lg font-medium text-slate-700 dark:text-slate-300">
                                Phí vận chuyển
                            </span>
                        </div>
                        <span className="text-lg font-bold text-slate-900 dark:text-white">
                            {summary.shipping === 0 ? "Miễn phí" : formatPrice(summary.shipping)}
                        </span>
                    </div>

                    {/* Tax */}
                    <div className="flex items-center justify-between py-3">
                        <span className="text-lg font-medium text-slate-700 dark:text-slate-300">
                            Thuế VAT
                        </span>
                        <span className="text-lg font-bold text-slate-900 dark:text-white">
                            {formatPrice(summary.tax)}
                        </span>
                    </div>

                    {/* Discount */}
                    {summary.discount > 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center justify-between py-3 px-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800"
                        >
                            <div className="flex items-center gap-3">
                                <Gift className="w-5 h-5 text-green-600 dark:text-green-400" />
                                <span className="text-lg font-medium text-green-700 dark:text-green-400">
                                    Giảm giá
                                </span>
                            </div>
                            <span className="text-lg font-bold text-green-600 dark:text-green-400">
                                -{formatPrice(summary.discount)}
                            </span>
                        </motion.div>
                    )}
                </div>

                {/* Coupon Section */}
                <div className="mb-8">
                    {appliedCoupon ? (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-800"
                        >
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                <span className="text-sm font-semibold text-purple-700 dark:text-purple-400">
                                    Mã giảm giá: {appliedCoupon}
                                </span>
                            </div>
                            <button
                                onClick={handleRemoveCoupon}
                                className="text-xs px-3 py-1 rounded-lg text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
                            >
                                Xóa
                            </button>
                        </motion.div>
                    ) : (
                        <div>
                            <button
                                onClick={() => setShowCouponForm(!showCouponForm)}
                                className="flex items-center justify-between w-full p-4 rounded-2xl transition-all duration-200 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-600 border border-slate-200 dark:border-slate-600 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <Tag className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                        Áp dụng mã giảm giá
                                    </span>
                                </div>
                                {showCouponForm ? (
                                    <ChevronUp className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                                )}
                            </button>

                            <AnimatePresence>
                                {showCouponForm && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="mt-4 overflow-hidden"
                                    >
                                        <div className="flex gap-3">
                                            <input
                                                type="text"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                                placeholder="Nhập mã giảm giá"
                                                className="flex-1 px-4 py-3 rounded-xl text-sm border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                            />
                                            <button
                                                onClick={handleApplyCoupon}
                                                disabled={!couponCode.trim()}
                                                className="px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 hover:shadow-lg"
                                            >
                                                Áp dụng
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>

                {/* Total */}
                <div className="py-6 px-8 rounded-2xl mb-8 bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-indigo-900/20 border-2 border-purple-200 dark:border-purple-800">
                    <div className="flex flex-col items-center text-center">
                        <span className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                            Tổng cộng
                        </span>
                        <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            {formatPrice(summary.total)}
                        </span>
                    </div>
                </div>

                {/* Checkout Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onCheckout}
                    className="w-full py-5 rounded-2xl font-bold text-xl transition-all duration-300 shadow-xl hover:shadow-2xl bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 relative overflow-hidden"
                >
                    <div className="flex items-center justify-center gap-3 relative z-10">
                        <CreditCard className="w-6 h-6" />
                        Thanh toán ngay
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </motion.button>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-3 mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                    <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Thanh toán an toàn & bảo mật
                    </span>
                </div>

                {/* Estimated Delivery */}
                <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-3 mb-2">
                        <Truck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                            Dự kiến giao hàng
                        </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Giao hàng trong 2-3 ngày làm việc • Miễn phí vận chuyển
                    </p>
                </div>

                {/* Special Offer */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800"
                >
                    <div className="flex items-center gap-3">
                        <Sparkles className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                        <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-400">
                            Ưu đãi đặc biệt
                        </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Mua thêm 500k để được miễn phí vận chuyển
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default CartSummary;
