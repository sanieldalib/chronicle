import { GET_USER_POSTS } from '../actions/types';
import _ from 'lodash';

export default function postReducer(state = [], action) {
	switch (action.type) {
		case GET_USER_POSTS:
    console.log(action.posts);
			return _.assign({}, state, { posts: action.posts });
		default:
			return state;
	}
}
