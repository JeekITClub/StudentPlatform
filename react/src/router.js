import React from 'react';
import {Route, HashRouter, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from './shared/loading';

const Home = Loadable({
    loader: () => import('./app/home/index.js'),
    loading: Loading,
});

const Society = Loadable({
    loader: () => import('./app/society/index.js'),
    loading: Loading,
});

const AdminSociety = Loadable({
    loader: () => import('./app/admin_society/index.js'),
    loading: Loading,
});

const SocietyBureau = Loadable({
    loader: () => import('./app/society_bureau/index.js'),
    loading: Loading,
});

// const DEV = process.env.NODE_ENV !== 'production';
// const DEBUG = process.env.DEBUG === 'true';
// const MyRouter = (DEV && !DEBUG) ? HashRouter : BrowserRouter;
const MyRouter = HashRouter;

class AppRouter extends React.Component {
    render() {
        return (
            <MyRouter>
                <div style={{height: '100%'}}>
                    <Switch>
                        <Route path="/manage" component={SocietyBureau}/>
                        <Route path="/society" component={Society}/>
                        <Route path="/admin_society" component={AdminSociety}/>
                        <Route path="" component={Home}/>
                    </Switch>
                </div>
            </MyRouter>
        );
    }
}

export default AppRouter;