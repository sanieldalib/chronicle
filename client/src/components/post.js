import React, { Component } from 'react';
import Moment from 'react-moment';

export default class Post extends Component {
	constructor(props) {
		super(props);
		this.state = initialState;
	}

	render() {
		const { post } = this.props;
		const { location } = post;
		console.log(location);
		const displayPost =
			post.text.length > 140 ? post.text.substring(0, 140) + '...' : post.text;
		const locationInfo =
			location === {} ? (
				''
			) : (
				<div className="location">
					<h6 className="card-subtitle mb-2">
						<i class="fas fa-map-marker-alt" />
						{location.written}
					</h6>
				</div>
			);
		console.log(displayPost);
		return (
			<div className="card post-card">
				<div className="card-body">
					<h5 className="card-title">{post.title}</h5>
					{locationInfo}
					<h6 className="card-subtitle mb-2 text-muted">
						<Moment fromNow ago>
							{post.date}
						</Moment>
						{' ago'}
					</h6>
					<p className="card-text">{displayPost}</p>
				</div>
			</div>
		);
	}
}

const initialState = {
	title: '',
	text: '',
	owner: '',
	location: {},
	images: []
};
