import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Auth_Login from '../components/Auth_Login';
import Auth_Forgot from '../components/Auth_Forgot';
import Auth_Register from '../components/Auth_Register';

import Dashboard from '../components/Dashboard';
import Edit from '../components/Edit';
import PageNotFound from '../components/PageNotFound';
import PrivateRoute from '../components/PrivateRoute';
import Study from '../components/Study';
import Account from '../components/Account';

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