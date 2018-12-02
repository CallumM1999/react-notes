import React from 'react';
import { Redirect } from 'react-router-dom';
import checkAuth from '../actions/checkAuth';
import { connect } from 'react-redux';

class PrivateRoute extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (checkAuth(this.props.auth)) ? (
            <this.props.component id={this.props.computedMatch.params.id} />
        ) : (
            <Redirect to='/login'/>
        );
    }
}

const mapStateToProps = (state) => ({ auth: state });

export default connect(mapStateToProps)(PrivateRoute);