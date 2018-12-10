import React, { Component } from 'react';
import Moment from 'react-moment';

export default class Post extends Component {
	constructor(props) {
		super(props);
		this.state = initialState;
	}

	render() {
		const { post } = this.props;
		const displayPost =
			post.text.length > 140 ? post.text.substring(0, 140) + '...' : post.text;
		console.log(displayPost);
		return (
			<div className="card">
				<div className="card-body">
					<h5 className="card-title">{post.title}</h5>
					<h6 className="card-subtitle mb-2 text-muted">
						<Moment fromNow ago>
							{post.date}
						</Moment>
						{' ago'}
					</h6>
					<p className="card-text">{displayPost}</p>
					<a href="/" className="card-link">
						Card link
					</a>
					<a href="/" className="card-link">
						Another link
					</a>
				</div>
			</div>
		);
	}
}

const initialState = {
	title: '',
	text: '',
	owner: '',
	images: []
};
