const express = require('express')
const app = express()

app.get('/api',(req,res)=>{
    res.send({message:'hello',success:false})
})

module.exports = app