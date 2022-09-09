//config inicial
const express = require('express')
const app = express()

const mongoose = require('mongoose')
const Person = require('./models/Person')

app.use(
    express.urlencoded({
        extended:true
    })
)

app.use(express.json())

//rotas
app.post('/person', async(req, res) => {
    const {name, age} = req.body
    const person = {
        name,
        age
    }

    try {
        await Person.create(person)
        res.status(201).json({message: 'Added person'})
    } catch (error) {
        res.status(500).json({error:error})
        
    }
})

mongoose.connect('mongodb+srv://novouser:fundatec01@cluster0.wlfwjli.mongodb.net/?retryWrites=true&w=majority')
.then(()=> {
    console.log('Conectou')
    app.listen(3000)
})
.catch((err)=>console.log(err))
