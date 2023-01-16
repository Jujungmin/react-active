# iput 상태관리하기
- 리액트에서 사용자가 입력할 수있는 input태그의 상태를 관리하는 방법을 알아보자.
``` javascript
{/* InputSample */}
import React from 'react';

function InputSample() {
    return (
        <div>
            <input />
            <button>초기화</button>
            <div>
                <b>값: </b>
            </div>
        </div>
    );
}

export default InputSample;
```
``` javascript
{/* App */}
import React from 'react';
import InputSample from './InpustSample';

function App() {
    return (
        <InputSample />
    )
}

export default App;
```
input의 개수가 여러개일 경우, 단순히 `useState` 를 여러번 사용하고 `onChange`도 여러개 만들어서 구현할 수 있다.<br/>하지만 좋은 방법은 아니다. 더 좋은 방법은 input에 `name` 을 설정하고 이벤트가 발생했을 때 이 값을 참조하는 것이 좋다.<br/>그리고 `useState`에서는 문자열이 아니라 **객체 형태의 상태**를 관리해주어야 한다.
``` javascript
import React, { useState } from 'react';

function InputSample() {
    const [inputs, setInputs] = useState({
        name: '',
        nickname: ''
    });

    const onChange = (e) => {
        const { value, name } = e.target; // 우선 e.target에서 name과 value추출.
        setInputs({
            ...inputs, // 기존의 input 객체를 복사한 뒤
            [name]: value // name키를 가진 값을 value로 설정.
        }) 
    }

    const onReset = () => {
        setInputs({
            name: '',
            nickname: ''
        })
    }
    return (
        <div>
            <input name="name" placehloder="이름" onChange={onChange} value={name} />
            <input name="nickname" placehloder="닉네임" onChange={onChange} value={nickname} />
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값: </b>
                {name} ({nickname})
            </div>
        </div>
    );
}

export default InpustSample;
```

리액트 상태에서는 객체를 수정할 때,
`inputs[name] = value;` 로 수정하면 안된다. <br> 그 대신에, 새로운 객체를 만들어서 변화를 주고 이를 상태로 사용해주어야 한다.<br/>
``` javascript
setInputs({
    ...inputs, // ...spread문법 : 객체의 내용을 모두 "펼쳐서" 기존 객체를 복사.
    [name]: value
});
```
이러한 작업을 "불변성을 지킨다"라고 부른다. 불변성을 지켜주어야만 리액트 컴포넌트에서 상태가 업데이트 됐음을 감지하며 이에 따라 리렌더링이 진행된다.<br/>만약, `inputs[name] = value` 이런 식으로 기존상태를 직접 수정하게 되면, 값을 바꿔도 리렌더링이 되지 않는다.
> 정리!
> 리액트에서 객체를 업데이트하게 될 때에는 기존 겍체를 직접 수정하면 안되고,<br/>새로운 객체를 만들어서, 새 객체에 변화를 주어야 한다.
