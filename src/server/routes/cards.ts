const expressInstance = require('express');
const mongodb = require('mongodb');

const router = expressInstance.Router();

// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'your_database_name';

router.get('/getCards', async (req: any, res: { json: ( arg0: any ) => void; }) => {
  const client = new mongodb.MongoClient(url);
  await client.connect();
  const db = client.db(dbName);
  const cards = await db.collection('your_collection_name').find({}).toArray();
  res.json(cards);
  client.close();
});

module.exports = router;
