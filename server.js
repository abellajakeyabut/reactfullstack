import express from 'express';
import { configuration } from './serverConfig';
import apiRouter from './api';
//./api/index.js is implied because index.js is the file we are trying to access
import nodeSassMiddleware from 'node-sass-middleware';
import fs from 'fs';
import path from 'path';
import serverRender from './serverSide';
const server = express();

server.use(
  nodeSassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public'),
  })
);

server.use(express.static('public'));
server.set('view engine', 'ejs');
/*server.get(['/'], (req, res) => {
  res.render('index', {
    content: 'LUCAS',
  });
});*/
server.get(['/', '/contest/:contestId'], (req, res) => {
  serverRender(req.params.contestId)
    .then(({ initialMarkup, initialData }) => {
      console.log(initialMarkup);
      res.render('index', { initialMarkup, initialData });
    })
    .catch((error) => {
      console.log(error);
      res.status('400').send('Bad Request');
    });
});

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
