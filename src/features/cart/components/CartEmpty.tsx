"use client";

import React from "react";
import { motion } from "motion/react";
import { ShoppingBag, ArrowLeft, Package, Sparkles } from "lucide-react";
import Link from "next/link";

interface CartEmptyProps {
    onContinueShopping?: () => void;
}

const CartEmpty: React.FC<CartEmptyProps> = ({ onContinueShopping }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4"
        >
            {/* Empty Cart Illustration */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative mb-12"
            >
                {/* Main Shopping Bag */}
                <div className="relative w-48 h-48 rounded-3xl flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 dark:from-purple-900/30 dark:via-blue-900/30 dark:to-indigo-900/30 border-2 border-dashed border-purple-300 dark:border-purple-600 shadow-2xl">
                    <ShoppingBag className="w-20 h-20 text-purple-600 dark:text-purple-400" />

                    {/* Floating Elements */}
                    <motion.div
                        animate={{
                            y: [0, -15, 0],
                            rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute -top-4 -right-4"
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                            <Package className="w-4 h-4 text-white" />
                        </div>
                    </motion.div>

                    <motion.div
                        animate={{
                            y: [0, -12, 0],
                            rotate: [0, -8, 8, 0],
                        }}
                        transition={{
                            duration: 3.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5,
                        }}
                        className="absolute -bottom-4 -left-4"
                    >
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center shadow-lg">
                            <Sparkles className="w-3 h-3 text-white" />
                        </div>
                    </motion.div>

                    <motion.div
                        animate={{
                            y: [0, -8, 0],
                            rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                            duration: 2.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1,
                        }}
                        className="absolute top-8 -left-8"
                    >
                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-500 to-teal-500 shadow-lg" />
                    </motion.div>
                </div>

                {/* Decorative Background */}
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-200/50 via-blue-200/50 to-transparent dark:from-purple-800/30 dark:via-blue-800/30"
                />
            </motion.div>

            {/* Empty State Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="max-w-lg mx-auto"
            >
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                    Giỏ hàng trống
                </h2>

                <p className="text-xl mb-10 leading-relaxed text-slate-600 dark:text-slate-400">
                    Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá các sản phẩm vật liệu xây dựng chất lượng cao của chúng tôi!
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {onContinueShopping ? (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onContinueShopping}
                            className="inline-flex items-center justify-center px-10 py-4 font-semibold rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700"
                        >
                            <ShoppingBag className="mr-3 w-6 h-6" />
                            Tiếp tục mua sắm
                        </motion.button>
                    ) : (
                        <Link href="/">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center justify-center px-10 py-4 font-semibold rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700"
                            >
                                <ShoppingBag className="mr-3 w-6 h-6" />
                                Tiếp tục mua sắm
                            </motion.div>
                        </Link>
                    )}

                    <Link href="/">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center justify-center px-10 py-4 font-semibold rounded-2xl transition-all duration-300 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-purple-300 dark:hover:border-purple-600"
                        >
                            <ArrowLeft className="mr-3 w-6 h-6" />
                            Về trang chủ
                        </motion.div>
                    </Link>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default CartEmpty;
