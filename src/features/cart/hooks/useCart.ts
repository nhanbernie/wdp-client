"use client";

import { useState, useCallback } from "react";
import {
  CartItem as CartItemType,
  CartSummary as CartSummaryType,
} from "../types/cart.types";

export const useCart = (
  initialItems: CartItemType[],
  initialSummary: CartSummaryType
) => {
  const [items, setItems] = useState<CartItemType[]>(initialItems);
  const [summary, setSummary] = useState<CartSummaryType>(initialSummary);

  const calculateSummary = useCallback(
    (items: CartItemType[]) => {
      const newSubtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const newTotal =
        newSubtotal + summary.shipping + summary.tax - summary.discount;
      const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

      return { newSubtotal, newTotal, itemCount };
    },
    [summary.shipping, summary.tax, summary.discount]
  );

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      const updatedItems = items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );

      setItems(updatedItems);

      const { newSubtotal, newTotal, itemCount } =
        calculateSummary(updatedItems);

      setSummary((prev) => ({
        ...prev,
        subtotal: newSubtotal,
        total: newTotal,
        itemCount,
      }));
    },
    [items, calculateSummary]
  );

  const removeItem = useCallback(
    (id: string) => {
      const updatedItems = items.filter((item) => item.id !== id);
      setItems(updatedItems);

      if (updatedItems.length === 0) {
        setSummary({
          subtotal: 0,
          shipping: 0,
          tax: 0,
          discount: 0,
          total: 0,
          itemCount: 0,
        });
      } else {
        const { newSubtotal, newTotal, itemCount } =
          calculateSummary(updatedItems);

        setSummary((prev) => ({
          ...prev,
          subtotal: newSubtotal,
          total: newTotal,
          itemCount,
        }));
      }
    },
    [items, calculateSummary]
  );

  const saveForLater = useCallback((id: string) => {
    console.log("Save for later:", id);
  }, []);

  const applyCoupon = useCallback((coupon: string) => {
    console.log("Apply coupon:", coupon);
  }, []);

  const checkout = useCallback(() => {
    console.log("Proceed to checkout");
  }, []);

  return {
    items,
    summary,
    updateQuantity,
    removeItem,
    saveForLater,
    applyCoupon,
    checkout,
  };
};
