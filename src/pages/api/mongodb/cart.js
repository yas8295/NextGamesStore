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

  const cart = client.db("users");
  const games = cart.collection("users");

  return games;
};

export default async function handler(req, res) {
  const session = await getServerSession(req, res);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method === "POST") {
    const { game } = JSON.parse(req.body);

    const games = await connectClient();
    try {
      await games.updateOne(
        { email: session.user.email },
        { $push: { cart: { gameId: game.id, price: game.price, quantity: 1 } } }
      );
    } catch (error) {
      console.log(error);
      return res.status(500);
    } finally {
      await client.close();
    }

    return res
      .status(201)
      .json({ message: "Added to cart successfully", game });
  }

  if (req.method === "PUT") {
    const { game, operation } = JSON.parse(req.body);

    const games = await connectClient();
    try {
      await games.updateOne(
        { email: session.user.email, "cart.gameId": game.id },
        { $inc: { "cart.$.quantity": operation === "INC" ? 1 : -1 } }
      );

      return res
        .status(201)
        .json({ message: "Updated cart successfully", game });
    } catch (error) {
      console.log(error);
      return res.status(500);
    } finally {
      await client.close();
    }
  }

  if (req.method === "DELETE") {
    const { game, operation } = JSON.parse(req.body);

    const games = await connectClient();

    if (operation === "ALL") {
      try {
        await games.updateOne(
          { email: session.user.email },
          { $set: { cart: [] } }
        );
      } catch (error) {
        console.log(error);
        return res.status(500);
      } finally {
        await client.close();
      }

      return res.status(201).json({ message: "Cleared cart successfully" });
    }

    try {
      await games.updateOne(
        { email: session.user.email },
        { $pull: { cart: { gameId: game.id } } }
      );
    } catch (error) {
      console.log(error);
      return res.status(500);
    } finally {
      await client.close();
    }

    return res
      .status(201)
      .json({ message: "Removed from cart successfully", game });
  }

  if (req.method === "GET") {
    const games = await connectClient();

    try {
      const projection = { cart: 1, _id: 0 };
      const cart = await games.findOne(
        { email: session.user.email },
        { projection }
      );

      return res.status(200).json({ cart });
    } catch (error) {
      console.log(error);
      return res.status(500);
    } finally {
      await client.close();
    }
  }
}
