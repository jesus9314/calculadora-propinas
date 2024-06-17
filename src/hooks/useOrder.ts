import { useState } from "react";
import type { MenuItemType, OrderItemType } from "../types";

export default function useOrder() {
  const [Order, setOrder] = useState<OrderItemType[]>([]);
  const [tip, setTip] = useState(0);

  const addItem = (item: MenuItemType) => {
    const itemExist = Order.find((orderItem) => orderItem.id === item.id);
    if (itemExist) {
      const updatedOrder = Order.map((orderItem) =>
        orderItem.id === item.id
          ? {
              ...orderItem,
              quantity: orderItem.quantity + 1,
            }
          : orderItem
      );
      setOrder(updatedOrder);
    } else {
      const newItem: OrderItemType = {
        ...item,
        quantity: 1,
      };
      setOrder([...Order, newItem]);
    }
  };

  const removeItem = (id: MenuItemType["id"]) => {
    setOrder(Order.filter((item) => item.id !== id));
  };

  const placeOrder = () => {
    setOrder([]);
    setTip(0);
  };

  return {
    addItem,
    removeItem,
    Order,
    tip,
    setTip,
    placeOrder,
  };
}
