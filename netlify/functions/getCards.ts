// netlify/functions/getCards.ts
const { MongoClient } = require('mongodb');

exports.handler = async (event: any, context: any) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const uri = process.env.MONGO_URI; // Ensure this is your MongoDB Atlas URI
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection('cards');
    const cards = await collection.find().toArray();

    return {
      statusCode: 200,
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
};
