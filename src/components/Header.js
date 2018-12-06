import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import deauthorize from '../actions/deauthorize';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }
    logout() {
        localStorage.removeItem('token');
        this.props.dispatch(deauthorize);
    }
    render() {
        const { subheading } = this.props;
        return (
            <header className="header red darken-4">
                <Link to="/" className="header-logo white-text">
                    <span className='grey-text text-darken-4'>N</span>otes <span className='grey-text text-darken-4'>A</span>pp
                </Link>

                <p className="header-controls">
                {
                    this.props.auth.auth && 
                    <Link to="/account"><i className="medium material-icons grey-text text-darken-4">account_box</i></Link>
                }
                {
                    this.props.auth.auth && 
                    <button className='waves-effect waves-dark btn white black-text' onClick={this.logout}>Logout</button>
                }
                </p>
                
                <h3 className="header-subheading grey darken-4 white-text">{subheading}</h3>
            </header>
        );
    }
}
const mapStateToProps = (state) => ({ auth: state });

export default connect(mapStateToProps)(Header);