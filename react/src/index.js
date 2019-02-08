import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import "antd/dist/antd.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import AppRouter from './router';

ReactDOM.render(
  <AppContainer>
    <AppRouter />
  </AppContainer>,
  document.getElementById('root'));