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

const getTotalCredits = () => {
    return creditsModel.aggregate([{
            $match: { isPay: false, state: true },
        },
        {
            $project: { value: 1 },
        }
    ])
}


module.exports = {
    add: addCredit,
    getAll: getCreditsByUser,
    denies: getDeniesCredits,
    pendding: getPenddingPayments,
    totalCredits: getTotalCredits
        //Get
        //Update
}