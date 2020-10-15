const mongoose = require('mongoose');

const connect = async () => {
    await mongoose.connect(
        process.env.MONOGO_DB_CONNECT,
        { useNewUrlParser: true, useUnifiedTopology: true },
        (err) => {
            err == undefined
                ? console.log('Connected to DB successfully')
                : console.log(err);
        }
    );
};

module.exports.connect = connect;
