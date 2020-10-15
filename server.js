const express = require('express');
const dbHelper = require('./helper/mongDb');
const dotenv = require('dotenv');
const morgan = require('morgan');

//Init express app
const app = express();

//Set env variables
dotenv.config();

//Init morgon log
app.use(morgan(process.env.MORGON_LOG_LEVEL));

//connect to DB
dbHelper.connect();

//Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routers
app.use('/api/user', require('./router/auth'));

//Undefined routes
app.all('*', (req, res) => {
    res.status(403).send();
});

const PORT = process.env.PORT || process.env.DEFAULT_PORT;

//Start server
app.listen(PORT, () => console.log(`server started at ${PORT}`));
