import React from 'react';
import {Route, HashRouter, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from './shared/Loading';
import {LoginRequiredRoute} from "./shared/route";
import AccountStore from "./shared/stores/AccountStore";

const Home = Loadable({
    loader: () => import(/* webpackChunkName: "home" */'./app/home/index.js'),
    loading: Loading,
});

const AdminSociety = Loadable({
    loader: () => import(/* webpackChunkName: "admin_society" */'./app/admin_society/index.js'),
    loading: Loading,
});

const SocietyBureau = Loadable({
    loader: () => import(/* webpackChunkName: "society_bureau" */'./app/society_bureau/index.js'),
    loading: Loading,
});

// const DEV = process.env.NODE_ENV !== 'production';
// const DEBUG = process.env.DEBUG === 'true';
// const MyRouter = (DEV && !DEBUG) ? HashRouter : BrowserRouter;
const MyRouter = HashRouter;

class AppRouter extends React.Component {
    componentWillMount() {
        AccountStore.fetch()
    }

    render() {
        return (
            <MyRouter>
                <div style={{height: '100%'}}>
                    <Switch>
                        <LoginRequiredRoute path="/manage" component={SocietyBureau}/>
                        <LoginRequiredRoute path="/admin_society" component={AdminSociety}/>
                        <Route path="" component={Home}/>
                    </Switch>
                </div>
            </MyRouter>
        );
    }
}

export default AppRouter;