import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import uuid from 'uuid/v4';
import Header from '../components/Header';
import { withRouter } from 'react-router-dom';
import EditCard from './EditCard';

import { isEmail } from 'validator';

import { baseURL } from '../config/axios.defaults';


class Account extends React.Component {
    constructor(props) {
        super(props);

        this.handleUpdate = this.handleUpdate.bind(this);


        this.state = {
            undefined: false,
            cards: []
        };
    }
    
    componentDidMount() {
        // console.log('edit id', this.props.id)
        // axios.get(baseURL + '/cards', 
        // {
        //     headers: {
        //         id: this.props.id,
        //         authorization: this.props.auth.token
        //     }
        // })
        // .then(response => {
        //     // console.log('edit mount', response)
        //     this.setState({
        //         cards: response.data
        //     });
        // })
        // .catch(error => {
        //     console.log('error', error);
        //     this.setState({
        //         undefined: true
        //     });
        // });
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

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};
export default withRouter(connect(mapStateToProps)(Account));