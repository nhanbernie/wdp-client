"use client";

import React from "react";
import MainLayout from "../../../components/layouts/MainLayout";
import { CartPage } from "../../../features/cart";

const CartRoute: React.FC = () => {
    return (
        <MainLayout>
            <CartPage />
        </MainLayout>
    );
};

export default CartRoute;
