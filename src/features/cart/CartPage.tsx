"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, ShoppingBag, Sparkles } from "lucide-react";
import {
    SAMPLE_CART_ITEMS,
    SAMPLE_CART_SUMMARY,
} from "./data/sample-data";
import { CartItem, CartEmpty, CartSummary } from "./components";
import { useCart } from "./hooks";
import Link from "next/link";

const CartPage: React.FC = () => {
    const {
        items,
        summary,
        updateQuantity,
        removeItem,
        saveForLater,
        applyCoupon,
        checkout,
    } = useCart(SAMPLE_CART_ITEMS, SAMPLE_CART_SUMMARY);

    return (
        <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-6 mb-8">
                        <Link
                            href="/"
                            className="p-3 rounded-2xl transition-all duration-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:shadow-lg"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </Link>

                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500 text-white shadow-xl">
                                <ShoppingBag className="w-8 h-8" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                                    Giỏ hàng của bạn
                                </h1>
                                <p className="text-xl text-slate-600 dark:text-slate-400 mt-2">
                                    {summary.itemCount} sản phẩm trong giỏ
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Content */}
                {items.length === 0 ? (
                    <CartEmpty />
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="space-y-8"
                            >
                                {items.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                    >
                                        <CartItem
                                            item={item}
                                            onUpdateQuantity={updateQuantity}
                                            onRemoveItem={removeItem}
                                            onSaveForLater={saveForLater}
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Cart Summary */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <CartSummary
                                    summary={summary}
                                    onCheckout={checkout}
                                    onApplyCoupon={applyCoupon}
                                />
                            </motion.div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
