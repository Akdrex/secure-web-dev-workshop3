const User = require('./user_model')
const ct = require('./user_controller')
const bcrypt = require('bcrypt')
const Location = require("../locations/locations.model");

async function register(username, password, role){
    const hash = await bcrypt.hash(password, 10)
    const user = new User({username, password: hash, role})
    return await user.save()
}

async function checkPassword(username, password){
    const user = await User.findOne({username})
    if(!user){
        return false
    }
    const match = await  bcrypt.compare(password, user.password)
    if(!match){
        return false
    }
    return user
}
async function getSelfUsername(req, res) {
    res.json({
        id: req.user.id,
        username: req.user.username,
        password: req.user.password
    })
}

async function updateSelfUsername(req, res){
    let obj = {
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10),
        role: req.user.role
    }
    const user = await User.findOneAndUpdate(req.user._id, obj, {new:true});
    res.send(user)
}



async function deleteUser(req, res){
    await User.deleteOne({ username: req.user.username });
    res.send("Le user " + req.user.username + "/" +  params.username + " a été supprimé");
}

async function getAllUsers (req, res){
    let users = await User.find();
    let usernames = [];
    for(let key in users){
        usernames.push(users[key].username);
    }
    res.send(usernames);
}

module.exports = {register, checkPassword, getSelfUsername, updateSelfUsername,deleteUser, getAllUsers}