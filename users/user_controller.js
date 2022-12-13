const router = require('express').Router()
const userService = require('./user_service')
const authorizationMiddleware = require('../authorization/authorization.middleware')
const passport = require('passport')

router.post('/register', async (req,res) => {
    console.log("yo le gang : " + req.username)
    const user = await userService.register(req.body?.username, req.body?.password)
    res.status(200).send(user)
})

router.post('/login',
    passport.authenticate('local'),
    authorizationMiddleware.canAccess([]),
    async (req, res) => {
        res.status(200).send(req.user)
    })

// router.post('/login', 
// passport.authenticate('local'),
// async (req, res) => {
//     res.status(200).send(req.user)
// })

module.exports = router