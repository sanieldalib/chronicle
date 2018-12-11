import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextArea from 'react-autosize-textarea';
import ReactLoading from 'react-loading';
import { Redirect } from 'react-router';
import { writePost, resetNewPost, getLocation } from '../actions/posts';
import { connect } from 'react-redux';
import { geolocated } from 'react-geolocated';
import ImageUploader from 'react-images-upload';

class NewPost extends Component {
	constructor(props) {
		super(props);
		this.state = { pictures: [], isWritingPost: false };
		this.onDrop = this.onDrop.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(getLocation());
	}

	onDrop(picture) {
		this.setState({
			pictures: this.state.pictures.concat(picture)
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const newPost = {
			title: this.state.title,
			text: this.state.text,
			date: Date.now(),
			location: this.props.location
		};
		const { dispatch } = this.props;
		const { pictures } = this.state;
		dispatch(writePost(newPost, pictures));
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.isWritingPost) {
			this.setState({
				isWritingPost: true
			});
		}
	}

	handleInputChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	renderRedirect = () => {
		const { dispatch, isAuthenticated, success } = this.props;

		if (!isAuthenticated) {
			return <Redirect to="/login" />;
		}

		if (success) {
			this.props.close();
			dispatch(resetNewPost());
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
				{isWritingPost ? overlay : null}
				<form onSubmit={this.handleSubmit}>
					<input
						className="input newpost-title"
						placeholder="Title..."
						type="text"
						name="title"
						onChange={this.handleInputChange}
					/>
					<div className="location">
						<i class="fas fa-map-marker-alt" />
						{this.props.locSuccess
							? this.props.location.written
							: 'Getting your location...'}
					</div>
					<hr />
					<ImageUploader
						withIcon={true}
						buttonText="Choose images"
						onChange={this.onDrop}
						imgExtension={['.jpg', '.gif', '.png', '.gif']}
						maxFileSize={5242880}
						withPreview={true}
					/>
					<hr />
					<TextArea
						className="input newpost-text"
						placeholder="What are your thoughts?"
						rows={6}
						cols={60}
						name="text"
						onChange={this.handleInputChange}
					/>
				</form>
				<div className="newpost-bottom">
					<button
						onClick={this.handleSubmit}
						className="btn btn-primary newpost-btn"
					>
						Post!
					</button>
				</div>
			</div>
		);
	}
}

NewPost.propTypes = {
	dispatch: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	isWritingPost: PropTypes.bool.isRequired,
	isGettingLocation: PropTypes.bool.isRequired,
	locSuccess: PropTypes.bool.isRequired,
	location: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	const { isAuthenticated } = state.auth;
	const {
		isWritingPost,
		success,
		isGettingLocation,
		locSuccess,
		location
	} = state.posts;
	return {
		isAuthenticated,
		isWritingPost,
		success,
		isGettingLocation,
		locSuccess,
		location
	};
}

export default connect(mapStateToProps)(NewPost);
