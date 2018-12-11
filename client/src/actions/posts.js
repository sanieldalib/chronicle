import axios from 'axios';
import {
	REQUEST_USER_POSTS,
	RECEIVE_USER_POSTS,
	ERROR_WRITING_POST,
	START_WRITE_POST,
	FINISHED_WRITE_POST,
	RESET_NEW_POST,
	GET_LOCATION,
	LOCATION_FAILED,
	GOT_LOCATION,
	SHARE_STARTED,
	SHARE_FINISHED,
	SHARE_FAILED
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
			.catch(err => {
				dispatch({
					type: ERROR_WRITING_POST,
					payload: err
				});
				console.log(err);
			});
	};
};

const startSharing = () => {
	return {
		type: SHARE_STARTED
	};
};

const finishSharing = shared => {
	return {
		type: SHARE_FINISHED,
		shared: shared
	};
};

export const sharePost = (email, id) => {
	console.log('u here');
	return dispatch => {
		dispatch(startSharing());

		return axios
			.post('/posts/share', { email: email, id: id })
			.then(res => {
				console.log(res.data.shared);
				dispatch(finishSharing(res.data.shared));
			})
			.catch(err => {
				console.log('error');
				dispatch({
					type: SHARE_FAILED
				});
			});
	};
};

export const resetNewPost = () => {
	return {
		type: RESET_NEW_POST
	};
};

export const getLocation = () => {
	return dispatch => {
		const geolocation = navigator.geolocation;
		geolocation.getCurrentPosition(position => {
			console.log(position.coords);

			if (!position) {
				dispatch({
					type: LOCATION_FAILED
				});
			} else {
				const config = {
					headers: { crossDomain: true, 'Content-Type': 'application/json' }
				};

				const { latitude, longitude } = position.coords;
				axios
					.get(
						`https://www.mapquestapi.com/geocoding/v1/reverse?key=F4S6QGn9CmAuopyaZ4vhiIIJgkIo1jJ8&location=${latitude}%2C${longitude}&outFormat=json&thumbMaps=false`,
						config
					)
					.then(res => {
						console.log(res);
						const { adminArea5, adminArea3 } = res.data.results[0].locations[0];
						const location = adminArea5 + ', ' + adminArea3;
						dispatch({
							type: GOT_LOCATION,
							latitude: latitude,
							longitude: longitude,
							location: location
						});
					});
			}
		});
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
