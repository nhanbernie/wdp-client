"use client";

import React from "react";
import { motion } from "motion/react";
import { ShoppingCart, Sparkles } from "lucide-react";

interface CartIconProps {
    itemCount: number;
    onClick?: () => void;
    className?: string;
}

const CartIcon: React.FC<CartIconProps> = ({
    itemCount,
    onClick,
    className = ""
}) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`relative p-4 rounded-2xl transition-all duration-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600 hover:bg-gradient-to-br hover:from-white hover:to-purple-50 dark:hover:from-slate-800 dark:hover:to-purple-900/20 hover:shadow-xl ${className}`}
        >
            <div className="relative">
                <ShoppingCart className="w-7 h-7 text-slate-700 dark:text-slate-300" />

                {/* Sparkle Effect */}
                {itemCount > 0 && (
                    <motion.div
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute -top-1 -right-1"
                    >
                        <Sparkles className="w-3 h-3 text-purple-500" />
                    </motion.div>
                )}
            </div>

            {/* Badge */}
            {itemCount > 0 && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30
                    }}
                    className="absolute -top-2 -right-2 min-w-[24px] h-6 px-2 rounded-full flex items-center justify-center text-xs font-bold bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg border-2 border-white dark:border-slate-800"
                >
                    {itemCount > 99 ? "99+" : itemCount}
                </motion.div>
            )}
        </motion.button>
    );
};

export default CartIcon;
