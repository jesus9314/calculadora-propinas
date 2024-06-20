import { Dispatch } from "react";
import { formatCurrency } from "../helpers";
import { OrderItemType } from "../types";
import { OrderActions } from "../reducers/orderReducer";

type orderContentsProps = {
  Order: OrderItemType[];
  dispatch: Dispatch<OrderActions>;
};
export default function OrderContents({ Order, dispatch }: orderContentsProps) {
  return (
    <div>
      <h2 className="font-black text-4xl">Consumo</h2>
      <div className="space-y-3 mt-10">
        {Order.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-t border-gray-200 py-5 last-of-type:border-b"
          >
            <div>
              <p className="text-lg">{item.name}</p> -{" "}
              {formatCurrency(item.price)}
              <p className="font-black">
                Cantidad: {item.quantity} -{" "}
                {formatCurrency(item.quantity * item.price)}
              </p>
            </div>
            <button
              onClick={() =>
                dispatch({ type: "remove-item", payload: { id: item.id } })
              }
              className="bg-red-600 h-8 w-8 rounded-full text-white font-black"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
