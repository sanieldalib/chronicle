import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';

class Navbar extends Component {
	onLogout(e) {
		e.preventDefault();
		this.props.logoutUser(this.props.history);
	}

	render() {
		const { isAuthenticated, user } = this.props.auth;
		const authLinks = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item dropdown">
					<a
						className="nav-link dropdown-toggle"
						href="#"
						id="navbarDropdown"
						role="button"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
					>
						{`Welcome, ${user.name}`}
					</a>
					<div className="dropdown-menu" aria-labelledby="navbarDropdown">
						<a className="nav-link" onClick={this.onLogout.bind(this)}>
							Logout
						</a>
					</div>
				</li>
			</ul>
		);
		const guestLinks = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<Link className="nav-link" to="/register">
						Register
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/login">
						Login
					</Link>
				</li>
			</ul>
		);

		const postLinks = (
			<ul className="navbar-nav mr-auto">
				<li className="nav-item dropdown">
					<a
						className="nav-link dropdown-toggle"
						href="#"
						id="navbarDropdown"
						role="button"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
					>
						Posts
					</a>
					<div className="dropdown-menu" aria-labelledby="navbarDropdown">
						<Link className="nav-link" to="/">
							Your Posts
						</Link>
						<Link className="nav-link" to="/shared">
							Shared Posts
						</Link>
					</div>
				</li>
			</ul>
		);
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<Link className="navbar-brand" to="/">
					Chronicle
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					{postLinks}
					{isAuthenticated ? authLinks : guestLinks}
				</div>
			</nav>
		);
	}
}
Navbar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ logoutUser }
)(withRouter(Navbar));
