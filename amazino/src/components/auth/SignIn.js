import React, {Component} from 'react';
import {signIn} from '../../shared/Firebase'

class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }

    constructor(props) {
        super(props);

        this.signInButton = this.signInButton.bind(this);
    }

    async signInButton(e) {
        try {
            await signIn('emaf123il@googl.com', 'passasef');
        }
        catch (err) {
            console.log(err);
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.signInButton(e);

        // log state for debug
        console.log(this.state);
    }

    handleChange = (e) => {
        // update state with new field
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        return(
            <div className="container section">
                <div className="row">
                    <div className="card col s4 offset-s4">
                        <form className="card-content" onSubmit={this.handleSubmit}>
                            <h4 className="center">Sign In</h4>
                            <div className="input-field">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" onChange={this.handleChange} />
                            </div>
                            <div className="input-field">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" onChange={this.handleChange} />
                            </div>
                            <div className="center">
                                <button onClick={this.signInButton} className="btn z-depth-0 green white-text">sign in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignIn;