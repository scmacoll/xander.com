// netlify/functions/getCards.ts

import cards from "@/server/routes/cards";

const { MongoClient } = require('mongodb');

exports.handler = async (event: any, context: any) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const uri = process.env.MONGO_URI; // Ensure this is your MongoDB Atlas URI
  console.log("MongoDB URI: ", process.env.MONGO_URI);
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    console.log("Connecting to MongoDB Atlas with URI: ", uri);
    await client.connect();
    console.log("Connected to MongoDB Atlas");
    const db = client.db("myTargetDatabase"); // Replace "yourDatabaseName" with the actual name of your database
    const collection = db.collection('cards');
    const cards = await collection.find().toArray();
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Adjust in production
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cards),
    };
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch cards" }),
    };
  } finally {
    await client.close();
  }
  console.log(`Fetched ${cards.length} cards from the database`);
};
