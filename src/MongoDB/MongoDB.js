import { MongoClient } from "mongodb";

export default function MongoDB() {
  const uri =
    "mongodb+srv://mohamedyas8295:HDSw6SFCkuAZBXc5@cluster0.okidwhv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return client;
}
