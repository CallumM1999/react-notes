import React from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import Register from './Register';
import Login from './Login';
import Forgot from './Forgot';


class LoginContainer extends React.Component {
    constructor(props) {
        super(props);

        this.showLoginPage = this.showLoginPage.bind(this);
        this.showForgotPage = this.showForgotPage.bind(this);        
        this.showRegisterPage = this.showRegisterPage.bind(this);

        // this.Form = this.Form.bind(this);
        this.setError = this.setError.bind(this);
        this.redirect = this.redirect.bind(this);

        this.state = {
            page: 'login',
            error: null
        };
    }

    setError(message) {
        this.setState({
            error: message
        });
    }

    redirect(path = '/') {

        this.props.history.push(path);
        
    }

    showLoginPage(e) {
        // e.preventDefault();
        console.log('show login page');
        this.setState({ page: 'login' });
    }
    showRegisterPage(e) {
        // e.preventDefault();
        console.log('show register page');
        this.setState({ page: 'register' });
    }
    showForgotPage(e) {
        // e.preventDefault();
        console.log('show forgot page');
        this.setState({ page: 'forgot' });
    }

    sendCode() {

        alert('Code: 195442S');
    }

    render() {

        const selectLoginOption = () => {
            switch (this.state.page) {
                case 'login':
                    return (
                        <Login 
                            state={this.state}
                            showRegisterPage={this.showRegisterPage}    
                            showLoginPage={this.showLoginPage}    
                            showForgotPage={this.showForgotPage}  
                            setError={this.setError}  
                            redirect={this.redirect}
                        />
                    );
                case 'register':
                    return (
                        <Register 
                            state={this.state}
                            showRegisterPage={this.showRegisterPage}    
                            showLoginPage={this.showLoginPage}    
                            showForgotPage={this.showForgotPage}    
                            setError={this.setError}  
                            redirect={this.redirect}
                        />
                    );
    
                case 'forgot':
                    return (
                        <Forgot 
                            state={this.state}
                            showRegisterPage={this.showRegisterPage}    
                            showLoginPage={this.showLoginPage}    
                            showForgotPage={this.showForgotPage}  
                            sendCode={this.sendCode}  
                            setError={this.setError}  
                            redirect={this.redirect}
                        />
                    );
    
            }
        };

        return (
            <div>
                <Header auth={this.props.auth.auth} dispatch={this.props.dispatch} />

                {selectLoginOption()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};
export default connect(mapStateToProps)(LoginContainer);