const store = require('./store');

const createUser = async(user) => {
    try {
        const storeUser = await store.add(user);
        return await storeUser;
    } catch (error) {
        const message = 'Ocurrio un error en usuario'
        console.error("user controller error", error.message);
        return message;
    }
};

const getUsers = async() => {
    try {
        const getAllUsers = await store.getAll();
        return await getAllUsers;
    } catch (error) {
        const message = 'Ocurrio un error encontrando los usuarios'
        console.error("getUser controller error", error);
        return message;
    }
}

const getUserByDNI = async(DNI) => {
    try {
        const getUser = await store.getUserID(DNI);
        return await getUser;
    } catch (error) {
        const message = 'Ocurrio un error encontrando el usuario'
        console.error("getUser controller error", error);
        return message;
    }
}

module.exports = {
    createUser,
    getUsers,
    getUserByDNI
}