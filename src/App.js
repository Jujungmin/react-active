import React, { useRef, useState } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
import CounterByClass from './CounterByClass';

function App() {
	const [inputs, setInputs] = useState({
		username: '',
		email: ''
	});
	const { username, email } = inputs; // 위의 빈 값들

	const onChange = e => {
		const { name, value } = e.target;
		setInputs({
			...inputs,
			[name]: value
		});
	};

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

	const onCreate = () => {
		const user = {
			id: nextId.current,
			username,
			email
		};
		// setUsers([...users, user]);
		setUsers(users.concat(user));

		setInputs({
			username: '',
			email: ''
		});
		nextId.current += 1; // 추가 시 nextId 1씩 증가.
	};

	const onRemove = (id) => {
		// user.id가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬.
		// = user.id가 id인 것을 제거함.
		// console.log(id)
		setUsers(users.filter(user => user.id !== id));
	}

	const onToggle = id => {
		setUsers(
			users.map(mapuser => (
				// map사용할 때도 기존 배열 복사 한 후, id 값을 비교했을 때 id가 다르면 그대로두고, 같다면 active 값 반전. 
				mapuser.id === id ? {...mapuser, active: !mapuser.active} : mapuser
			))
		)
	}
	return (
		<>
			<CreateUser
				username={username}
				email={email}
				onChange={onChange}
				onCreate={onCreate}
			/>
			<UserList list={users} onRemove={onRemove} onToggle={onToggle} />

			<CounterByClass />
		</>
	)
}

export default App;