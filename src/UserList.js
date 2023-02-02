import React, { useEffect } from 'react';

// function Info(props) {
// 	return (
// 		<div> 
// 			<b>{props.user.username}</b> <span>({props.user.email})</span>
// 		</div>
// 	)
// }

// Info() DOM 만들기
function Info({ user, onRemove, onToggle }) {
	useEffect(() => {
		// console.log('user값이 설정됨');
		// console.log(user);
		
		// return() => {
		// 	console.log('user가 바뀌기 전..');
		// 	console.log(user);
		// }
	}, [user]);
	return (
		<div>
			<b style={{
				cursor: 'pointer',
				color: user.active ? 'red' : 'black',
			}}
			onClick={() => onToggle(user.id)}
			>
				{user.username}
			</b>
			&nbsp;
			<span>({user.email})</span>
			<button onClick={() => onRemove(user.id)}>삭제</button>
		</div>
	)
}

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