const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = [
  './src/routers/userRouter.js', 
  './src/routers/categoryRouter.js', 
  './src/routers/loginRouter.js',
  './src/routers/postRouter.js',
];

swaggerAutogen(outputFile, endpointsFiles);