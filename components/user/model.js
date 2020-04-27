const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    DNI: { type: Number, required: true },
    credits: {
        type: [
            { type: Schema.Types.ObjectId, ref: "credits" }
        ]
    }
})

module.exports = mongoose.model("users", userSchema);