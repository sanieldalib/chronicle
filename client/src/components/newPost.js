import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import TextArea from 'react-autosize-textarea';
import ImageUploader from 'react-images-upload';
import ReactLoading from 'react-loading';
import { Redirect } from 'react-router';
import { writePost } from '../actions/posts';
import { connect } from 'react-redux';

class NewPost extends Component {
	constructor(props) {
		super(props);
		this.state = { pictures: [], isWritingPost: false };
		this.onDrop = this.onDrop.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	onDrop(picture) {
		this.setState({
			pictures: this.state.pictures.push(picture)
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const newPost = {
			title: this.state.title,
			text: this.state.text,
			date: Date.now()
		};
		const { dispatch } = this.props;
		dispatch(writePost(newPost));
	}

	componentWillReceiveProps(nextProps) {
		console.log('new props');
		console.log(nextProps);
		if (nextProps.isWritingPost) {
			this.setState({
				isWritingPost: true
			});
			return;
		}
	}

	handleInputChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	renderRedirect = () => {
		console.log('redirect calle');
		if (!this.props.isAuthenticated) {
			return <Redirect to="/login" />;
		}

		if (this.props.success) {
			console.log('yo');
			this.props.close();
			return <Redirect to="/" />;
		}
	};

	render() {
		const overlay = (
			<div className="loading">
				<ReactLoading className="indicator" type={'cylon'} color={'#000'} />
			</div>
		);
		const { isWritingPost } = this.state.isWritingPost;
		return (
			<div className="newpost">
				{this.renderRedirect()}
				{isWritingPost ? overlay : ''}
				<form onSubmit={this.handleSubmit}>
					<input
						className="input newpost-title"
						placeholder="Title..."
						type="text"
						name="title"
						onChange={this.handleInputChange}
					/>
					<TextArea
						className="input newpost-text"
						placeholder="What are your thoughts?"
						rows={6}
						cols={60}
						name="text"
						onChange={this.handleInputChange}
					/>
					<button type="submit" className="btn btn-primary">
						Post!
					</button>
				</form>
			</div>
		);
	}
}

NewPost.propTypes = {
	dispatch: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	isWritingPost: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
	const { isAuthenticated } = state.auth;
	const { isWritingPost, success } = state.posts;
	return {
		isAuthenticated,
		isWritingPost,
		success
	};
}

export default connect(mapStateToProps)(NewPost);
