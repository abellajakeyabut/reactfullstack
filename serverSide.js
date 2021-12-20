//fetch data from api
import axios from 'axios';
import { configuration } from './serverConfig';
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import App from './src/components/App';

const serverRender = () =>
  axios.get(`${configuration.serverUrl}/api/contests`).then((resp) => {
    return ReactDOMServer.renderToString(
      <App initialContests={resp.data.contests} />
    );
  });

export default serverRender;
