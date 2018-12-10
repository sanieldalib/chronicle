import { REQUEST_USER_POSTS, RECEIVE_USER_POSTS } from '../actions/types';
import _ from 'lodash';

export default function posts(
	state = {
		isFetching: false,
		lastUpdated: Date.now(),
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
		default:
			return state;
	}
}
