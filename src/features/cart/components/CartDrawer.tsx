"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingBag, Sparkles } from "lucide-react";
import { CartItem as CartItemType, CartSummary as CartSummaryType } from "../types/cart.types";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import CartEmpty from "./CartEmpty";

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItemType[];
    summary: CartSummaryType;
    onUpdateQuantity: (id: string, quantity: number) => void;
    onRemoveItem: (id: string) => void;
    onSaveForLater: (id: string) => void;
    onCheckout: () => void;
    onApplyCoupon?: (coupon: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
    isOpen,
    onClose,
    items,
    summary,
    onUpdateQuantity,
    onRemoveItem,
    onSaveForLater,
    onCheckout,
    onApplyCoupon,
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                        }}
                        className="fixed right-0 top-0 h-full w-full max-w-lg z-50 flex flex-col bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-700 shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-white to-purple-50 dark:from-slate-800 dark:to-purple-900/20">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg">
                                    <ShoppingBag className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        Giỏ hàng
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        {summary.itemCount} sản phẩm
                                    </p>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={onClose}
                                className="p-3 rounded-xl transition-all duration-200 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-300"
                            >
                                <X className="w-6 h-6" />
                            </motion.button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-hidden flex flex-col">
                            {items.length === 0 ? (
                                <div className="flex-1 flex items-center justify-center">
                                    <CartEmpty onContinueShopping={onClose} />
                                </div>
                            ) : (
                                <>
                                    {/* Items List */}
                                    <div className="flex-1 overflow-y-auto p-6">
                                        <div className="space-y-6">
                                            {items.map((item) => (
                                                <CartItem
                                                    key={item.id}
                                                    item={item}
                                                    onUpdateQuantity={onUpdateQuantity}
                                                    onRemoveItem={onRemoveItem}
                                                    onSaveForLater={onSaveForLater}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Summary */}
                                    <div className="border-t border-slate-200 dark:border-slate-700 p-6 bg-gradient-to-r from-white to-purple-50 dark:from-slate-800 dark:to-purple-900/20">
                                        <CartSummary
                                            summary={summary}
                                            onCheckout={onCheckout}
                                            onApplyCoupon={onApplyCoupon}
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Special Offer Banner */}
                        {items.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-t border-yellow-200 dark:border-yellow-800"
                            >
                                <div className="flex items-center gap-3">
                                    <Sparkles className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                                    <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-400">
                                        Ưu đãi đặc biệt
                                    </span>
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                                    Mua thêm 500k để được miễn phí vận chuyển
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
