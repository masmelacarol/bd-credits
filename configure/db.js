const mongoose = require('mongoose');

const mongodb = "mongodb+srv://credits-app:JoseD961010@cluster0-90n1g.mongodb.net/test?retryWrites=true&w=majority";

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