import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PrivateRoute from '../components/PrivateRoute';
import Loadable from 'react-loadable';

const Auth_Login = Loadable({
    loader: () => import('../components/Auth_Login'),
    loading: () => <div>Loading...</div>
});

const Auth_Forgot = Loadable({
    loader: () => import('../components/Auth_Forgot'),
    loading: () => <div>Loading...</div>
});

const Auth_Register = Loadable({
    loader: () => import('../components/Auth_Register'),
    loading: () => <div>Loading...</div>
});

const Dashboard = Loadable({
    loader: () => import('../components/Dashboard'),
    loading: () => <div>Loading...</div>
});

const Edit = Loadable({
    loader: () => import('../components/Edit'),
    loading: () => <div>Loading...</div>
});

const PageNotFound = Loadable({
    loader: () => import('../components/PageNotFound'),
    loading: () => <div>Loading...</div>
});

// const PrivateRoute = Loadable({
//     loader: () => import('../components/PrivateRoute'),
//     loading: () => <div>Loading...</div>
// });

const Study = Loadable({
    loader: () => import('../components/Study'),
    loading: () => <div>Loading...</div>
});

const Account = Loadable({
    loader: () => import('../components/Account'),
    loading: () => <div>Loading...</div>
});


const Router = props => {

    return (
        <BrowserRouter>
            <Switch>
                <PrivateRoute 
                    path='/' 
                    component={Dashboard} 
                    exact={true} 
                    auth={props.auth}
                />

                <PrivateRoute 
                    path='/edit/:id' 
                    component={Edit} 
                    exact={true} 
                    auth={props.auth}
                />

                <PrivateRoute 
                    path='/study/:id' 
                    component={Study} 
                    exact={true} 
                    auth={props.auth}
                />

                <PrivateRoute 
                    path='/account' 
                    component={Account} 
                    exact={true} 
                    auth={props.auth}
                />

                <Route path='/login' component={Auth_Login} exact={true}/>
                <Route path='/forgot' component={Auth_Forgot} exact={true}/>
                <Route path='/register' component={Auth_Register} exact={true}/>

                <Route path='*' component={PageNotFound}/>
            </Switch>
        </BrowserRouter>
    )
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Router);