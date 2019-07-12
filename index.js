const express = require('express');

const server = express();

const projectRouter = require('./expressRouters/projectRouter.js');
const actionRouter = require('./expressRouters/actionRouter.js');

server.get('/', (req, res) => {
  res.send(`
    <h2> Welcome to my Sprint Challenge </h2>
  `)
});

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));
