import Badge from "./Badge";
import { ShoppingCart } from "lucide-react";

const CartBadge = () => {
  return (
    <Badge count={2}>
      <ShoppingCart className="h-5 w-5" />
    </Badge>
  );
};

export default CartBadge;
