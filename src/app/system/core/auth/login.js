// react
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// firebase
import firebase from '../../../../firebase';

// app
import FormControl from '@material-ui/core/FormControl/FormControl';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Input from '@material-ui/core/Input/Input';
import Button from '@material-ui/core/Button/Button';
import SlackLogo from '../../../../assets/svg/general/slack-logo.svg';
import i18n from '../../../../assets/i18n/i18n';
import LoadingAnimation from '../../utilities/loading-animation/loading-animation';

class Login extends Component {
	state = {
		email: '',
		password: '',
		errors: [],
		isFormEnabled: false,
		isAnimationLoading: false
	};

	render() {
		const { email, password, errors, isFormEnabled, isAnimationLoading } = this.state;

		return isAnimationLoading ? <LoadingAnimation/> : (
			<section className="sc-auth-wrapper">
				<div className="cd-row">
					{/* Header */}
					<header className="sc-header">
						<Link to="/">
							<div className="cd-tooltip">
								<img src={SlackLogo} alt={i18n.t('LOGIN.HEADER.LOGO.ALT')}/>
								<span className="cd-arrow cd-left">{i18n.t('LOGIN.HEADER.LOGO.TOOLTIP')}</span>
							</div>
						</Link>
					</header>

					{/* Form */}
					<section className="cd-col sc-form">
						{
							errors && errors.length > 0 && (
								/* Errors */
								<p className="cd-error">{this.displayErrors(errors)}</p>
							)
						}
						<form className="sc-form-fields" onSubmit={this.handleSubmit}>
							<FormControl className="sc-form-field" fullWidth>
								<InputLabel htmlFor="email">{i18n.t('LOGIN.CONTENT.FORM.EMAIL')}</InputLabel>
								<Input
									id="email"
									name="email"
									value={email}
									error={this.handleInputError(errors, 'email')}
									onChange={this.handleChange}/>
							</FormControl>
							<FormControl className="sc-form-field" fullWidth>
								<InputLabel htmlFor="password">{i18n.t('LOGIN.CONTENT.FORM.PASSWORD')}</InputLabel>
								<Input
									id="password"
									name="password"
									type="password"
									value={password}
									error={this.handleInputError(errors, 'password')}
									onChange={this.handleChange}/>
							</FormControl>
							<Button
								className="sc-button sc-login"
								variant="contained"
								type="submit"
								disabled={!isFormEnabled}
								fullWidth>
								{i18n.t('LOGIN.CONTENT.BUTTON_TEXT')}
							</Button>
						</form>
					</section>

					{/* Footer */}
					<footer className="cd-col sc-footer">
						<p>{i18n.t('LOGIN.FOOTER.T1')} <Link className="cd-link" to="/register">{i18n.t('LOGIN.FOOTER.T2')}</Link></p>
					</footer>
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
		this.setState({ [event.target.name]: event.target.value }, () => {
			// remove errors
			if (this.state.errors && this.state.errors.length > 0) {
				this.setState({ errors: null });
			}

			// validate form
			this.setState({ isFormEnabled: this.isFormValid() });
		});
	};

	/**
	 * handle form submit event
	 *
	 * @param event
	 */
	handleSubmit = (event) => {
		// stop default event
		event.preventDefault();

		// show loading animation
		this.setState({ isAnimationLoading: true });

		// login user
		firebase
			.auth()
			.signInWithEmailAndPassword(this.state.email, this.state.password)
			.then(() => {
				// remove errors, show success message, remove loading animation
				this.setState({ errors: null, isAnimationLoading: false });

				// redirect to chat route
				this.props.history.push('/chat');
			})
			.catch((error) => {
				this.setState({ errors: [error], isAnimationLoading: false });
			});
	};

	/**
	 * check form validation
	 *
	 * @returns {boolean}
	 */
	isFormValid = () => {
		if (this.isFormEmpty(this.state)) {
			return false;
		}
		return this.isEmailValid(this.state.email);
	};

	/**
	 * check whether form is empty or not
	 *
	 * @param email
	 * @param password
	 * @returns {boolean}
	 */
	isFormEmpty = ({ email, password }) => {
		return !email.length || !(password.length && password.length > 5);
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
	 * display errors
	 *
	 * @param errors
	 * @returns {*}
	 */
	displayErrors = errors => errors.map((error, i) => <span key={i}>{error.message}</span>);

	/**
	 * handle Input Error
	 *
	 * @param errors
	 * @param fieldName
	 * @returns {*|boolean}
	 */
	handleInputError = (errors, fieldName) => {
		return (
			errors && errors.some(
				error => error.message.toLocaleLowerCase().includes(fieldName)
			)
		);
	};
}

export default Login;
