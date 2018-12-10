import React, { Component } from 'react';
import { getPosts } from '../actions/posts';
import Post from './post';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = { posts: [] };
    this.props.store.dispatch(getPosts())
	}

	componentDidMount() {
		this.props.store.subscribe(
			function() {
				this.setState(this.props.store.getState());
			}.bind(this)
		);
	}

	render() {
		return (
			<div className="container home">
				<h1>Your Posts</h1>
				<hr />
				<div className="row">
					<div className="col-sm-4">
						<Post />
					</div>
					<div className="col-sm-4">
						<Post />
					</div>
					<div className="col-sm-4">
						<Post />
					</div>
				</div>
			</div>
		);
	}
}

const initialState = {
	posts: []
};
