const mongoose = require('mongoose')

//? create MongooseSchema (Blueprint)
const fruitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    color: { type: String, required: true },
    readyToEat: Boolean
});

//? create Mongoose Model
const Fruit = mongoose.model('Fruit', fruitSchema)

module.exports = Fruit