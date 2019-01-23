import React from 'react';
import {BrowserRouter, Route, HashRouter} from 'react-router-dom';
import FormContainer from "./FormContainer";

const MyRouter = (DEV && !DEBUG) ? HashRouter : BrowserRouter;

const DEV = process.env.NODE_ENV !== 'production';
const DEBUG = process.env.DEBUG === 'true';

class AppRouter extends React.Component {
    render() {
        return (
            <MyRouter>
                <div style={{height: '100%'}}>
                    <Route path="/" component={FormContainer}/>
                </div>
            </MyRouter>
        );
    }
}

export default AppRouter;