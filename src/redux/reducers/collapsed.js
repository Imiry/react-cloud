import { TOGGL_ECOLLPSE } from '../containers'

const State = {
	collapsed: JSON.parse(sessionStorage.getItem('collapsed')) || false,
}
export default function simoReducer(preState=State,action) {
	const {type,data} = action
	switch (type) {
		case TOGGL_ECOLLPSE: 	
			State.collapsed = data
			sessionStorage.setItem('collapsed', State.collapsed)
			return State.collapsed
		default:
			return preState.collapsed
	}
}