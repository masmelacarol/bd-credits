const userModel = require('./model');

const addUser = async(user) => {
    const userExists = await userModel.findOne({ DNI: user.DNI });
    if (userExists) return userExists
    const newUser = new userModel(user);
    return newUser.save();
}

const getUsers = () => {
    return userModel.find();
}

const getUserByID = (DNI) => {
    return userModel.findOne({ DNI: DNI });
}

module.exports = {
    add: addUser,
    getAll: getUsers,
    getUserID: getUserByID,
    //Get
    //Update
}