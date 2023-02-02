# useMemo 를 사용하여 연산한 값 재사용하기
- 함수형 컴포넌트 내부에서 발생하는 연산을 최적화할 수 있다.

```javascript
{/* App */}
import React, { useRef, useState } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

// countActiveUsers함수 => active값이 true인 사용자의 수를 세어 화면에 렌더링해보자.


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

	const onCreate = () => {}
	const onRemove = () => {}
	const onToggle = () => {}

	c
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