import React from 'react';
import { Redirect } from 'react-router-dom';
import checkAuth from '../actions/checkAuth';
import { connect } from 'react-redux';

class PrivateRoute extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        if (!checkAuth(this.props.auth)) {
            this.props.dispatch({
                type: 'AUTH_FALSE'
            });
        }
    }

    render() {
        return (checkAuth(this.props.auth)) ? (
            <this.props.component id={this.props.computedMatch.params.id} />
        ) : (
            <Redirect to='/login'/>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps)(PrivateRoute);