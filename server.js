const express = require('express');
const dbHelper = require('./helpers/mongDb');
const dotenv = require('dotenv');
const morgan = require('morgan');
const expressSanitizer = require('express-sanitizer');

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

//Input sanitizer
app.use(expressSanitizer());

//Routers
app.use('/api/user', require('./routes/AuthRoutes'));
app.use('/api/task', require('./routes/TaskRoutes'));
app.use('/api/food', require('./routes/FoodRoutes'));

//Undefined routes
app.all('*', (req, res) => {
    res.status(404).send('404 not found');
});

const PORT = process.env.PORT || process.env.DEFAULT_PORT;

//Start server
app.listen(PORT, () => console.log(`server started at ${PORT}`));
