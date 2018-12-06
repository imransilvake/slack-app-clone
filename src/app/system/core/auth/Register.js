// react
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// firebase
import firebase from '../../../../firebase';

// app
import md5 from 'md5';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import SlackLogo from '../../../../assets/svg/general/slack-logo.svg';
import i18n from '../../../../assets/i18n/i18n';
import ENV from '../../../../environment/index';
import LoadingAnimation from '../../utilities/loading-animation/LoadingAnimation';
import { regexEmailValidity } from '../../utilities/helpers/Regex';

class Register extends Component {
	state = {
		username: '',
		email: '',
		password: '',
		passwordConfirm: '',
		errors: [],
		usersRef: firebase.database().ref('users'),
		isFormEnabled: false,
		isAccountCreated: false,
		isAnimationLoading: false
	};

	render() {
		const { username, email, password, passwordConfirm, errors, isFormEnabled, isAccountCreated, isAnimationLoading } = this.state;

		const content = () => {
			switch (isAccountCreated) {
				case false:
					return (
						<section className="cd-col sc-form">
							{
								errors && errors.length > 0 && (
									/* Errors */
									<p className="cd-error">{this.displayErrors(errors)}</p>
								)
							}
							<form className="sc-form-fields" onSubmit={this.handleSubmit}>
								<FormControl className="sc-form-field" fullWidth>
									<InputLabel htmlFor="username">
										{i18n.t('REGISTER.CONTENT.FORM.USERNAME')}
									</InputLabel>
									<Input id="username" name="username" value={username} onChange={this.handleChange}/>
								</FormControl>
								<FormControl className="sc-form-field" fullWidth>
									<InputLabel htmlFor="email">
										{i18n.t('REGISTER.CONTENT.FORM.EMAIL')}
									</InputLabel>
									<Input
										id="email"
										name="email"
										value={email}
										error={this.handleInputError(errors, 'email')}
										onChange={this.handleChange}/>
								</FormControl>
								<FormControl className="sc-form-field" fullWidth>
									<InputLabel htmlFor="password">
										{i18n.t('REGISTER.CONTENT.FORM.PASSWORD')}
									</InputLabel>
									<Input
										id="password"
										name="password"
										type="password"
										value={password}
										onChange={this.handleChange}/>
								</FormControl>
								<FormControl className="sc-form-field" fullWidth>
									<InputLabel htmlFor="passwordConfirm">
										{i18n.t('REGISTER.CONTENT.FORM.CONFIRM_PASSWORD')}
									</InputLabel>
									<Input
										id="passwordConfirm"
										name="passwordConfirm"
										type="password"
										value={passwordConfirm}
										onChange={this.handleChange}/>
								</FormControl>
								<Button
									className="sc-button sc-register"
									variant="contained"
									type="submit"
									disabled={!isFormEnabled}
									fullWidth>
									{i18n.t('REGISTER.CONTENT.BUTTON_TEXT')}
								</Button>
							</form>
						</section>
					);
				default:
					return (
						<section className="cd-col sc-message">
							<p>{i18n.t('REGISTER.CONTENT.MESSAGE.T1')}</p>
							<p>{i18n.t('REGISTER.CONTENT.MESSAGE.T2')}</p>
						</section>
					);
			}
		};

		return isAnimationLoading ? <LoadingAnimation/> : (
			<section className="cd-container sc-auth-wrapper">
				<div className="cd-row">
					{/* Header */}
					<header className="sc-header">
						<Link to={ENV.ROUTING.HOME}>
							<div className="cd-tooltip">
								<img src={SlackLogo} alt={i18n.t('REGISTER.HEADER.LOGO.ALT')}/>
								<span className="cd-arrow cd-right">{i18n.t('REGISTER.HEADER.LOGO.TOOLTIP')}</span>
							</div>
						</Link>
					</header>

					{
						/* Form | Success Message */
						content()
					}

					{/* Footer */}
					<footer className="cd-col sc-footer">
						<p>
							{i18n.t('REGISTER.FOOTER.T1')}
							<Link className="cd-link" to={ENV.ROUTING.AUTH.LOGIN}>
								{i18n.t('REGISTER.FOOTER.T2')}
							</Link>
						</p>
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

		// register user
		firebase
			.auth()
			.createUserWithEmailAndPassword(this.state.email, this.state.password)
			.then((createdUser) => {
				createdUser.user.updateProfile({
					displayName: this.state.username,
					photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
				})
					.then(() => {
						this.saveUser(createdUser)
							.then(() => {
								// remove errors, show success message, remove loading animation
								this.setState({ errors: null, isAccountCreated: true, isAnimationLoading: false });

								// redirect to chat route
								setTimeout(() => {
									this.props.history.push(ENV.ROUTING.CHAT);
								}, 4000);
							})
							.catch((error) => {
								this.setState({ errors: [error], isAnimationLoading: false });
							});
					})
					.catch((error) => {
						this.setState({ errors: [error], isAnimationLoading: false });
					});
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
		if (this.isFormEmpty(this.state) || !this.isEmailValid(this.state.email)) {
			return false;
		}
		return this.isPasswordValid(this.state);
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
	isFormEmpty = ({ username, email, password, passwordConfirm }) => {
		return !username.length || !email.length || !password.length || !passwordConfirm.length;
	};

	/**
	 * check email validity
	 *
	 * @param email
	 */
	isEmailValid = (email) => {
		return regexEmailValidity(email);
	};

	/**
	 * check password validity
	 *
	 * @param password
	 * @param passwordConfirm
	 */
	isPasswordValid = ({ password, passwordConfirm }) => {
		if (password.length < 6 || passwordConfirm.length < 6) {
			return false;
		}
		return password === passwordConfirm;
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

	/**
	 * save user to firebase
	 *
	 * @param createdUser
	 * @returns {Promise<any>}
	 */
	saveUser = (createdUser) => {
		return this.state.usersRef.child(createdUser.user.uid)
			.set({
				name: createdUser.user.displayName,
				avatar: createdUser.user.photoURL
			});
	};
}

export default Register;
