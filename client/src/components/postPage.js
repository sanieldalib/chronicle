import React, { Component } from 'react';
import Moment from 'react-moment';
import Modal from 'react-modal';
import Sharing from './sharing';

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

export default class PostPage extends Component {
	constructor(props) {
		super(props);
		this.closeModal = this.closeModal.bind(this);
		this.openModal = this.openModal.bind(this);
		this.state = {
			modalIsOpen: false
		};
	}

	closeModal() {
		this.setState({ modalIsOpen: false });
	}

	openModal() {
		this.setState({ modalIsOpen: true });
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
			<div>
				<Modal isOpen={this.state.modalIsOpen} style={customStyles}>
					<a onClick={this.closeModal} className="close" />
					<Sharing close={this.closeModal} post={post} />
				</Modal>
				<div>
					<div className="row">
						<div className="col-sm-8">
							<h1 className="title">{post.title}</h1>
						</div>
						<div className="col-sm-4 share-button">
							<button
								onClick={this.openModal}
								className="btn btn-primary share"
							>
								Share <i className="fas fa-share" />
							</button>
						</div>
					</div>
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
