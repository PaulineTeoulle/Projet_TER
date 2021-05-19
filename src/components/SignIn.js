import React from 'react';
import ModalSignIn from "./modal/ModalSignIn";

export class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalSignInOpen: false,
        };
        this.ok = this.ok.bind(this);
        this.handleClickOpenSignIn = this.handleClickOpenSignIn.bind(this);
        this.handleClickCloseSignIn = this.handleClickCloseSignIn.bind(this);
    }

    handleClickOpenSignIn() {
        this.setState({modalSignInOpen: true});
    };

    handleClickCloseSignIn() {
        this.setState({modalSignInOpen: false});
    };

    ok() {
        alert('OUI')
    }

    render() {
        return (
            <div className="SignIn">
                {/*<button className="button outlined" onClick={this.handleClickOpenSignIn}>Open</button>*/}
                <ModalSignIn
                    title="Sign in"
                    actionButton="Sign in"
                    closeButton="Quit"
                    open={true}
                    close={this.handleClickCloseSignIn}
                    mainAction={this.ok}
                />
            </div>
        );

    }
}

export default SignIn;

