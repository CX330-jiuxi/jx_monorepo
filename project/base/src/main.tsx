import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
import rootStore from './store';

ReactDOM.render(
  <React.StrictMode>
    <rootStore.Provider>
      <App />
    </rootStore.Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
