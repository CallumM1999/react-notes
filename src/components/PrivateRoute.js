import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import checkAuth from '../actions/checkAuth';
import logout from '../actions/logout';
import { connect } from 'react-redux';

const PrivateRoute = props => {
    return (
        <Route 
            render={() => {
                if (checkAuth(props.auth)) return <props.component id={props.computedMatch.params.id} />;

                props.dispatch(logout());
                return <Redirect to='/login'/>;
                    
            }}
        />
    );
};

export default connect()(PrivateRoute);