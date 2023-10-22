const express = require('express')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const uri = "mongodb+srv://vercel-admin-user:RpUpV6Tp4oZk6Mjr@cluster0.fjnp4qu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

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

app.get('/api/', async (req, res) => {
    const myDb = client.db('user')
    const myColl = myDb.collection('data')
    const data =  await myColl.findOne({
        email:req.query.email
    })
    
    console.log(data)
    res.statusCode=200
    res.setHeader('Content-Type','application/json');
    res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
    if(data){
        res.send(data)
    }
    else{
        res.send({message:'user not found'})
    }
})

app.listen(8000,()=>{
    console.log('listening to port 3000')
})

module.exports = app