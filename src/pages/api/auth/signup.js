import MongoDB from "@/MongoDB/MongoDB";

const client = MongoDB();

const connectClient = async () => {
  try {
    await client.connect();
  } catch (error) {
    console.log(error);
    return res.status(500);
  }

  const database = client.db("users");
  const users = database.collection("users");

  return users;
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (!req.body) {
    return res.status(400).json({ message: "No data provided" });
  }

  const { userName, email, password } = JSON.parse(req.body);

  if (!userName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters or numbers" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  const users = await connectClient();

  const allUsers = await users.find({}).toArray();
  const userExist = allUsers.find((user) => user.email === email);
  if (userExist) {
    return res.status(400).json({ message: "Email provided already exist" });
  }

  try {
    await users.insertOne({
      username: userName,
      email,
      password,
      wishlist: [],
      cart: [],
      orders: [],
    });
  } catch (error) {
    console.log(error);
    return res.status(500);
  } finally {
    await client.close();
  }

  return res.status(201).json({
    message: "Account created successfully",
    account: { email, password },
  });
}
