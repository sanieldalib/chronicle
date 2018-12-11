import React, { Component } from 'react';
import Moment from 'react-moment';
import { Router, Route } from 'react-router-dom';
import PostPage from './postPage';

export default class Post extends Component {
	constructor(props) {
		super(props);
		this.state = initialState;
	}

	render() {
		const { post } = this.props;
		const { shared } = this.props;
		const { location } = post;
		const displayPost =
			post.text.length > 140 ? post.text.substring(0, 140) + '...' : post.text;
		const locationInfo =
			location === {} ? (
				''
			) : (
				<div className="location">
					<h6 className="card-subtitle mb-2 text-muted">
						<i className="fas fa-map-marker-alt blue" />
						{location.written}
					</h6>
				</div>
			);
		const authorInfo = shared ? (
			<h6 className="card-subtitle mb-2 text-muted">
				<i class="fas fa-user blue" />
				{post.ownerName}
			</h6>
		) : (
			''
		);
		return (
			<div className="card post-card" onClick={this.props.onClick}>
				<div className="card-body">
					<h5 className="card-title">{post.title}</h5>
					{locationInfo}
					<h6 className="card-subtitle mb-2 text-muted">
						<i className="fas fa-clock blue" />
						<Moment fromNow ago>
							{post.date}
						</Moment>
						{' ago'}
					</h6>
					{authorInfo}
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
