import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style.js';
import { GlobalStyle } from './statics/iconfont/iconfont.js';

ReactDOM.render(
  <div>
    <GlobalStyle />
    <App />
  </div>,
  document.getElementById('root')
);


