require('dotenv').config() //! call & configure the dotenv package

const express = require('express');
const mongoose = require('mongoose');
//Data
const fruits = require('./models/fruits');
const Fruit = require('./models/Fruit')

const app = express();

//* =========== Configuration ===========
app.set('view engine', 'jsx')
app.engine('jsx', require('jsx-view-engine').createEngine())

//* =============== MIDDLEWARE =================
// Setting a middleware to run in the app
app.use((req, res, next) => {
    console.log(req.body);
    console.log('I run for all the routes')
    next();
    //? next() - ensures that the request continues to be processed and that you get a response
})

app.use(express.urlencoded({extended: false}))

// Index Route (return a list of fruits)
app.get('/fruits/', (req, res) => {
    // console.log(req.params);
    // res.render('fruits/Index', {fruits: fruits})
    Fruit.find({}, (error, allFruits) => {
        res.render('fruits/Index', {fruits: allFruits})
    })

})

// New Route (must go above 'show' route, return a form to add a new fruit)
app.get('/fruits/new', (req, res) => {
   
    res.render('fruits/New')
})

// POST Method
app.post('/fruits', (req, res) => {
    if (req.body.readyToEat === 'on') {  //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true // data correction
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false // data correction
    }
    console.log(req.body);
     //! 'fruits' is the fruits array (data)
    // fruits.push(req.body)
    Fruit.create(req.body, (error, createdFruit) => {
// res.send(createdFruit)
      res.redirect('/fruits')  
    })
   
})

//? ':' means anything put in by the user is dynamic, so no forced path (/fruits/new) would be recognized because 'fruits/:indexOfFruitArray' came first
//? top-2-bottom reading - any path with ':' should come last

//Show Route (returns a single fruit)

app.get('/fruits/:id', (req, res) => {
    console.log(req.params.id);
    
    // res.render('fruits/Show', {fruits: fruits[req.params.indexOfFruitArray] } )
    Fruit.findById(req.params.id, (error, fruitFound) => {
        res.render('fruits/Show', {fruit: fruitFound})
    })
})

//? ^^^ The user makes a request to the server and asks for it to be rendered by the corresponding 'views' file.
//? So when a user makes a request(req), the server sends the response(res), with the name of the file as the first parameter(ie. 'show' or 'index') & the data as an object

//! ' * ' = any other routes
//! 'if none of the routes match, display the 404 page/redirect back to homepage

app.get('*', (req, res) => {
    //* send them to 404 page
    res.send('404')
    //* redirect back to home page
    // res.redirect('/fruits')
})

//Listen for requests
app.listen(3000, () => {
    console.log(`Listening...`);
    // gets the warning message out
    mongoose.set('strictQuery', true)
    // connect to mongodDB
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    mongoose.connection.once('open', () => {
        console.log('Connected to MongoDB!')
    })
})