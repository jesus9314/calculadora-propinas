import { Dispatch, useMemo } from "react";
import { OrderItemType } from "../types";
import { formatCurrency } from "../helpers";
import { OrderActions } from "../reducers/orderReducer";

type OrderTotalProps = {
  Order: OrderItemType[];
  tip: number;
  dispatch: Dispatch<OrderActions>;
};
export default function OrderTotals({ Order, tip, dispatch }: OrderTotalProps) {
  const subtotalAmount = useMemo(
    () => Order.reduce((total, item) => total + item.quantity * item.price, 0),
    [Order]
  );
  const tipAmount = useMemo(() => subtotalAmount * tip, [tip, Order]);
  console.log(tipAmount);
  const totalAmount = useMemo(() => subtotalAmount + tipAmount, [tip, Order]);
  return (
    <>
      <div className="space-y-3">
        <h2 className="font-black text-2xl"> Totales y Propina</h2>
        <p>
          Subtotal a pagar: {""}
          <span className="font-bold">{formatCurrency(subtotalAmount)}</span>
        </p>
        <p>
          Propina: {""}
          <span className="font-bold">{formatCurrency(tipAmount)}</span>
        </p>
        <p>
          Total a pagar: {""}
          <span className="font-bold">{formatCurrency(totalAmount)}</span>
        </p>
      </div>
      <button
        disabled={totalAmount === 0}
        className="w-full bg-black p-3 uppercase text-white font-bold mt-10 disabled:opacity-10"
        onClick={() => dispatch({ type: "place-order" })}
      >
        Guardar Orden
      </button>
    </>
  );
}
