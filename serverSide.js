//fetch data from api
import axios from 'axios';
import { configuration } from './serverConfig';
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import App from './src/components/App';

const getApiUrl = (contestId) => {
  console.log('getting URL');
  if (contestId) {
    return `${configuration.serverUrl}/api/contest/${contestId}`;
  } else {
    return `${configuration.serverUrl}/api/contests`;
  }
};
const getInitialData = (contestId, apiData) => {
  if (contestId) {
    return {
      currentContestId: apiData.id,
      contests: {
        [apiData.id]: apiData,
      },
    };
  }
  return apiData;
};
const serverRender = (contestId) =>
  axios.get(getApiUrl(contestId)).then((resp) => {
    const initialData = getInitialData(contestId, resp.data);
    return {
      initialMarkup: ReactDOMServer.renderToString(
        <App initialData={initialData} />
      ),
      initialData,
    };
  });

export default serverRender;
