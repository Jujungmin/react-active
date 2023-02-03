import React, { useRef, useState, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
// import CounterByClass from './CounterByClass';

function countActiveUsers(aa) {
	console.log('활성 사용자 수를 세는 중..');
	return aa.filter(user => user.active).length;
}

function App() {
	const [inputs, setInputs] = useState({
		username: '',
		email: ''
	});

	const { username, email } = inputs;

	// const onChange = e => {
	// 	const { name, value } = e.target; // input의 name과 value 값
	// 	setInputs({
	// 		...inputs,
	// 		[name]: value
	// 	});
	// 	console.log(name, value); // name은 각각 username, email 가리킨다.
	// };

	const onChange = useCallback(e => {
			const { name, value } = e.target;
			setInputs({
				...inputs,
				[name]: value
			});
		}, [inputs]);

	const [users, setUsers] = useState([
		{
			id: 1,
			username: 'velopert',
			email: 'public.velopert@gmail.com',
			active: true,
		},
		{
			id: 2,
			username: 'tester',
			email: 'tester@gmail.com',
			active: false,
		},
		{
			id: 3,
			username: 'liz',
			email: 'liz@example.com',
			active: false,
		}
	]);

	const nextId = useRef(4);

	// console.log(nextId);

	// const onCreate = () => {
	// 	const user = {
	// 		id: nextId.current,
	// 		username,
	// 		email
	// 	};
	// 	// setUsers([...users, user]); 기존에 있는 users복사 후 수정된 user를 setUsers에 넣기
	// 	setUsers(users.concat(user));

	// 	setInputs({
	// 		username: '',
	// 		email: ''
	// 	});
	// 	nextId.current += 1; // 추가 시 nextId 1씩 증가.
	// };

	const onCreate = useCallback(() => {
		const user = {
			id: nextId.current,
			username,
			email
		}
		setUsers(users.concat(user));

		setInputs({
			username: '',
			email: ''
		});
		nextId.current += 1;
	}, [users, username, email]);

	// const onRemove = (id) => {
	// 	// user.id가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬.
	// 	// = user.id가 id인 것을 제거함.
	// 	// console.log(id)
	// 	setUsers(users.filter(user => user.id !== id));
	// }

	const onRemove = useCallback((id) => {
		setUsers(users.filter(user => user.id !== id));
	}, [users]);

	// const onToggle = id => {
	// 	setUsers(
	// 		users.map(mapuser => (
	// 			// map사용할 때도 기존 배열 복사 한 후, id 값을 비교했을 때 id가 다르면 그대로두고, 같다면 active 값 반전. 
	// 			mapuser.id === id ? {...mapuser, active: !mapuser.active} : mapuser
	// 		))
	// 	)
	// }

	const onToggle = useCallback((id) => {
		setUsers(
			users.map((mapuser) => (
				mapuser.id === id ? { ...mapuser, active: !mapuser.active } : mapuser
			))
		)
	}, [users]);

	// input을 추가해서 user를 클릭해도 리렌더링되지 않는다. {count}만 업데이트
	const count = useMemo(() => countActiveUsers(users), [users]);
	// input을 추가하면 리렌더링된다. 
	// const count = countActiveUsers(users)

	return (
		<>
			<CreateUser
				username={username}
				email={email}
				onChange={onChange}
				onCreate={onCreate}
			/>
			<UserList list={users} onRemove={onRemove} onToggle={onToggle} />
			<div>활성사용자 수 : {count}</div>
		</>
	)
}

export default App;