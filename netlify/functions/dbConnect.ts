// // ./netlify/functions/dbConnect.ts
// const { MongoClient, ServerApiVersion } = require('mongodb');
//
// // Use the environment variable to store your MongoDB URI
// const uri = process.env.MONGO_URI;
//
// const client = new MongoClient(uri, {
//   serverApi: ServerApiVersion.v1,
// });
//
// exports.handler = async (event: any, context: any) => {
//   context.callbackWaitsForEmptyEventLoop = false;
//   try {
//     // Connect the client to the server
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     const pingResult = await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!", pingResult);
//
//     // Example: Return a simple message or proceed with database operations
//     return {
//       statusCode: 200,
//       body: JSON.stringify({ message: "Successfully connected to MongoDB!" }),
//     };
//   } catch (error) {
//     console.error("Failed to connect to MongoDB", error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: "Failed to connect to MongoDB" }),
//     };
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// };
