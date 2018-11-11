import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import checkAuth from './checkAuth';

const PrivateRoute = props => {
    // console.log('private route', props)
    return (
        <Route 
            render={() => {
                if (checkAuth(props.auth)) return <props.component id={props.computedMatch.params.id} />;
                return <Redirect to='/login'/>;
            }}
        />
    );
}

export default PrivateRoute;