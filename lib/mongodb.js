const { MongoClient } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rd9timp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const options = {};

let client;
let clientPromise;

if (!uri) {
  throw new Error("Please define mongodb uri");
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
