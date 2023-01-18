# props 를 통해 컴포넌트에게 값 전달하기
- props는 properties의 줄임말.
- 우리가 어떠한 값을 컴포넌트에게 전달해줘야 할 때 props 를 사용한다.

## props의 기본 사용방법
App컴포넌트에서 Hello컴포넌트를 사용하며 `name`값을 전달해주고 싶다고 가정.
``` javascript
{/* app */}
import React from 'react';
import Hello from './Hello';

function App() {
    return (
        <Hello name="react" color="red" />
    );
}
export default App;
```
``` javascript
{/* Hello */}
import React from 'react';

function Hello(props) {
    return <div style={{ color: props.color }}>안녕하세요 {props.name}</div> {/* 밖의 {} jsx문법, 안의 {}는 객체리터럴  */}
}

export default Hello;
```
props내부의 값을 조회할 때마다 `props.`를 입력하고 있는데 이는 함수의 파라미터에서 비구조화 할당(혹은 구조분해)문법을 사용해 좀 더 간결하게 작성할 수 있다.
``` javascript
{/* Hello */}
import React from 'react';

function Hello({color, name}) {
    return <div style={{ color }}>안녕하세요 {name}</div>
}

export default Hello;
```

## defaultProps 로 기본값 설정
컴포넌트에 props를 지정하지 않았을 떄 기본적으로 사용할 값 지정하고 싶다면 컴포넌트에 `defaultProps` 라는 값 설정한다.
``` javascript
{/* App */}
import React from 'react';
import Hello from './Hello';

function App() {
    return (
        <>
            <Hello name="react" color="red" />
            <Hello color="pink" />
        </>
    )
}
```
``` javascript
{/* Hello */}
import React from 'react';

function Hello({color, name}) {
    return <div style={{ color }}>안녕하세요 {name}</div>
}
Hello.defaultProps = {
    name: '이름없음'
}

export default Hello;
```

## props.children
컴포넌트 태그 사이에 넣은 값을 조회하고 싶을 땐, `props.children` 을 조회한다.
``` javascript
{/* Wrapper */}
import React from 'react';

function Wrapper() {
    const style = {
        border: '2px solid black',
        padding: '16px'
    };
    return (
        <div style={style}></div>
    )
    
}
export default Wrapper;
```
``` javascript
{/* App */}
import React from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';

function App() {
    return (
        <Wrapper>
            <Hello name="react" color="red" />
            <Hello color="pink" />
        </Wrapper>
    )
}

export default App;
```
화면에 Hello가 보이지 않을 것이다.<br/>
내부의 내용이 보여지게 하기 위해서는 Wrapper에서 `props.children`을 렌더링 해줘야 한다.
``` javascript
{/* Wrapper */}
import React from 'react';

function Wrapper({children}) {
    const style = {
        border: '2px solid black',
        padding: '16px'
    };
    
    return (
        <div style={style}>
            {children}
        </div>
    )
}

export default Wrapper;
```

# 조건부 렌더링
- 특정 조건에 따라 다른 결과물을 렌더링하는 것을 의미.
``` javascript
{/* App */}
import React from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';

function App() {
    <Wrapper>
        <Hello name="react" color="red" isSpecial={true} />
    </Wrapper>
}

export default App;
```
여기서 `true`는 자바스크립트 값이므로 중괄호로 감싼다.<br/>
Hello 컴포넌트에서 isSpecial이 `true`이냐 `false` 이냐에 따라서 컴포넌트 좌측에 `*`표시를 나타내보자.
``` javascript
{/* Hello */}
import React from 'react';

function Hello({name, color, isSpecial}) {
    return (
        <div color={{ color }}>
            { isSpecial ? <b>*</b> : null }
            안녕하세요 {name}
        </div>
    )
}

Hello.defaultProps = {
    name: '이름없음'
}

export default Hello;
```
> JSX에서 `null`, `false`, `undefined`를 렌더링하게 되면 아무것도 나타나지 않는다.

보통 삼항연산자는 특정 조건에 따라 보여줘야 하는 내용이 다를 때 사용한다.<br/>더 간단히 처리할 수 있다.
``` javacript
{ isSepcial && <b>*</b> }
```
### props 값 설정을 생략하면 ={true}
- 컴포넌트의 props 값을 설정하게 될 때 만약 props이름만 작성하고 값 설정을 생략한다면, 이를 `true`로 설정한 것으로 간주한다.
``` javascript
{/* Hello */}
import React from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';

function App() {
    <Wrapper>
        <Hello name="react" color="red" isSpecial /> {/* isSpecial={true} */}
    </Wrapper>
}

export default App;
```