const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
    name:String,
    age:Number
})

module.exports = Person