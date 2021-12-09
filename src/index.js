import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/app';

ReactDOM.render(<App />, document.getElementById('root'));
setTimeout(() => {
  ReactDOM.render(<h2>unmounted</h2>, document.getElementById('root'));
}, 4000);
