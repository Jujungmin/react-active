import React, { useRef, useState, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
// import CounterByClass from './CounterByClass';

function countActiveUsers(users) {
	console.log('활성 사용자 수를 세는 중..');
	return users.filter(user => user.active).length;
}

function App() {
	const [inputs, setInputs] = useState({
		username: '',
		email: ''
	});

	const { username, email } = inputs;

	const onChange = useCallback(e => {
			const { name, value } = e.target;
			setInputs(inputs => ({
				...inputs,
				[name]: value
			}));
		}, []);

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

	const onCreate = useCallback(() => {
		const user = {
			id: nextId.current,
			username,
			email
		}

		// setUsers([...users, user]);
		setUsers(users.concat(user));

		// "등록"버튼 클릭 후 빈 값 출력
		setInputs({
			username: '',
			email: '',
		});
		nextId.current += 1;
	}, [users, username, email]);


	const onRemove = useCallback((id) => {
		setUsers(users =>
			users.filter(user => user.id !== id
			)
		);
	}, []);

	const onToggle = useCallback((id) => {
		setUsers(users =>
			users.map((mapuser) => (
				mapuser.id === id ? { ...mapuser, active: !mapuser.active } : mapuser
				))
				)
	}, []);


	// input을 추가해서 user를 클릭해도 리렌더링되지 않는다. {count}만 업데이트
	const count = useMemo(() => countActiveUsers(users), [users]);

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