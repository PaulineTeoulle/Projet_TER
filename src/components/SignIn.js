import React from 'react';
import ModalSignIn from "./modal/ModalSignIn";

export class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalSignInOpen: true,
        };
        this.signIn = this.signIn.bind(this);
        this.handleClickOpenSignIn = this.handleClickOpenSignIn.bind(this);
        this.handleClickCloseSignIn = this.handleClickCloseSignIn.bind(this);
    }

    handleClickOpenSignIn() {
        this.setState({modalSignInOpen: true});
    };

    handleClickCloseSignIn() {
        this.setState({modalSignInOpen: false});
    };

    signIn() {
        alert('Sign In !');
    }

    render() {
        return (
            <div className="SignIn">
                {/*<button className="button outlined" onClick={this.handleClickOpenSignIn}>Open</button>*/}
                <ModalSignIn
                    title="Sign in"
                    actionButton="Sign in"
                    closeButton="Quit"
                    open={this.state.modalSignInOpen}
                    close={this.handleClickCloseSignIn}
                    mainAction={this.signIn}
                />
            </div>
        );

    }
}

export default SignIn;

