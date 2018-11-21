import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import logout from '../actions/logout';



class Header extends React.Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }
    logout() {
        localStorage.removeItem('token');
        this.props.dispatch(logout());
    }
    render() {
        const { subheading } = this.props;
        return (
            <header>
                <Link to='/'><h1 className="header-heading">
                    <span className="header-char-dark">N</span>
                    <span>otes</span>
                    
                    <span className="header-char-dark">A</span>
                    <span>pp</span>
                </h1></Link>
                {
                    this.props.auth.auth && 
                    <p>
                      <Link to='/account'>Account</Link>
                    : {this.props.auth.email} <button className='btn header-btn' onClick={this.logout}>Logout</button></p>
                }
                <h2 className="header-subheading">{subheading}</h2>
            </header>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};
export default connect(mapStateToProps)(Header);