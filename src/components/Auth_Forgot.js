import React from 'react';
import { Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

const Start = Loadable({
    loader: () => import('./Auth_Forgot_Start'),
    loading: () => <div>Loading...</div>
});

const Send = Loadable({
    loader: () => import('./Auth_Forgot_Send'),
    loading: () => <div>Loading...</div>
});

const Update = Loadable({
    loader: () => import('./Auth_Forgot_Update'),
    loading: () => <div>Loading...</div>
});

class Auth_Redirect extends React.Component {
    constructor(props) {
        super(props);

        this.verifyCallback = this.verifyCallback.bind(this);
        this.changeAddress = this.changeAddress.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.handleSend = this.handleSend.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);

        this.state = {
            formStage: 'START',
            isVerified: false,
            email: '',
            code: ''
        };
    }

    verifyCallback() {
        this.setState({ isVerified: true });
    }

    handleStart({ email }) {
        this.setState({
            formStage: 'SENT_CODE',
            email
        });
    }
    handleSend({ code }) {
          this.setState({
            formStage: 'GOT_CODE',
            code
        });
    }

    changeAddress() {
        this.setState({
            formStage: 'START'
        });
    }

    handleUpdate() {
        this.setState({
            formStage: 'SUCCESS'
        });
    }

    render() {
        switch (this.state.formStage) {
            case 'START':
                return <Start start={this.handleStart} verifyCallback={this.verifyCallback} isVerified={this.props.isVerified}/>
            case 'SENT_CODE':
                return <Send send={this.handleSend} email={this.state.email} changeAddress={this.changeAddress} isVerified={this.props.isVerified}/>
            case 'GOT_CODE':
                return <Update update={this.handleUpdate} email={this.state.email} code={this.state.code} isVerified={this.props.isVerified}/>
            case 'SUCCESS':
                return (
                    <Redirect to='/'/>
                );
        }    
    }
}

export default Auth_Redirect;