import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { fetchShared } from '../actions/posts';
import Post from './post';

class Shared extends Component {
	constructor(props) {
		super(props);
		this.handleRefreshClick = this.handleRefreshClick.bind(this);
		this.state = {
			modalIsOpen: false
		};
		console.log(props);
		// this.showPostPage = this.showPostPage.bind(this);
	}

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(fetchShared());
	}

	handleRefreshClick(e) {
		e.preventDefault();

		const { dispatch } = this.props;
		dispatch(fetchShared());
	}

	showPostPage(post) {
		console.log(this.props);
		this.props.history.push({
			pathname: `/posts/${post._id}`,
			state: { post: post }
		});
	}

	renderRedirect = () => {
		if (!this.props.isAuthenticated) {
			return <Redirect to="/login" />;
		}
	};

	render() {
		const { sharedPosts } = this.props;
		return (
			<div>
				{this.renderRedirect()}
				<div className="container home">
					<div className="home-header">
						<h1>Shared Posts</h1>
					</div>
					<hr />
					<div className="row">
						{sharedPosts.map((post, index) => (
							<div className="col-sm-4">
								<Post
									post={post}
									onClick={this.showPostPage.bind(this, post)}
									shared={true}
									key={post.id}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}

Shared.propTypes = {
	sharedPosts: PropTypes.array.isRequired,
	isFetchingShared: PropTypes.bool.isRequired,
	fetchSharedSuccess: PropTypes.bool.isRequired,
	dispatch: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
	console.log(state);
	const { isFetchingShared, sharedPosts, fetchSharedSuccess } = state.posts;
	const { isAuthenticated } = state.auth;
	return {
		isFetchingShared,
		sharedPosts,
		fetchSharedSuccess,
		isAuthenticated
	};
}

export default connect(mapStateToProps)(Shared);
