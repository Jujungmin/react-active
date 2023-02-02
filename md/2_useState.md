# useState를 통해 컴포넌트에서 바뀌는 값 관리하기
컴포넌트에서 동적인 화면을 보여줄 때 리액트 Hooks 중 하나인 useState를 사용한다.
``` javascript
{/* Counter */}
import React from 'react';

function Counter() {
    return (
        <h1>0</h1>
        <button>+1</button>
        <button>-1</button>
    );
}

export default Counter;
```
``` javascript
{/* App */}
import React from 'react';
import Counter from './Counter';

function App() {
    <Counter />
}

export default App;
```

``` javascript
{/* Counter */}
import React from 'react';

function Counter() {
    const onIncrease = () => {
        console.log('+1');
    }
    const onDecrease = () => {
        console.log('-1');
    }
    return (
        <div>
            <h1>0</h1>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
        </div>
    );
}

export default Counter;
```
리액트에서 엘리먼트에 이벤트를 설정해줄때에는 `on이벤트이름={실행하고싶은함수}` 형태로 설정해야 한다.<br/>
여기서 주의해야 할 점은 함수를 아래와 같이 실행하면 안된다.
> `onClick={ onIncrease() }`

위와 같이 하면 렌더링되는 시점에서 함수가 호출되버리기 때문이다. 이벤트 설정할 때에는 **함수타입의 값**을 넣어줘야 한다.

## 동적인 값 끼얹기, useState
- 컴포넌트에서 동적인 값을 상태(state)라고 부른다.
- 리액트에 `useState`라는 함수는 컴포넌트의 상태 관리할 수 있다.

``` javascript
{/* Counter */}
import React, { useState } from 'react';

function Counter() {
    const [number, setNumber] = useState(0);
    const onIncrease = () => {
        setNumber(number + 1);
    }
    const onDecrease = () => {
        setNumber(number - 1);
    }

    return (
        <div>
            <h1>{number}</h1>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
        </div>
    );
}

export default Counter;
```

이 코드는 리액트 패키지에서 `useState`라는 함수를 불러와준다.<br/>
`const [number, setNumber] = useState(0)`<br/>
`useState`를 사용할 때에는 **상태의 기본값을 파라미터로 넣어서 호출**해준다. 이 함수를 호출해주면 **배열이 반환**되는데,<br/>
첫 번째 원소는 현재 상태, 두 번째 원소는 *Setter함수이다.
> - Setter함수란?
> 
<br/>
원래는 다음과 같아야 한다.
``` javascript
const numberState = useState(0); // numberState 임의 상수.
const number = useState[0]; // 현재원소
const setNumber = useState[1]; // Setter함수
```
[useState참고](https://blog.logrocket.com/a-guide-to-usestate-in-react-ecb9952e406c/)
배열 비구조화 할당을 통하여 각 원소를 추출한 것이다.
``` javascript
const onIncrease = () => {
    setNumber(number + 1);
}
const onDecrease = () => {
    setNumber(number - 1);
}
```
Setter함수는 파라미터로 전달 받은 값을 최신 상태로 설정해준다.
```  javascript
<h1>{number}</h1>
```

## 함수형 업데이트
지금은 Setter함수를 사용 할 때, 업데이트 하고싶은 새로운 값을 파라미터로 넣어주고 있다.<br/>
그 대신 기존 값을 어떻게 업데이트 할 지에 대한 함수를 등록하는 방식으로도 값을 업데이트할 수 있다.
``` javascript
{/* Counter */}
import React, { useState } from 'react';

function Counter() {
    const [number, setNumber] = useState(0);

    const onIncrease = () => {
        setNumber(prevNumber => prevNumber + 1); // 이해안됨
    }
    const onDecrease = () => {
        setNumber(prevNumber => prevNumber - 1);
    }

    return (
        <div>
            <h1>{number}</h1>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
        </div>
    );
}

export default Counter;
```
`onIncrease`와 `onDecrease`에서 `setNumber`를 사용 할 때 그 다음 상태를 파라미터로 넣어준 것이 아니라, 값을 업데이트하는 함수를 파라미터로 넣어주었다.<br/>
함수형 업데이트는 컴포넌트를 최적화 하게 될 때 사용한다.
> 이해안되는 부분, 설명<br>
> `const [state, setState] = useState();`<br/>
> `setState`란 함수에 파라미터로 함수를 넘겨주면 이전 값을 넣어주는 걸로 개발이 됨. ==> 콜백함수의 이해가 필요하다.<br/>
> `(prevNumber => prevNumber + 1);`<br/>
> `prevNumber`는 임의로 정의한 함수이다. 파라미터명을 뭘로 쓰던 상관 없음. 이해하기 쉽게 `setState`내부를 쉽게 생각하면(실제로는 아님, 이해를 돕기위함.)
``` javascript
let previousValue = 0;
function setState(callback) {
    previousValue = callback(previousValue);
    // 여기서 callback이 prevNumber => prevNumber + 1 이라고 생각하면 쉽다.
}
```
https://blog.logrocket.com/a-guide-to-usestate-in-react-ecb9952e406c/


react 공식 문서 꼭 보기!!
https://ko.reactjs.org/docs/hooks-state.html#tip-what-do-square-brackets-mean