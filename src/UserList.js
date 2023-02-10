import React from 'react';


const Info = React.memo(function User({ user, onRemove, onToggle }) {
	return (
		<div>
			<b style={{
				cursor: 'pointer',
				color: user.active ? 'red' : 'black',
			}}
			onClick={() => onToggle(user.username)}
			>
				{user.username}
			</b>
			&nbsp;
			<span>({user.email})</span>
			<button onClick={() => onRemove(user.id)}>삭제</button>
		</div>
	)
});

// UserList() DOM 뿌리기
function UserList({ list, onRemove, onToggle }) {
	return (
		<div>
			{list.map(mapuser => {
				return <Info user={mapuser} key={mapuser.id} onRemove={onRemove} onToggle={onToggle} />
			})}
		</div>
	)
}

export default UserList;