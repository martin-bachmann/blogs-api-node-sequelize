const express = require('express');
const { userRouter, loginRouter } = require('./routers');

// ...

const app = express();

app.use(express.json());

// ....

app.use('/login', loginRouter);

app.use('/users', userRouter);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
