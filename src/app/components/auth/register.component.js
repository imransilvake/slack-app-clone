// react
import React, { Component } from 'react';
import { Link } from 'react-router-dom'

// app
import firebase from './../../../firebase';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

class Register extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
        errors: []
    };
    isFormEnabled = false;

    render() {
        const {username, email, password, passwordConfirm, errors} = this.state;
        return (
            <section className="sc-register">
                <div className="cd-row">
                    {/* Form */}
                    <div className="cd-col sc-form">
                        <h2>Register</h2>
                        {
                            errors && errors.length > 0 && (
                                /* Errors */
                                <p className="cd-error">{this.displayErrors(errors)}</p>
                            )
                        }
                        <form className="sc-form-fields" onSubmit={this.handleSubmit}>
                            <FormControl className="sc-form-field" fullWidth>
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Input id="username" name="username" value={username} onChange={this.handleChange}/>
                            </FormControl>
                            <FormControl className="sc-form-field" fullWidth>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input id="email" name="email" value={email} onChange={this.handleChange}/>
                            </FormControl>
                            <FormControl className="sc-form-field" fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input id="password" name="password" type="password" value={password} onChange={this.handleChange}/>
                            </FormControl>
                            <FormControl className="sc-form-field" fullWidth>
                                <InputLabel htmlFor="passwordConfirm">Password Confirm</InputLabel>
                                <Input id="passwordConfirm" name="passwordConfirm" type="password" value={passwordConfirm}
                                       onChange={this.handleChange}/>
                            </FormControl>
                            <Button className="sc-button"
                                    variant="contained"
                                    type="submit"
                                    disabled={!this.isFormEnabled}
                                    fullWidth>
                                Register
                            </Button>
                        </form>
                    </div>

                    {/* Link */}
                    <div className="cd-col sc-link">
                        <p>Already a user? <Link className="cd-link" to="/login">Login</Link></p>
                    </div>
                </div>
            </section>
        );
    }

    /**
     * handle input change event
     *
     * @param event
     */
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        this.isFormEnabled = !this.isFormEmpty(this.state) &&
            this.isEmailValid(this.state.email) &&
            this.isPasswordValid(this.state);
    };

    /**
     * handle form submit event
     *
     * @param event
     */
    handleSubmit = (event) => {
        // stop default event
        event.preventDefault();

        // check form validation
        if (this.isFormValid()) {
            // register user
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => {
                    // remove errors
                    this.setState({errors: null});
                })
                .catch((error) => {
                    // add errors
                    this.setState({errors: [error]});
                });
        }
    };

    /**
     * check form validation
     *
     * @returns {boolean}
     */
    isFormValid = () => {
        let errors = [];
        let error;

        if (this.isFormEmpty(this.state)) {
            // throw error
            error = {message: 'The form is empty!'};
            this.setState({errors: errors.concat(error)});
            return false;
        } else if (!this.isEmailValid(this.state.email)) {
            // throw error
            error = {message: 'Email is invalid!'};
            this.setState({errors: errors.concat(error)});
            return false;
        } else if (!this.isPasswordValid(this.state)) {
            // throw error
            error = {message: 'Password is invalid!'};
            this.setState({errors: errors.concat(error)});
            return false;
        } else {
            // form valid
            return true;
        }
    };

    /**
     * check whether form is empty or not
     *
     * @param username
     * @param email
     * @param password
     * @param passwordConfirm
     * @returns {boolean}
     */
    isFormEmpty = ({username, email, password, passwordConfirm}) => {
        return !username.length || !email.length || !password.length || !passwordConfirm.length;
    };

    /**
     * check email validity
     *
     * @param email
     */
    isEmailValid = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    /**
     * check password validity
     *
     * @param password
     * @param passwordConfirm
     */
    isPasswordValid = ({password, passwordConfirm}) => {
        if (password.length < 6 || passwordConfirm < 6) {
            return false;
        } else {
            return password === passwordConfirm;
        }
    };

    /**
     * display errors
     *
     * @param errors
     * @returns {*}
     */
    displayErrors = (errors) => errors.map((error, i) => <p key={i}>{error.message}</p>);
}

export default Register;
