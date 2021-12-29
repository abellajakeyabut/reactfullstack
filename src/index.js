import ReactDOM from 'react-dom';
import React from 'react';
import axios from 'axios';
import App from './components/App';

axios
  .get('http://localhost:8080/api/contests')
  .then((resp) => {
    console.log('reacting here');
    console.log(resp.data);
    ReactDOM.render(
      <App initialData={resp.data} />,
      document.getElementById('root')
    );
  })
  .catch(console.error);
