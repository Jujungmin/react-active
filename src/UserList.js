import React from 'react';

// function Info(props) {
// 	return (
// 		<div>
// 			<b>{props.user.username}</b> <span>({props.user.email})</span>
// 		</div>
// 	)
// }

function Info({ user }) {
	return (
		<div>
			<b>{user.username}</b> <span>({user.email})</span>
		</div>
	)
}

function UserList({ list }) {
	return (
		<div>
			{list && list.map(mapuser => (
				<Info user={mapuser} key={mapuser.id} />
			))}
		</div>
	)
}

export default UserList;