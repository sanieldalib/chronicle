import React, { Component } from 'react';
import Moment from 'react-moment';

export default class PostPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { post } = this.props.history.location.state;
		const locationInfo =
			post.location === {} ? (
				''
			) : (
				<div className="location">
					<h6 className="card-subtitle mb-2 text-muted">
						<i class="fas fa-map-marker-alt" />
						{post.location.written}
					</h6>
				</div>
			);
		return (
			<div className="container">
				<div className="home-header">
					<h1>{post.title}</h1>
					<button onClick={this.openModal} className="btn btn-primary">
						Share <i className="fas fa-share" />
					</button>
				</div>
				<div className="date-location">
					{locationInfo}
					<h6 className="card-subtitle mb-2 text-muted">
						<span className="vl">|</span>
						<i class="fas fa-clock" />
						<Moment fromNow ago>
							{post.date}
						</Moment>
						{' ago'}
					</h6>
					<h6 className="card-subtitle mb-2 text-muted">
						<span className="vl">|</span>
						<i class="fas fa-user" />
						{post.ownerName}
					</h6>
				</div>
				<hr />
				<p className="post-text">{post.text}</p>
			</div>
		);
	}
}
