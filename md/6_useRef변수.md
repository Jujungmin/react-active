# useRef로 컴포넌트 안의 변수만들기
- 컴포넌트에서 특정 DOM을 선택해야할 때 `ref`를 사용하며 함수형 컴포넌트에서 이를 설정할 떄 `useRef`를 사용해야 한다.
- `useRef` Hook은 DOM을 선택하기도 하지만, 컴포넌트 안에서 조회 및 수정할 수 있는 변수를 관리한다.
- `useRef`로 관리하는 변수는 값이 바뀐다고 컴포넌트가 다시 리렌더링되지 않는다. `useRef`로 관리하고 있는 변수는 설정 후 바로 조회가 가능하다.
- 이 변수를 사용하여 다음과 같은 값을 관리할 수 있다.
  - `setTimeout`, `setInterval`을 통해서 만들어진 `id`
  - 외부 라이브러리를 사용하여 생성된 인스턴스
  - scroll 위치

App 컴포넌트에서 `useRef`를 사용해 변수를 관리해보자. 용도는 배열에서 새 항목에서 사용할 고유 id를 관리하는 용도이다.
``` javascript
{/* CreateUser */}
import React from 'react';

function CreateUser({ username, email, onChange, onCreate }) {
	return (
		<div>
			<input
				name="username"
				placeholder="계정명"
				onChange={onChange}
				value={username}
			/>
			<input
				name="email"
				placeholer="이메일"
				onChange={onChange}
				value={email}
			/>
			<button onClick={onCreate}>등록</button>
		</div>
	)
}

export default CreateUser;
```
``` javascript
{/* UserList */}
import React from 'react';

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
			{list && list.map(mapuser => ( // list.map()만 넣을 경우 Error. 앞에 list 조건추가
				<Info user={mapuser} key={mapuser.id} />
			))}
		</div>
	)
}

export default UserList;
```

``` javascript
{/* App */}
import React, { useRef } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function App() {
	const [inputs, setInputs] = useState({
		name: '',
		email: ''
	});
	const { username, email } = inputs; // {name: '', email: ''}
	const onChange = e => {
		setInputs({
			...inputs,
			[name]: value
		});
	}
	const [users, setUsers] = useState([
		{
			id: 1,
			username: 'velopert',
			email: 'public.velopert@gmail.com'
		},
		{
			id: 2,
			username: 'tester',
			email: 'tester@example.com'
		},
		{
			id: 3,
			username: 'liz',
			email: 'liz@example.com'
		}
	]);

	const nextId = useRef(4);
	const onCreate() => () {
		const user = {
			id: nextId.current,
			username,
			email
		};
		setusers([...users, user]);

		setInputs([
			username: '',
			email: ''
		]);
		nextId.current += 1;
	}

	return (
		<>
			<CreateUser
				username={username}
				email={email}
				onChange={onChange}
				onCreate={onCreate}
			/>
			<UserList list={users} />
		</>
	)
}


export default App;
```
## 배열에 항목 추가하기
- 배열도 객체와 마찬가지로 기존의 값을 복사한 다음에 추가하거나 삭제해야 한다.

첫 번째, 배열에 새 항목을 추가하는 방법 중 `...spread 연산자`가 있다.
``` javascript
{/* App */}
import React, { useState, useRef } from 'react';
import UserList from './UserList';
import CreateUser from './Createuser';

function App() {
	const [inputs, setInputs] = useState([
		name: '',
		email: ''
	]);
	
	const { name, email } = inputs;

	const onChange = (e) => {
		const { name, value } = e.target;
		setInputs([
			...inputs,
			[name]: value
		]);
	};

	const [users, setUsers] = useState([
		{
			id: 1,
			username: 'velopert',
			email: 'public.velopert@gmail.com'
		},
		{
			id: 2,
			username: 'tester',
			email: 'tester@example.com'
		},
		{
			id: 3,
			username: 'liz',
			email: 'liz@example.com'
		}
	]);

	const nextId = useRef(4);

	const onCreate() = () => {
		const user = {
			id: nextId.current
			username,
			email
		};
		setUsers([...users, user]);

		setInputs([
			username: '',
			email: ''
		]);
		nextId.current += 1;
	}

	return (
		<>
			<CreateUser
				username={username}
				email={email}
				onChange={onChange}
				onCreate={onCreate}
			/>
			<UserList list={users} />
		</>
	)
}

export default App;
```

