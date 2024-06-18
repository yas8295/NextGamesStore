import MongoDB from "@/MongoDB/MongoDB";
import { getServerSession } from "next-auth";

const client = MongoDB();

const connectClient = async () => {
  try {
    await client.connect();
  } catch (error) {
    console.log(error);
    return res.status(500);
  }

  const database = client.db("users");
  const ordersField = database.collection("users");

  return ordersField;
};

export default async function handler(req, res) {
  const session = await getServerSession(req, res);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method === "POST") {
    const { order } = JSON.parse(req.body);

    const ordersField = await connectClient();
    try {
      await ordersField.updateOne(
        { email: session.user.email },
        {
          $push: { orders: order },
          $set: { cart: [] },
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(500);
    } finally {
      await client.close();
    }

    return res.status(201).json({ message: "Checkout Completed" });
  }

  if (req.method === "PUT") {
    const { order } = JSON.parse(req.body);

    const ordersField = await connectClient();
    try {
      await ordersField.updateOne(
        { email: session.user.email, "orders.reference": order.reference },
        {
          $set: { "orders.$.status": "delivered" },
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(500);
    } finally {
      await client.close();
    }

    return res.status(201).json({ message: "Order delivered successfully" });
  }

  if (req.method === "DELETE") {
    const { order } = JSON.parse(req.body);

    const ordersField = await connectClient();
    try {
      await ordersField.updateOne(
        { email: session.user.email },
        {
          $pull: { orders: { reference: order.reference } },
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(500);
    } finally {
      await client.close();
    }

    return res.status(201).json({ message: "Order canceled successfully" });
  }

  if (req.method === "GET") {
    const ordersField = await connectClient();

    try {
      const projection = { orders: 1, _id: 0 };
      const orders = await ordersField.findOne(
        { email: session.user.email },
        { projection }
      );

      return res.status(200).json({ orders });
    } catch (error) {
      console.log(error);
      return res.status(500);
    } finally {
      await client.close();
    }
  }
}
