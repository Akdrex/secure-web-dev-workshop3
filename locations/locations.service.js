// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')

async function getAll (req, res){
    let result = await Location.find();
    return result;
}

async function getById(req, res){
    let result = await Location.find({ _id: req.params.id });
    res.send(result);
}

async function getByFilmName(req, res){
    let result = await Location.find({ filmName: req.params.filmname});
    res.send(result);
}

async function deleteById(req, res){
    const location = await Location.deleteOne({ _id: req.params.id });
    res.send(location);
}

async function create(req, res){
    let obj = req.body
    Location.create(obj);
    res.send("Objet ajouté");
}

async function update(req, res){
    let obj = req.body
    console.log(req.params.id)
    const location = await Location.findOneAndUpdate(req.params.id, obj, {new:true});
    res.send(location);
}

module.exports = {getAll, getById, deleteById, create, update, getByFilmName}