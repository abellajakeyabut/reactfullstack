import ReactDOM from 'react-dom';
import React from 'react';
import data from './testData.json';

import App from './components/App';

ReactDOM.render(
  <App contests={data.contests} />,
  document.getElementById('root')
);
