import React from 'react';
import ModalSignUp from "./modal/ModalSignUp";

export class Users extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalSignUpOpen: false,
        };
        this.ok = this.ok.bind(this);
        this.handleClickOpenSignUp = this.handleClickOpenSignUp.bind(this);
        this.handleClickCloseSignUp = this.handleClickCloseSignUp.bind(this);
    }

    handleClickOpenSignUp() {
        this.setState({modalSignUpOpen: true});
    };

    handleClickCloseSignUp() {
        this.setState({modalSignUpOpen: false});
    };

    ok() {
        alert('OUI')
    }

    render() {
        return (
            <div className="Users">
                {/*<button className="button outlined" onClick={this.handleClickOpenSignUp}>Open</button>*/}
                <ModalSignUp
                    title="Sign Up"
                    actionButton="Sign Up"
                    closeButton="Quit"
                    open={true}
                    close={this.handleClickCloseSignUp}
                    mainAction={this.ok}
                />
            </div>
        );

    }
}

export default Users;

