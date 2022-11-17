// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const locationsService = require('./locations.service')
const {deleteById} = require("./locations.service");

router.get('/locations', locationsService.getAll);

router.get('/locations/:id', locationsService.getById);

router.put('/locations/:id', locationsService.update);

router.post('/locations', locationsService.create)

router.delete('/locations', locationsService.deleteById)


module.exports = router
