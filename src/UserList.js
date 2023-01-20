import React from 'react';

// function Info(props) {
// 	return (
// 		<div>
// 			<b>{props.user.username}</b> <span>({props.user.email})</span>
// 		</div>
// 	)
// }

// Info() DOM 만들기
function Info({ user, onRemove }) {
	return (
		<div>
			<b>{user.username}</b> <span>({user.email})</span>
			<button onClick={() => onRemove(user.id)}>삭제</button>
			{/* 
			Q. onClick={() => onRemove(user.id)} 왜 onclick={onRemove(user.id)가 아닐까? 
			A.	보통 onClick={someFunc}으로 지정해 ()를 제외하는 방법으로 함수가 즉시 실행되지 않게 해준다.
				그런데 onRemove와 같은 경우, 해당 함수가 실행될 때 아이디 값도 받아와야 한다.
				onRemove={onRemove(user.id)}해버리면 해당 컴포넌트가 렌더링됨가 동시에 이 함수가 실행되어서 아무것도 렌더링되지 않을 것이다.
				=> 이런 문제를 해결하기 위해 onClick에 콜백함수를 넣어주고 해당함수가 실행될 때 user.id를 건네주어 실행시키는 방법으로 처리힌다.
			} */}
		</div>
	)
}

// UserList() DOM 뿌리기
function UserList({ list, onRemove }) {
	return (
		<div>
			{list && list.map(mapuser => (
				<Info user={mapuser} key={mapuser.id} onRemove={onRemove} />
			))}
		</div>
	)
}

export default UserList;