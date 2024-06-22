import OrderView from "@/Components/OrdersPage/OrderView/OrderView";
import { useGetOrders } from "@/hooks/MongoDB/order/useGetOrders";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import MongoDB from "@/MongoDB/MongoDB";

export default function Order({ order }) {
  const { data: orders, isLoading } = useGetOrders();

  if (isLoading) {
    <div className="w-full h-full flex justify-center items-center">
      <LoadingOutlined className="text-[40px] text-[#3aadeb] my-7" />
    </div>;
  }

  const ordersCount = orders?.orders?.orders?.length;
  const deliveryDateMillis = order?.deliveryDate;
  const parsedDate = new Date(deliveryDateMillis);

  return <OrderView order={order} ordersCount={ordersCount} deliveryDate={parsedDate} />;
}

export async function getServerSideProps({ params }) {
  const client = MongoDB();

  try {
    await client.connect();
  } catch (error) {
    console.log(error);
  }

  const database = client.db("users");
  const ordersField = database.collection("users");

  let order = null;

  try {
    const projection = { orders: 1, _id: 0 };
    const orders = await ordersField.findOne(
      { email: params.order[0] },
      { projection }
    );

    order = orders?.orders?.find((o) => o.reference === params.order[1]);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }

  if (!order) {
    return {
      notFound: true,
    };
  }

  return {
    props: { order },
  };
}


