import React, { Component } from 'react';
import Moment from 'react-moment';
import Modal from 'react-modal';
import Sharing from './sharing';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import GallerySwiper from 'react-gallery-swiper';

Modal.setAppElement('#root');

const customStyles = {
	content: {
		maxWidth: `720px`,
		margin: '0 auto',
		top: '33%',
		bottom: 'auto',
		right: '40px',
		left: '40px'
	}
};

class PostPage extends Component {
	constructor(props) {
		super(props);
		this.closeModal = this.closeModal.bind(this);
		this.openModal = this.openModal.bind(this);
		this.state = {
			modalIsOpen: false,
			post: this.props.history.location.state.post
		};
	}

	closeModal() {
		this.setState({ modalIsOpen: false });
	}

	openModal() {
		this.setState({ modalIsOpen: true });
	}

	updateShared = shared => {
		const post = this.state.post;
		post.shared = shared;
		this.setState({ post: post });
	};

	renderRedirect = () => {
		if (!this.props.isAuthenticated) {
			return <Redirect to="/login" />;
		}

		const { shared } = this.state.post;
		const { owner } = this.state.post;

		if (
			owner != this.props.user.id &&
			!shared.includes(this.props.user.email)
		) {
			return <Redirect to="/" />;
		}
	};

	render() {
		const { post } = this.state;

		const images = [];
		post.images.map((img, i) => {
			images.push({ original: img, thumbnail: img });
		});

		const locationInfo =
			post.location === {} ? (
				''
			) : (
				<div className="location">
					<h6 className="card-subtitle mb-2 text-muted">
						<i className="fas fa-map-marker-alt" />
						{post.location.written}
					</h6>
				</div>
			);

		const modal =
			post.owner === this.props.user.id ? (
				<Modal isOpen={this.state.modalIsOpen} style={customStyles}>
					<a onClick={this.closeModal} className="close" />
					<Sharing
						close={this.closeModal}
						update={this.updateShared}
						post={post}
					/>
				</Modal>
			) : (
				''
			);

		const gallery =
			post.images.length === 0 ? (
				''
			) : (
				<div
					id="carouselExampleControls"
					className="carousel slide"
					data-ride="carousel"
				>
					<div className="carousel-inner">
						{post.images.map((img, index) =>
							index === 0 ? (
								<div className="carousel-item active">
									<img className="d-block w-100" src={img} alt="First slide" />
								</div>
							) : (
								<div className="carousel-item">
									<img className="d-block w-100" src={img} alt="Second slide" />
								</div>
							)
						)}
					</div>
					<a
						className="carousel-control-prev"
						href="#carouselExampleControls"
						role="button"
						data-slide="prev"
					>
						<span className="carousel-control-prev-icon" aria-hidden="true" />
						<span className="sr-only">Previous</span>
					</a>
					<a
						className="carousel-control-next"
						href="#carouselExampleControls"
						role="button"
						data-slide="next"
					>
						<span className="carousel-control-next-icon" aria-hidden="true" />
						<span className="sr-only">Next</span>
					</a>
				</div>
			);

		const button =
			post.owner === this.props.user.id ? (
				<button onClick={this.openModal} className="btn btn-primary share">
					Share <i className="fas fa-share" />
				</button>
			) : (
				''
			);

		return (
			<div>
				{this.renderRedirect()}
				{modal}
				<div>
					<div className="row">
						<div className="col-sm-8">
							<h1 className="title">{post.title}</h1>
						</div>
						<div className="col-sm-4 share-button">{button}</div>
					</div>
				</div>
				<div className="date-location">
					{locationInfo}
					<h6 className="card-subtitle mb-2 text-muted">
						<span className="vl">|</span>
						<i className="fas fa-clock" />
						<Moment fromNow ago>
							{post.date}
						</Moment>
						{' ago'}
					</h6>
					<h6 className="card-subtitle mb-2 text-muted">
						<span className="vl">|</span>
						<i className="fas fa-user" />
						{post.ownerName}
					</h6>
				</div>
				<hr />
				{gallery}
				<React.Fragment>
					<hr />
				</React.Fragment>
				<p className="post-text">{post.text}</p>
			</div>
		);
	}
}

PostPage.propTypes = {
	user: PropTypes.object.isRequired,
	isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
	const { user, isAuthenticated } = state.auth;
	return {
		user,
		isAuthenticated
	};
}

export default connect(mapStateToProps)(PostPage);
