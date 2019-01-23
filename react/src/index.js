import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import AppRouter from './router';

ReactDOM.render(
  <AppContainer>
    <AppRouter />
  </AppContainer>,
  document.getElementById('root'));