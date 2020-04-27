const store = require('./store');

const createCredit = async(DNI, credit) => {
    try {
        const userCredit = await store.getAll(DNI);
        const validateCredits = userCredit.credits.find(credit => credit.state === true);
        if (validateCredits) {
            credit.state = true;
        } else {
            let numberRandom = Math.random() > 0.5;
            credit.state = numberRandom;
        }
        const validatePayments = userCredit.credits.find(credit => credit.isPay === false && credit.state === true);

        if (validatePayments) {
            credit.state = false
        }

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

const getTotalCredits = async() => {
    try {
        const credits = await store.totalCredits();
        if (credits.length > 0) {
            const total = credits.reduce((total, credit) => {
                if (total.value) {
                    return total.value + credit.value
                } else {
                    return total + credit.value
                }
            });
            if (total.value) return total.value
            return total;
        } else {
            return 0;
        }

    } catch (error) {
        const message = 'Ocurrio un error encontrando los creditos totales'
        console.error("getTotalCredits controller error", error);
        return message;
    }
}


module.exports = {
    createCredit,
    getCredits,
    getDenyCredits,
    getPenddingPayments,
    getPenddingByUser,
    getTotalCredits
    // getUserByDNI
}