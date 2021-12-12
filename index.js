const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 4000;

// middleware
app.use(cors);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ffuko.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("creative-agency");
    const contactCollection = database.collection("user-contact");
    console.log(contactCollection);
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Creative agency server is running...");
});

app.listen(port, () => {
  console.log("listening to port", port);
});
