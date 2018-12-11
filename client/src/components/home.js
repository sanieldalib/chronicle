import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { fetchPostsIfNeeded } from '../actions/posts';
import Post from './post';
import NewPost from './newPost';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
	content: {
		maxWidth: `720px`,
		maxHeigh: '80vh',
		margin: '0 auto',
		top: '40px',
		bottom: 'auto',
		right: '40px',
		left: '40px',
		overflowY: 'scroll'
	}
};

class Home extends Component {
	constructor(props) {
		super(props);
		this.handleRefreshClick = this.handleRefreshClick.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.openModal = this.openModal.bind(this);
		this.state = {
			modalIsOpen: false
		};
		console.log(props);
		// this.showPostPage = this.showPostPage.bind(this);
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

	closeModal() {
		this.setState({ modalIsOpen: false });
		const { dispatch } = this.props;
		dispatch(fetchPostsIfNeeded());
	}

	openModal() {
		this.setState({ modalIsOpen: true });
	}

	showPostPage(post) {
		// this.props.history.push(/posts:${post._id});
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
		const { items } = this.props;
		return (
			<div>
				{this.renderRedirect()}
				<div className="container home">
					<Modal isOpen={this.state.modalIsOpen} style={customStyles}>
						<a onClick={this.closeModal} className="close" />
						<NewPost close={this.closeModal} />
					</Modal>
					<div className="home-header">
						<h1>Your Posts</h1>
						<button onClick={this.openModal} className="btn btn-primary">
							Create New +
						</button>
					</div>
					<hr />
					<div className="row">
						{items.map((post, index) => (
							<div className="col-sm-4">
								<Post
									post={post}
									onClick={this.showPostPage.bind(this, post)}
									key={index}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}

Home.propTypes = {
	items: PropTypes.array.isRequired,
	isFetching: PropTypes.bool.isRequired,
	dispatch: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
	console.log(state);
	const { isFetching, lastUpdated, items } = state.posts || {
		isFetching: true,
		lastUpdated: Date.now(),
		items: []
	};
	const { isAuthenticated } = state.auth;
	return {
		items,
		isFetching,
		lastUpdated,
		isAuthenticated
	};
}

export default connect(mapStateToProps)(Home);
