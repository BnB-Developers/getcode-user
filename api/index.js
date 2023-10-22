const express = require('express')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const uri = "mongodb+srv://vercel-admin-user:RpUpV6Tp4oZk6Mjr@cluster0.fjnp4qu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const bodyParser = require('body-parser')
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

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.get('/api', async (req, res) => {
    const myDb = client.db('user')
    const myColl = myDb.collection('data')
    const data =  await myColl.findOne({
        email:req.query.email
    })
    
    console.log(data)
    res.statusCode=200
    res.setHeader('Content-Type','application/json');
    res.setHeader('Access-Control-Allow-Origin','https://getcode-eight.vercel.app')
    if(data){
        res.send(data)
    }
    else{
        res.send({message:'user not found'})
    }
})

app.post('/api',async (req,res)=>{
    console.log(req.body)
    const myDb = client.db('user')
    const myColl = myDb.collection('data')
    const data =  await myColl.insertOne(req.body)
    res.send({message:'user added successfully',success:true})
})

app.listen(8000,()=>{
    console.log('listening to port 3000')
})

module.exports = app