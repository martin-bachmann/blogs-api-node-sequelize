const express = require('express');
const { userRouter, loginRouter, categoryRouter, postRouter } = require('./routers');

// ...

const app = express();

app.use(express.json());

// ....

app.use('/login', loginRouter);

app.use('/user', userRouter);

app.use('/categories', categoryRouter);

app.use('/post', postRouter);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
