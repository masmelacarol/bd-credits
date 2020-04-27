const store = require('./store');

const createCredit = async(DNI, credit) => {
    try {
        let numberRandom = Math.random() > 0.5;
        credit.state = numberRandom;
        const [user, storeCredit] = await store.add(DNI, credit);
        const newCredit = await storeCredit;
        const userPromise = await user;
        userPromise.credits.push(newCredit._id);
        await userPromise.save();
        return newCredit;
    } catch (error) {
        const message = 'Ocurrio un error creando credito'
        console.error("credit controller error", error.message);
        return message;
    }
};

const getCredits = async(DNI) => {
    try {
        const getAllCredits = await store.getAll(DNI);
        return await getAllCredits;
    } catch (error) {
        const message = 'Ocurrio un error encontrando los creditos'
        console.error("getCredits controller error", error);
        return message;
    }
}

const getDenyCredits = async() => {
    try {
        const deniesCredits = await store.denies();
        return deniesCredits;
    } catch (error) {
        const message = 'Ocurrio un error encontrando los negados'
        console.error("getDenies controller error", error);
        return message;
    }
}



const getPenddingPayments = async() => {
    try {
        const pendding = await store.pendding();
        return pendding;
    } catch (error) {
        const message = 'Ocurrio un error encontrando los pendientes'
        console.error("getPendding controller error", error);
        return message;
    }
}

const getPenddingByUser = async(DNI) => {
    try {
        const pendding = await store.getAll(DNI);
        const filter = pendding.credits.filter(credit => {
            if (!credit.isPay && credit.state) {
                return credit
            }
        })
        console.log("getPenddingByUser -> filter", filter)
        return filter;
    } catch (error) {
        const message = 'Ocurrio un error encontrando los pendientes por usuario'
        console.error("getPenddingByUser controller error", error);
        return message;
    }
}


module.exports = {
    createCredit,
    getCredits,
    getDenyCredits,
    getPenddingPayments,
    getPenddingByUser,
    // getUserByDNI
}