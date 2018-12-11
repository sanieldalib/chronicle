import React, { Component } from 'react';
import { sharePost } from '../actions/posts';

export default class Sharing extends Component {
	constructor(props) {
		super(props);
		console.log(this.props);
		this.state = { email: '', shared: this.props.post.shared };
		console.log(this.state);
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
		const { _id } = this.props.post;
		const email = this.state.email;
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
							<div className="sharepost-shared-item" key={index}>
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
}
