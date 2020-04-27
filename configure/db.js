const mongoose = require('mongoose');

const mongodb = process.env.MONGO_CONNECTION;

mongoose.connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    // we're connected!   
    console.log("Connection succesfully created");
});
module.exports = db;