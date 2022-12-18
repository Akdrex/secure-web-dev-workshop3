const express = require('express')
const locationsController = require('./locations/locations.controller')
const usersController = require('./users/user_controller')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
require('dotenv').config();
const port = 6969
const LocalStrategy = require('./auth/local.strategy')
const JwtStrategy = require('./auth/jwt.strategy')

app.use(session({
    secret: 'YOUR_SECRET_HERE',
    resave: false,
    saveUninitialized: false,
}))

app.use(bodyParser.json())
app.use(locationsController)
app.use('/users', usersController)
app.get('/', (req, res) => res.status(200).send({message: 'Hello World'}))

async function main(){
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to Mongo Database');
    app.listen(port, () => {
        console.log(`API listening on port ${port}, visit http://localhost:${port}/`)
    })
}

main();
