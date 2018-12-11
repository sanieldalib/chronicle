import axios from 'axios';
import {
	REQUEST_USER_POSTS,
	RECEIVE_USER_POSTS,
	ERROR_WRITING_POST,
	START_WRITE_POST,
	FINISHED_WRITE_POST
} from './types';

const requestPosts = () => {
	return {
		type: REQUEST_USER_POSTS
	};
};

const receivePosts = posts => {
	console.log(posts);
	return {
		type: RECEIVE_USER_POSTS,
		items: posts,
		receivedAt: Date.now()
	};
};

const fetchPosts = () => {
	return dispatch => {
		dispatch(requestPosts());

		return axios
			.get('/posts')
			.then(res => {
				const { posts } = res.data;
				console.log(posts);
				dispatch(receivePosts(posts));
			})
			.catch(err => {
				console.log('error');
			});
	};
};

const shouldFetchPosts = state => {
	if (!state.posts) {
		console.log('yo');
		return true;
	} else if (state.isFetching) {
		return false;
	} else {
		return true;
	}
};

const startWritePost = () => {
	return {
		type: START_WRITE_POST
	};
};

const finishWritingPost = () => {
	return {
		type: FINISHED_WRITE_POST
	};
};

export const writePost = post => {
	return dispatch => {
		dispatch(startWritePost());

		return axios
			.post('/posts/new', post)
			.then(res => {
				console.log(res);
				dispatch(finishWritingPost());
			})
			.catch(err =>
				dispatch({
					type: ERROR_WRITING_POST,
					payload: err
				})
			);
	};
};

export const fetchPostsIfNeeded = () => {
	return (dispatch, getState) => {
		console.log(getState());
		if (shouldFetchPosts(getState())) {
			return dispatch(fetchPosts());
		}
	};
};
