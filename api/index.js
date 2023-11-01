const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const PORT = 3000;

// Connection URI and Database Name
const uri = 'mongodb+srv://bnbdevs:feLC7m4jiT9zrmHh@cluster0.fjnp4qu.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'MFC';

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
// Endpoint to fetch data from the MongoDB collection
app.get('/api', async (req, res) => {
    try {

        // Connect to the MongoDB server
        await client.connect();

        // Access the specific database
        const db = client.db(dbName);

        // Access the specific collection
        const collection = db.collection('Camps');

        // Fetch data from the collection
        const items = await collection.find({}).toArray();

        // Return the fetched data as JSON
        res.json(items);

        // Close the connection
       
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});