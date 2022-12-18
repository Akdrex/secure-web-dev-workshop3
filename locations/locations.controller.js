// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer
const router = require('express').Router()
const locationsService = require('./locations.service')
const passport = require('passport')
const authorizationMiddleware = require('../authorization/authorization.middleware')
//const {deleteById} = require("./locations/locations.service");

router.use('/locations', passport.authenticate('jwt', { session: false }))

router.get('/locations',
    authorizationMiddleware.canAccess(['admin, user']),
    async (req, res) => {
        return res.status(200).send({locations: await locationsService.getAll()});
    }
)

//router.get('/locations', locationsService.getAll);

router.get('/locations/film/:filmname',authorizationMiddleware.canAccess(['admin', 'user']), locationsService.getByFilmName);

router.get('/locations/:id', authorizationMiddleware.canAccess(['admin', 'user']), locationsService.getById);

router.put('/locations/:id', authorizationMiddleware.canAccess(['admin']),locationsService.update);

router.post('/locations', authorizationMiddleware.canAccess(['admin']),locationsService.create)

router.delete('/locations/:id', authorizationMiddleware.canAccess(['admin']),locationsService.deleteById)

module.exports = router