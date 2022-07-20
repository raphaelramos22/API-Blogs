const express = require('express');
const routerLogin = require('./routers/loginRouter');
const routerUser = require('./routers/userRouter');
const error = require('./middleware/error.middleware');
const routerCategory = require('./routers/categoryRouter');
const routePost = require('./routers/postRouter');
// ...

const app = express();

app.use(express.json());
app.use('/login', routerLogin);
app.use('/user', routerUser);
app.use('/categories', routerCategory);
app.use('/post', routePost);
app.use(error);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
