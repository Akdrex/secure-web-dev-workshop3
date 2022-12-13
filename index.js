const express = require('express')
const locationController = require('./locations/locations.controller')
const usersController = require('./users/user_controller')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const User = require('./users/user_model')
const localStrategy = require('./auth/local.strategy')
const session = require('express-session')


app.use(session({
    secret: 'YOUR_SECRET_HERE',
    resave: false,
    saveUninitialized: false,
}))


require('dotenv').config();
mongoose.connect(process.env.MONGO_URI).then(()=> {console.log('Connected !')});

app.use(bodyParser.json())
app.use(locationController)
app.use('/users', usersController)

app.listen(port, () => {
    console.log(`API listening on port ${port}, visit http://localhost:${port}/`)
})

app.get('/yolegangcaditquoi', (req, res) => {
    res.send('Hello World!')
})