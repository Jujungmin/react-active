# useEffect를 사용하여 마운트/언마운트/업데이트시 할 작업 설정하기
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

아래 url 다시보기! (useEffect)
https://xiubindev.tistory.com/100