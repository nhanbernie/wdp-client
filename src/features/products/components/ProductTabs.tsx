"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Zap, Scale, Battery, Shield } from "lucide-react";
import React from "react";

interface ProductTabsProps {
  description?: string;
  specs?: Record<string, any>;
  colors: any;
}

export const ProductTabs: React.FC<ProductTabsProps> = ({
  description,
  specs,
  colors,
}) => {
  const renderSpecs = () => {
    if (!specs || Object.keys(specs).length === 0) {
      return <p className="text-gray-500">Không có thông số kỹ thuật</p>;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(specs).map(([key, value]) => {
          let displayValue = "";

          if (typeof value === "object" && value !== null) {
            displayValue =
              value.value && value.unit
                ? `${value.value} ${value.unit}`
                : JSON.stringify(value);
          } else {
            displayValue = String(value);
          }

          const getIcon = () => {
            switch (key.toLowerCase()) {
              case "power":
              case "coating":
              case "size":
              case "voc":
                return <Zap className="h-4 w-4 text-yellow-500" />;
              case "weight":
              case "headtype":
              case "expiry":
              case "finish":
                return <Scale className="h-4 w-4 text-red-500" />;
              case "voltage":
              case "threadpitch":
              case "drytime":
              case "standard":
                return <Battery className="h-4 w-4 text-green-500" />;
              case "warranty":
              case "strengthclass":
              case "protectionlevel":
              case "coverage":
                return <Shield className="h-4 w-4 text-blue-500" />;
              default:
                return <Zap className="h-4 w-4 text-gray-400" />;
            }
          };

          return (
            <div
              key={key}
              className="flex items-center justify-between border-b pb-2 hover:bg-muted/40 transition-colors rounded-md px-2"
              style={{ borderColor: colors.border }}
            >
              <div className="flex items-center gap-2">
                {getIcon()}
                <span className="capitalize font-medium text-gray-800 dark:text-gray-200">
                  {key.replace(/_/g, " ")}
                </span>
              </div>
              <span className="text-gray-600 dark:text-gray-300 font-medium">
                {displayValue}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Tabs defaultValue="description" className="mb-12">
      <TabsList
        className="grid w-full grid-cols-3 border rounded-lg overflow-hidden"
        style={{
          backgroundColor: colors.cardBackgroundSecondary,
          borderColor: colors.border,
        }}
      >
        {["description", "specifications", "reviews"].map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className="
    py-2 text-sm font-medium transition-all
    hover:bg-muted/60 hover:text-foreground
    focus:bg-muted/70 focus:text-foreground
    data-[state=active]:bg-primary/15 data-[state=active]:text-primary
  "
          >
            {tab === "description"
              ? "Mô tả"
              : tab === "specifications"
              ? "Thông số"
              : "Đánh giá"}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Tab mô tả */}
      <TabsContent value="description" className="mt-6">
        <Card
          style={{
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
          }}
        >
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold mb-4 text-primary">
              Mô tả sản phẩm
            </h3>
            <div
              className="prose prose-sm sm:prose-base max-w-none text-gray-800 dark:text-gray-200 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: description || "" }}
            />
          </CardContent>
        </Card>
      </TabsContent>

      {/* Tab thông số kỹ thuật */}
      <TabsContent value="specifications" className="mt-6">
        <Card
          style={{
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
          }}
        >
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold mb-4 text-primary">
              Thông số kỹ thuật
            </h3>
            {renderSpecs()}
          </CardContent>
        </Card>
      </TabsContent>

      {/* Tab đánh giá */}
      <TabsContent value="reviews" className="mt-6">
        <Card
          style={{
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
          }}
        >
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold mb-4 text-primary">
              Đánh giá khách hàng
            </h3>
            <div className="py-8 text-gray-500 dark:text-gray-400">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-60" />
              <p className="text-base">
                Tính năng đánh giá sẽ được cập nhật sớm
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
