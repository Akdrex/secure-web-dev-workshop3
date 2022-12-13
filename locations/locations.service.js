// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')

async function getAll (req, res){
	let result = await Location.find();
	res.send(result);
}

async function getById(req, res){
	//res.send('Hello World!eee')
	//console.log(Location.find({ recordid: req.params.id }))
    let result = await Location.findOne({ _id: req.params.id });
    res.send(result);
}

async function deleteById(req, res){
    await model.deleteOne({ _id: params.id });
    res.send("l'id " + params.id + " a été supprimé");
}

async function create(req, res){
    var obj = req.body
    Location.create(obj);
    res.send("Objet ajouté");
}

async function update(req, res){
    var obj = req.body
    Location.findOneAndUpdate(params.id, obj);
}

module.exports = {getAll, getById, deleteById, create, update}