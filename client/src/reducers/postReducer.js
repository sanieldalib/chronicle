import {
	REQUEST_USER_POSTS,
	RECEIVE_USER_POSTS,
	ERROR_WRITING_POST,
	START_WRITE_POST,
	FINISHED_WRITE_POST
} from '../actions/types';
import _ from 'lodash';

export default function posts(
	state = {
		isFetching: false,
		lastUpdated: Date.now(),
		isWritingPost: false,
		success: false,
		items: []
	},
	action
) {
	switch (action.type) {
		case REQUEST_USER_POSTS:
			return _.assign({}, state, {
				isFetching: true
			});
		case RECEIVE_USER_POSTS:
			console.log(action.items);
			return _.assign({}, state, {
				isFetching: false,
				items: action.items,
				lastUpdated: action.receivedAt
			});
		case ERROR_WRITING_POST:
			return _.assign({}, state, {
				isWritingPost: false,
				success: false
			});
		case START_WRITE_POST:
			return _.assign({}, state, {
				isWritingPost: true,
				success: false
			});
		case FINISHED_WRITE_POST:
			return _.assign({}, state, {
				isWritingPost: false,
				success: true
			});
		default:
			return state;
	}
}
