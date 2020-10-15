const express = require('express');

//Init express app
const app = express();

//Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routers
app.use('/api/user', require('./router/auth'));

const PORT = process.env.PORT || 5000;
//Start server
app.listen(PORT, () => console.log(`server started at ${PORT}`));
