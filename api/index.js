const express = require('express')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const uri = process.env.MONGODB_URI

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();        
    } catch (error) {
        console.log(error)
    }
}
run()

app.get('/api', async (req, res) => {
    const myDb = client.db('user')
    const myColl = myDb.collection('data')
    const data =  await myColl.findOne({})
    console.log(data)
    res.statusCode=200
    res.setHeader('Content-Type','application/json');
    res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
    res.send(data)
})

app.listen(3000,()=>{
    console.log('listening to port 3000')
})

module.exports = app