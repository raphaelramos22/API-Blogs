const express = require('express');
const swaggerUi = require('swagger-ui-express');
const routerLogin = require('./routers/loginRouter');
const routerUser = require('./routers/userRouter');
const error = require('./middleware/error.middleware');
const routerCategory = require('./routers/categoryRouter');
const routerPost = require('./routers/postRouter');
const swaggerFile = require('../swagger_output.json');
// ...

const app = express();

app.use(express.json());
app.use('/login', routerLogin);
app.use('/user', routerUser);
app.use('/categories', routerCategory);
app.use('/post', routerPost);
app.use('/doc-api', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(error);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
