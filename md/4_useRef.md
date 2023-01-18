# useRef로 특정 DOM 선택하기
- 리액트에서는 특정 DOM을 선택할 때 `ref`를 사용한다.<br/>함수형 컴포넌트에서 `ref`를 사용할 때에는 `useRef`라를 Hook함수를 사용한다.
<br/>
초기화 버튼 클릭했을 때 name input에 포커스가 잡히도록 `useRef`를 사용해 기능을 구현해보자.
``` javascript
import React, { useState, useRef } from 'react';

function InputSample() {
    const {inputs, setInputs} = useState({
        name: '',
        nickname: '',
    });

    const nameInput = useRef();

    const onChange = (e) => {
        const { name, value } = e.target; 
        setInputs({
            ...inputs,
            [name]: value
        })
    }
    const onReset = (e) => {
        setInputs({
            name: '',
            value: ''
        });
        nameInput.current.focus();
    }


    return (
        <div>
            <input placeholder="이름" name={name} value={name} onChange={onChange} ref={nameInput} />
            <input placeholder="닉네임" name={nickname} value={nickname} onChange={onChange} />
            <button onclick={onReset}>초기화</button>
            <div>
                <b>값: </b>
                {name} ({nickname})
            </div>
        </div>
    )
}

export default InputSample;
```
`useRef()`를 사용하여 Ref객체를 만들고, 이 객체를 우리가 선택하고 싶은 DOM에 `ref`값으로 설정해 주어야 한다. 그러면, `.current` 값은 우리가 원하는 DOM을 가리키게 된다.<br/>
`onReset`함수에서 input에 포커스를 하는 `focus()` DOM API를 호출해주었다.<br/>초기화 버튼을 클릭 시 name input에 포커스가 잡히게 된다.