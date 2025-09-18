"use client";

import { motion } from "motion/react";
import Link from "next/link";
const Navigation = ({ items }: { items: any[] }) => {
  return (
    <>
      {items.map((item, index) => (
        <motion.div
          key={item.href}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <Link
            href={item.href}
            className={`relative text-sm font-medium transition-colors hover:text-emerald-600 ${
              item.active ? "text-emerald-600" : "text-gray-700"
            }`}
          >
            {item.label}
            {item.active && (
              <motion.div
                layoutId="activeTab"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-500 rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
        </motion.div>
      ))}
    </>
  );
};

export default Navigation;
