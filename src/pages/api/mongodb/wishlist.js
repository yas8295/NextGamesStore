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

  const wishlist = client.db("users");
  const games = wishlist.collection("users");

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
      const res = await games.updateOne(
        { email: session.user.email },
        { $push: { wishlist: { gameId: game.id } } }
      );
    } catch (error) {
      console.log(error);
      return res.status(500);
    } finally {
      await client.close();
    }

    return res
      .status(201)
      .json({ message: "Added to wishlist successfully", game });
  }

  if (req.method === "DELETE") {
    const { game } = JSON.parse(req.body);

    const games = await connectClient();
    try {
      await games.updateOne(
        { email: session.user.email },
        { $pull: { wishlist: { gameId: game.id } } }
      );
    } catch (error) {
      console.log(error);
      return res.status(500);
    } finally {
      await client.close();
    }

    return res
      .status(201)
      .json({ message: "Removed from wishlist successfully", game });
  }

  if (req.method === "GET") {
    const games = await connectClient();

    try {
      const projection = { wishlist: 1, _id: 0 };
      const wishList = await games.findOne(
        { email: session.user.email },
        { projection }
      );

      return res.status(200).json({ wishList });
    } catch (error) {
      console.log(error);
      return res.status(500);
    } finally {
      await client.close();
    }
  }
}
