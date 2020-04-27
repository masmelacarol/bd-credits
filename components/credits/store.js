const creditsModel = require('./model');
const userModel = require('../user/model');

const addCredit = (DNI, credit) => {
    const userM = userModel.findOne({ DNI })
    const newCredit = new creditsModel(credit);
    const savecredit = newCredit.save();

    return [userM, savecredit];
}

const getCreditsByUser = (DNI) => {
    const userM = userModel.findOne({ DNI }).populate('credits')
    return userM;
}

const getDeniesCredits = () => {
    return creditsModel.find({ state: false });
}

const getPenddingPayments = () => {
    return creditsModel.find({ state: true, isPay: false });
}

const getPenddinByUser = async(DNI) => {
    const userM = userModel.find({ credits: { $elemMatch: { state: true, isPay: false } } });
    let m = await userM;
    console.log("getPenddinByUser -> m", m);
    // // let user = await userM.credits.find({ state: true, isPay: false });
    // // console.log("getPenddinByUser -> user", user)
    return userM;
}

module.exports = {
    add: addCredit,
    getAll: getCreditsByUser,
    denies: getDeniesCredits,
    pendding: getPenddingPayments,
    penddingByUser: getPenddinByUser,
    //Get
    //Update
}