// ./src/server/routes/cards.ts
import { Router, Request, Response } from 'express';
import { MongoClient, Db } from 'mongodb';

const router: Router = Router();

// Define your routes and handlers
router.get('/getCards', async (req: Request, res: Response) => {
  try {
    const client = await MongoClient.connect(process.env.MONGO_URI as string);
    const db: Db = client.db(); // Access the MongoDB database

    const collection = db.collection('cards'); // Assuming 'cards' is the name of your collection

    const cards = await collection.find().toArray(); // Retrieve all cards from the collection

    client.close(); // Close the MongoDB connection

    res.json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;