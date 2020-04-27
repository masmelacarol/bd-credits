const mongoose = require('mongoose');
const { Schema } = mongoose;
const creditsSchema = new Schema({
    value: { type: Number, required: true },
    date: { type: Date, required: false },
    state: { type: Boolean, required: true },
    isPay: { type: Boolean, required: true },
})

module.exports = mongoose.model("credits", creditsSchema);