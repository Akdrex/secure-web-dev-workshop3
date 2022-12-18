const router = require('express').Router()
const usersService = require('./user_service')
const passport = require('passport')
require('dotenv').config();
let jwt = require("jsonwebtoken")
const authorizationMiddleware = require('../authorization/authorization.middleware')


router.post('/register', async (req, res) => {
    const user = await usersService.register(req.body?.username, req.body?.password, req.body?.role)
    res.status(200).send(user)
});


router.post('/login',
    passport.authenticate('local'),
    //authorizationMiddleware.canAccess(['admin']),
    async (req, res) => {
        const payload = {
            sub: req.user._id,
        }
        let token = jwt.sign(payload, process.env.TOKEN_KEY);
        res.status(200).json({token});
    });

router.get('/me',  passport.authenticate('jwt', { session: false }), usersService.getSelfUsername);

router.patch('/me',  passport.authenticate('jwt', { session: false }), usersService.updateSelfUsername);

router.delete('/me', passport.authenticate('jwt', { session: false }),
    //authorizationMiddleware.canAccess([]),
    usersService.deleteUser);

router.get('/',
    //authorizationMiddleware.canAccess(['admin']),
    usersService.getAllUsers);
/*
router.post('/login', async (req, res) => res.status(200).send(await usersService.checkPassword(req.body?.username, req.body?.password)))
router.post('/users/login', locationsService.getByFilmName);
router.get('/users/me', locationsService.getById);
router.put('/users/me', locationsService.update);
router.delete('/users/me', locationsService.create)
router.get('/users', locationsService.deleteById)
*/

module.exports = router