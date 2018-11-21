import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { withRouter } from 'react-router-dom';

import { isEmail } from 'validator';


class Account extends React.Component {
    constructor(props) {
        super(props);

        this.handleUpdate = this.handleUpdate.bind(this);


        this.state = {
            undefined: false,
            cards: []
        };
    }
    

   handleUpdate(e) {
        switch (e.target.name) {
            case 'password':
                console.log('password')
                
                break;
        
            case 'email':
                console.log('email');

                let email = prompt('new Email');
                if (!email) return;
                while (!isEmail(email)) {
                    email = prompt('invalid email, try again!');
                    if (!email) return;

                }

                let email_conf = prompt('confirm email');
                if (!email_conf) return;
                while (!isEmail(email_conf)) {
                    email_conf = prompt('invalid email, try again!');
                    if (!email_conf) return;

                }

                if (email === email_conf) {
                    console.log('updating email to:', email)
                } else {
                    console.log('email\'s don\'t match')
                }

        }
   }

    render() {
        return (
            <div>
                <Header subheading='Account' auth={this.props.auth.auth} dispatch={this.props.dispatch} />
            

                <div className="account-container">

                    <h3 className="account-heading">Settings</h3>
                    <div className="account-group">
                        <ul className="account-group-list">

                            <li className="account-group-list-item">
                                <div>Email Address   [{this.props.auth.email}]</div>
                                <button name='email' className="account-btn-update" onClick={this.handleUpdate}>Update</button>
                            </li>

                            <li className="account-group-list-item">
                                <div>Password   [*******]</div>
                                <button name='password' className="account-btn-update" onClick={this.handleUpdate}>Update</button>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default withRouter(connect(mapStateToProps)(Account));