import React, { Component } from 'react';
import { sharePost } from '../actions/posts';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Sharing extends Component {
	constructor(props) {
		super(props);
		this.state = { email: '', shared: this.props.post.shared };
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const { dispatch } = this.props;
		const { _id } = this.props.post;
		const email = this.state.email;
		dispatch(sharePost(email, _id));
	}

	render() {
		return (
			<div className="newpost">
				<h2 className="sharepost-header">Sharing</h2>
				<form onSubmit={this.handleSubmit}>
					<input
						className="input sharepost-email"
						placeholder="Enter an email"
						type="text"
						name="email"
						onChange={this.handleInputChange}
					/>
					<div className="sharepost-shared">
						{this.state.shared.map((email, index) => (
							<div className="sharepost-shared-item" key={email}>
								{email}
							</div>
						))}
					</div>
					<div className="newpost-bottom">
						<button type="submit" className="btn btn-primary newpost-btn">
							Share
						</button>
					</div>
				</form>
			</div>
		);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.shareSuccess) {
			this.setState({
				shared: nextProps.shared
			});

			this.props.update(nextProps.shared);
			setTimeout(() => {
				this.props.close();
			}, 500);
		}
	}
}

Sharing.propTypes = {
	dispatch: PropTypes.func.isRequired,
	isSharing: PropTypes.bool.isRequired,
	shareSuccess: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
	const { isSharing, shareSuccess, shared } = state.posts || {
		isSharing: false,
		shareSuccess: false,
		shared: []
	};
	const { isAuthenticated } = state.auth;
	return {
		isSharing,
		shareSuccess,
		shared,
		isAuthenticated
	};
}

export default connect(mapStateToProps)(Sharing);
