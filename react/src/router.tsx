import * as React from "react";
import {Route, HashRouter, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from './shared/Loading';
import {LoginRequiredRoute} from "./shared/route";
import AccountStore from "./shared/stores/AccountStore";
import StudentTable from "./app/society_bureau/students/components/StudentTable";
import ApolloClient from './utils/ApolloClient';
import {ApolloProvider} from "react-apollo";

const Home = Loadable({
    loader: () => import(/* webpackChunkName: "home" */'./app/home/index'),
    loading: Loading,
});

const newHome = Loadable({
    loader: () => import(/* webpackChunkName: "home" */'./app/home/new_index'),
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
                <ApolloProvider client={ApolloClient}>
                    <Switch>
                        <LoginRequiredRoute path="/manage" component={SocietyBureau}/>
                        <LoginRequiredRoute path="/admin_society" component={AdminSociety}/>
                        <Route path="/test" component={StudentTable} />
                        <Route path="" component={newHome}/>
                    </Switch>
                    </ApolloProvider>
                </div>
            </MyRouter>
        );
    }
}

export default AppRouter;