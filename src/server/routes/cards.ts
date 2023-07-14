//src/server/routes>cards.ts
const expressInstance = require('express');
const mongodb = require('mongodb');

const router = expressInstance.Router();

// Connection URL
const url = process.env.MONGO_URI;
// Database Name
const dbName = 'card_database';

router.get('/getCards', async (req: any, res: { json: ( arg0: any ) => void; }) => {
  const client = new mongodb.MongoClient(url);
  await client.connect();
  const db = client.db();
  const cards = await db.collection('cards').find({}).toArray();
  res.json(cards);
  client.close();
});

module.exports = router;