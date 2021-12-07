import http from 'http';
import { configuration } from './serverConfig';

const server = http.createServer();
server.listen(configuration.port);
server.on('request', (req, res) => {
  res.write('Hello HTTP!\n');
  setTimeout(() => {
    res.write('Done!!!!\n');
    res.end();
  }, 3000);
  console.log('here');
});
