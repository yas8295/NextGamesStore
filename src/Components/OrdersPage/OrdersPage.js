import React from "react";
import HeaderTitle from "../GamesSideHeaderSection/HeaderTitle";
import { useGetOrders } from "@/hooks/MongoDB/order/useGetOrders";
import OrdersPageItems from "./OrderPageItems/OrdersPageItems";
import { LoadingOutlined } from "@ant-design/icons";
import EmptyOrders from "./EmptyOrders";

export default function OrdersPage() {
  const { data: orders, isLoading, isError } = useGetOrders();

  return (
    <>
      <HeaderTitle titleOfCategory={"orders"} />
      {orders?.orders?.orders?.length !== 0 && (
        <div className="grid grid-rows-auto rounded-xl shadow-2xl backdrop-blur-2xl border-[1px] border-[#4ea4cd] bg-[#81aeb662] text-white w-full mt-4">
          <div className="grid grid-cols-6 gap-2 sm:px-4 px-3 py-4 rounded-t-xl bg-[#123558] md:text-[15px] text-[11px] font-semibold">
            <h1 className="col-span-2">ITEMS</h1>
            <h1 className="text-right">QUANTITY</h1>
            <h1 className="text-right">DATE</h1>
            <h1 className="text-right">TOTAL</h1>
          </div>
          {isLoading ? (
            <div className="w-full h-full flex justify-center items-center">
              <LoadingOutlined className="text-[40px] text-[#3aadeb] my-7" />
            </div>
          ) : (
            orders?.orders?.orders?.map((order) => (
              <OrdersPageItems
                key={order.reference}
                items={order.items}
                quantity={order.items.length}
                total={order.total}
                date={order.date}
                reference={order.reference}
                border={
                  orders?.orders?.orders?.length - 1 !==
                  orders?.orders?.orders?.indexOf(order)
                }
              />
            ))
          )}
        </div>
      )}
      {orders && orders?.orders?.orders?.length === 0 && !isLoading && (
        <EmptyOrders />
      )}
    </>
  );
}
