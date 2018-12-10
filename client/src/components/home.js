import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPostsIfNeeded } from '../actions/posts';
import Post from './post';

class Home extends Component {
	constructor(props) {
		super(props);
		this.handleRefreshClick = this.handleRefreshClick.bind(this);
	}

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(fetchPostsIfNeeded());
	}

	handleRefreshClick(e) {
		e.preventDefault();

		const { dispatch } = this.props;
		dispatch(fetchPostsIfNeeded());
	}

	render() {
		const { items } = this.props;
		return (
			<div className="container home">
				<div className="home-header">
					<h1>Your Posts</h1>
					<a href="/" className="btn btn-primary">
						Create New +
					</a>
				</div>
				<hr />
				<div className="row">
					{items.map((post, index) => (
						<div className="col-sm-4">
							<Post post={post} key={index} />
						</div>
					))}
				</div>
			</div>
		);
	}
}

Home.propTypes = {
	items: PropTypes.array.isRequired,
	isFetching: PropTypes.bool.isRequired,
	dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
	console.log(state);
	const { isFetching, lastUpdated, items } = state.posts || {
		isFetching: true,
		lastUpdated: Date.now(),
		items: []
	};
	return {
		items,
		isFetching,
		lastUpdated
	};
}

export default connect(mapStateToProps)(Home);