두 번째 방법, `concat`함수를 사용한다. `concat`함수는 기존의 배열을 수정하지 않고 추가된 새로운 배열을 만들어준다.
``` javascript
{/* App */}
import React, { useRef, useState } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function App() {
	const [inputs, setInputs] = useState([
		username: '',
		email: ''
	]);

	const { username, email } = inputs;
	
	const onChange = e => {
		const { name, value } = e.target;
		setInputs({
			...inputs,
			[name]: value
		});
	}


	const [users, setUsers] = useState([
		{
			id: 1,
			username: 'velopert',
			email: 'public.velopert@gmail.com'
		},
		{
			id: 2,
			username: 'tester',
			email: 'tester@example.com'
		},
		{
			id: 3,
			username: 'liz',
			email: 'liz@example.com'
		}
	]);
	
	const nextId = useRef(4);

	const onCreate = () => {
		const user = {
			id: nextId.current,
			username: username,
			email
		};
		setUsers(users.concat(user));

		setInputs({
			username: '',
			email: ''
		});
		nextId.current += 1;
	}

	return (
		<>
			<CreateUser
				username={username}
				email={email}
				onChange={onChange}
				onCreate={onCreate}
			/>
			<UserList list={users} />
		</>
	)
}

export default App;
```

## 배열에 항목 제거하기
- UserList에서 각 User 컴포넌트를 보여줄 때 삭제 버튼을 렌더링해보자.
``` javascript
{/* UserList */}
import React from 'react';

// Info() DOM 만들기
function Info({ user, onRemove }) {
	<div>
		<b>{user.username}</b> <span>({user.email})</span>
		<button onClick={() => onRemove(user.id)}>삭제</button>
		{/* 
			Q. onClick={() => onRemove(user.id)} 왜 onclick={onRemove(user.id)가 아닐까? 
			A.	보통 onClick={someFunc}으로 지정해 ()를 제외하는 방법으로 함수가 즉시 실행되지 않게 해준다.
				그런데 onRemove와 같은 경우, 해당 함수가 실행될 때 아이디 값도 받아와야 한다.
				onRemove={onRemove(user.id)}해버리면 해당 컴포넌트가 렌더링됨가 동시에 이 함수가 실행되어서
				아무것도 렌더링되지 않을 것이다.
				=> 이런 문제를 해결하기 위해 onClick에 콜백함수를 넣어주고 해당함수가 실행될 때 user.id를 건네주어
				실행시키는 방법으로 처리힌다.
		*/}
	</div>
};

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
``` 

## 배열에 항목 수정하기
User컴포넌트에 계정명 클릭시 색상이 빨강색으로 바뀌고 다시 누르면 검정색으로 바뀌도록 구현해보자.<br/>우선, App컴포넌트의 users배열안의 객체 안에 `active`라는 속성을 추가하자.
``` javascript
{/* App */}
import React, { useState, useRef } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function App() {
	const [inputs, setInputs] = useState({
		username: '',
		email: ''
	});

	const { username, email } = inputs;

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

	const onCreate = () => {
		 const user = {
			id: nextId.current,
			username,
			email
		 };
		setusers(users.concat(user));

		setInputs({
			username: '',
			email: ''
		});
		nextid.current += 1;
	};

	const onRemove = (id) => {
		// user.id가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열 만듬.
		// = user.id가 id인 것을 제거함.
		// console.log(id)
		setUsers(users.filter(user => user.id !== id));
	};

	const onToggle = id => {
		setUsers(
			users.map(mapuser => (
				// map사용할 때도 기존 배열 복사 한 후, id 값을 비교했을 때 id가 다르면 그대로두고, 같다면 active 값 반전. 
				mapuser.id === id ? {...mapuser, active: !mapuser.active} : mapuser
			))
		)
	};

	return (
		<>
			<CreateUser
				username={username}
				email={email}
				onChange={onChange}
				onCreate={onCreate}
			/>
			<UserList list={users} onRemove={onRemove} onToggle={onToggle} />
		</>
	)
}

export default App;
```

UserList 컴포넌트에서 방금 넣어준 `active`값에 따라 폰트 컬러를 바꿔보자.
``` javascript
{/* UserList */}
import React from 'react';

function Info({ user, onRemove, onToggle }) {
	return (
		<div>
			<b style={{
				cursor: 'poninter',
				color: user.active ? 'red' : 'black'
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

function UserList({ list, onRemove, onToggle }) {
	return (
		<div>
			{list && list.map(mapuser => (
				<Info user={mapuser} key={mapuser.id} onRemove={onRemove} onToggle={onToggle} />
			))}
		</div>
	)
}

export default UserList;
```