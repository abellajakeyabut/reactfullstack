import ReactDOM from 'react-dom';
import React from 'react';
import axios from 'axios';
import App from './components/App';

axios
  .get('http://localhost:8080/api/contests')
  .then((resp) => {
    ReactDOM.render(
      <App initialContests={resp.data.contests} />,
      document.getElementById('root')
    );

    console.log('done');
  })
  .catch(console.error);
