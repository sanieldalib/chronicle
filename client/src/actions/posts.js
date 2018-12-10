import axios from 'axios';
import { GET_USER_POSTS, GET_ERRORS } from './types';

export const getPosts = () => dispatch => {
	axios
		.get('/posts')
		.then(res => {
			const posts = res.data;
			return {
				type: GET_USER_POSTS,
				posts: posts
			};
		})
		.catch(err => {
			return {
				type: GET_ERRORS
			};
		});
};

export const test = () => {
  console.log('test');
}
