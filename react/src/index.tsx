import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from 'react-hot-loader';
import "antd/dist/antd.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss'
import Hello from './Hello';

import AppRouter from './router';

ReactDOM.render(
  <AppContainer >
    <Hello />
  </AppContainer>,
document.getElementById('root'));