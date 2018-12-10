import axios from 'axios';
import { REQUEST_USER_POSTS, RECEIVE_USER_POSTS } from './types';

// export const getPosts = () => dispatch => {
// 	axios
// 		.get('/posts')
// 		.then(res => {
// 			const posts = res.data;
// 			return {
// 				type: GET_USER_POSTS,
// 				posts: posts
// 			};
// 		})
// 		.catch(err => {
// 			return {
// 				type: GET_ERRORS
// 			};
// 		});
// };
//
// export const test = () => {
//   console.log('test');
// }

function requestPosts() {
	return {
		type: REQUEST_USER_POSTS
	};
}

function receivePosts(posts) {
	console.log(posts);
	return {
		type: RECEIVE_USER_POSTS,
		items: posts,
		receivedAt: Date.now()
	};
}

function fetchPosts() {
	return dispatch => {
		dispatch(requestPosts());
		const token = localStorage.getItem('jwtToken') || null;
		console.log(token);
		const config = {
			headers: { Authorization: token }
		};

		return axios
			.get('/posts', config)
			.then(res => {
				const { posts } = res.data;
				console.log(posts);
				dispatch(receivePosts(posts));
			})
			.catch(err => {
				console.log('error');
			});
	};
}

function shouldFetchPosts(state) {
	if (!state.posts) {
		console.log('yo');
		return true;
	} else if (state.isFetching) {
		return false;
	} else {
		return true;
	}
}

export function fetchPostsIfNeeded() {
	return (dispatch, getState) => {
		console.log(getState());
		if (shouldFetchPosts(getState())) {
			return dispatch(fetchPosts());
		}
	};
}
