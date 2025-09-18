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
          className="relative"
          whileHover="hover"
        >
          <Link
            href={item.href}
            className={`relative text-sm font-medium transition-all duration-300 px-3 py-2 block ${
              item.active ? "text-white" : "text-white/60 hover:text-white"
            }`}
          >
            {item.label}
          </Link>

          {/* Hover underline - expands from center */}
          <motion.div
            className="absolute -bottom-1 left-1/2 h-0.5 bg-white rounded-full"
            initial={{ width: 0, x: "-50%" }}
            variants={{
              hover: {
                width: "calc(100% - 24px)", // Account for padding
                transition: { duration: 0.3, ease: "easeOut" },
              },
            }}
            animate={{
              width: item.active ? "calc(100% - 24px)" : 0,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
          />
        </motion.div>
      ))}
    </>
  );
};

export default Navigation;
