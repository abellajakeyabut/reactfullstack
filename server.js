import express from 'express';
import { configuration } from './serverConfig';
import apiRouter from './api'; //./api/index.js is implied because index.js is the file we are trying to access

import fs from 'fs';
const server = express();

server.set('view engine', 'ejs');
server.get('/', (req, res) => {
  res.render('index', {
    content: 'LUCAS',
  });
});

server.use(express.static('public'));
server.use('/api', apiRouter);
server.get('/about.html', (req, res) => {
  fs.readFile('./about.html', (err, data) => {
    console.log('served!');
    res.send(data.toString());
  });
});

server.listen(configuration.port, () => {
  console.info('listener started..');
});
