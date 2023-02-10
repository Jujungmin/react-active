# useEffect()
- useEffect 함수는 컴포넌트가 렌더링 될 때마다 특정 작업을 실행할 수있도록 하는 Hook.
> useEffect(function, deps)
> - function : 수행하고자 하는 작업
> - deps : 배열형태, 배열 안에는 검사하고자 하는 특정값 or 빈 배열

<!-- ### 1. Component가 mount됐을 때(처음 나타났을 때) -->
- 배열을 생략하면 리렌더링 될 때마다 실행된다.
``` javascript
useEffect(() => {
	console.log('렌더링 될 때마다 실행');
});
```
### 1. 마운트 될 때만 실행하고 싶을 때
- 컴포넌트가 화면에 가장 처음 렌더링 될 때 한 번만 실행하고, 업데이트 할 경우 deps위치에 빈 배열을 넣는다.
``` javascript
useEffect(() => {
	console.log('마운트 될 때만 실행');
}, []);
```
### 2. 특정값이 업데이트 될 때만 실행하고 싶을 떄
- 특정값이 업데이트 될 때 실행하고 싶으면 deps배열안에 검사하고 싶은 값을 넣어준다.
- 업데이트 될 때만 실행하는 것이 아니라 마운트 될 때도 실행된다.
``` javascript
useEffect(() => {
	coonsole.log(name);
	console.log('업데이트 될 때 실행');
}, [name]);
```

### 3. Component가 unmount될 때(사라질 때) & update 되기 직전에
- `cleanup`함수 반환 (return뒤에 나오는 함수이며 useEffect에 대한 뒷정리 함수라고 한다.)
- 언마운트 될 때만 cleanup 함수를 실행하고 싶을 때 ==> 두 번째 파라미터에 빈 배열을 넣는다.
- 특정값이 업데이트되기 직전 cleanup 함수를 실행하고 싶을 때 ==> deps 배열 안에 검사하고 싶은 값을 넣어준다.
``` javascript
useEffect(() => {
	console.log('effect');
	console.log(name);
	return() => {
		console.log('cleanup');
		console.log(name);
	}
}, []);
```
### 4. deps에 특정값 넣기
1. 컴포넌트가 처음 마운트 될 때,
2. 지정한 값이 바뀔 때,
3. 언마운트 될 때,
4. 값이 바뀌기 직전에 모두 호출된다.

- useEffect 안에서 사용하는 상태나 props가 있다면, useEffect의 **deps에 넣어주어야 하는 것이 규칙**<br>만일 사용하는 값을 넣지 않으면 useEffect안의 함수가 실행 될 때 최신상태, props를 가리키지 않는다.
- deps 파라미터를 생략한다면 컴포넌트가 리렌더링 될 때마다 useEffect함수가 호출된다.


### Reference

[React Hooks: useEffect() 함수](https://xiubindev.tistory.com/100)
https://velog.io/@velopert/react-hooks

---


## useEffect를 사용하여 마운트/언마운트/업데이트시 할 작업 설정하기
- `useEffect`라는 Hook을 사용하여 컴포넌트가 마운트(처음 나타났을 때), 언마운트(사라질 때), 그리고 업데이트 될 때 (특정 props가 바뀔 때) 특정 작업을 처리하는 방법에 대해 알아보자.

## 마운트 / 언마운트
``` javascript
{/* UserList */}
import React, { useEffect } from 'react';

function Info({ user, onRemove, onToggle }) {
	useEffect(() => { // 마운트
		console.log('컴포넌트가 화면에 나타남');
		return () => { // 언마운트
			console.log('컴포넌트가 화면에 사라짐'); 
		}
	}, []);

	return (
		<div>
			<b
				style={{
					cursor: 'pointer',
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
- useEffect 구조
  - 함수이며 첫번째 인자는 함수, 두번째 인자는 배열(주로 `deps`라고 칭함)이 들어간다.

- cleanup 함수
  - useEffect 안에서 return 할 때 실행.
  - useEffect의 뒷정리를 해준다. --> state에서 값 지울 때 실행.

- deps
  - deps에 특정값을 넣게 되면, 컴퍼넌트가 마운트 될 때 지정한 값이 업데이트될 때 useEffect가 실행된다.

## deps에 특정값 넣기
- deps에 특정 값을 넣으면 컴포넌트가 처음 마운트 될 때 호출되고, 지정한 값이 바뀔 때에도 호출이 된다.
- deps안에 특정 값이 있다면 언마운트시에도 호출되고 값이 바뀌기 전에도 호출된다.

``` javascript
{/* UserList */}
import React, { useEffect } from react;

function Info({ user, onRemove, onToggle }) {
	useEffect(() => {
		console.log('user값이 설정됨');
		console.log(user);
		
		return() => {
			console.log('user가 바뀌기 전..');
			console.log(user);
		}
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

function userList({ list, onRemove, onToggle }) {
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

### Reference

https://xiubindev.tistory.com/100

https://3d-yeju.tistory.com/52

https://bgeun2.tistory.com/31