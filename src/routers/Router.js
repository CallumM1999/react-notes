import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from '../components/LoginContainer';
import Dashboard from '../components/Dashboard';
import Edit from '../components/Edit';
import PageNotFound from '../components/PageNotFound';
import PrivateRoute from '../components/PrivateRoute'

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

                <Route path='/login' component={Login} exact={true}/>
                <Route path='*' component={PageNotFound}/>
            </Switch>
        </BrowserRouter>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(Router);