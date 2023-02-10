# useMemo 를 사용하여 연산한 값 재사용하기
- 함수형 컴포넌트 내부에서 발생하는 연산을 최적화할 수 있다.
- countActiveUsers함수를 만들어 active값이 true인 사용자의 수를 세어 화면에 렌더링해보자.

```javascript
{/* App */}
import React, { useRef, useState } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countAcitveUsers(users) {
	return users.filter(user => user.active).length;
}

function App() {
	const [inputs, setInputs] = useState({
		username: '',
		email: ''
	});

	const { username, email } = inputs;

	const onChange = e = > {
		const { name, value } = e.target;
		setInputs({
			...inputs,
			[name]: value
		})
	}

	const [users, setUsers] = useState([
		{
			id: 1,
			username: 'velopert',
			email: 'public.velopert@gmail.com',
			active: true
		},
		{
			id: 2,
			username: 'tester',
			email: 'tester@example.com',
			active: false
		},
		{
			id: 3,
			username: 'liz',
			email: 'liz@example.com',
			active: false
		}
	]);

	const nextId = useRef(4);

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
		nextId.current += 1;
	}

	const onRemove = (id) => {
		setUsers(users.filter(user => user.id !== id))
	}

	const onToggle = (id) => {
		setUsers(user.map(mapuser => (
			mapuser.id === id ? {...mapuser, active: !mapuser.active} : mapuser
		)))
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
			<div>활성사용자 수 : </div>
		</>
	)
}


export default App;
```