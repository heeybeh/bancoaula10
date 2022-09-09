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

app.get('/person', async (req, res) => {
    try {
        const people = await Person.find()
        res.status(200).json(people)
    } catch (error) {
        res.status(500).json({erro:error})
    }
  
})

app.get('/person/:id', async(req, res) =>
{
    const id = req.params.id

    try {
        const person = await Person.findOne({_id:id})
        if(!person) {
            res.status(422).json({message:'User not found, sry'})
            return
        }
        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({erro:error})
    }
})
app.patch('/person/:id', async(req, res) =>{
    const id = req.params.id
    const {name, age} = req.body

    const person = {
        name, age
    }

    try {
        const updatedPerson = await Person.updateOne({_id:id}, person)
            if(updatedPerson.matchedCount === 0) {
                res.status(422).json({message:'User not founds'})
                return
            }
            res.status(200).json(person)
    }catch(error) {
        res.status(500).json({erro:error})
    }
})

app.delete('/person/:id', async(req,res) => {

    const id = req.params.id
    const person = await Person.findOne({_id:id})

    if(!person) {
        res.status(422).json({message:'User not found'})
        return
    }

    try {
        await Person.deleteOne({_id:id})
        res.status(204).json({message:'Deleted User'})
    } catch (error) {
        res.status(500).json({erro:error})
    }
})

mongoose.connect('mongodb+srv://novouser:fundatec01@cluster0.wlfwjli.mongodb.net/?retryWrites=true&w=majority')
.then(()=> {
    console.log('Conectou')
    app.listen(3000)
})
.catch((err)=>console.log(err))
