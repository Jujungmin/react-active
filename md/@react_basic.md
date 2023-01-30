# React.js
- 자바스크립트를 기반으로 하는 페이스묵에서 만들어 배포하는 라이브러리이다.
- 컴포넌트의 상태값이 변경되면, UI를 자동 업데이트해준다.
  - state, props, redux store 등의 상태값이 변경되면, 리액트가 해당 컴포넌트 함수를 자동으로 재호출하여 재렌더링해준다.
- 이 때, 가상 DOM을 통해 변경된 부분의 UI만 효율적으로 업데이트한다.
## 1. React.js 주요특징
### 1-1. Virtual DOM
- 가상 DOM은 실제 DOM을 분석하여 만든 자바스크립트 객체이다.
- 컴포넌트의 상태값이 변경되면 새로운 가상 DOM 객체를 만들고, 이전 가상 DOM객체와 비교한다.
- 최종적으로 바뀐 부분이 있을 시에 해당 부분만 실제 DOM에 반영하여 UI를 업데이트한다.
### 1-2. Node.js 필요
- node.js 기반으로 한 노드패키지 관리도구 npm으로 리액트 프로젝트를 시작한다. 리액트는 라이브러리이기때문에 사용에 형식이 없어 마음대로 파일 구성을 할 수 있다.
### 1-3. 컴포넌트 사용
- 리액트의 매우 중요한 부분 중 하나로 렌더링할 때 사용되는 개념이다.<br/>컴포넌트의 뜻은 부품으로 여러 부품을 조합해 하나의 웹 사이트를 만들어 변경할 부분만을 선택해 해당 부분만 렌더링할 수 있도록 되어 있다.
## 2. 리액트 사용시 고려할 점
### 2-1. JSX
- JSX는 리액트에서 사용되는 언어로 자바스크립트 안에서 html태그로 작성된 것이 render함수를 거쳐 자바스크립트로 변경되는 코드를 말한다.
``` javascript
// 클래스형 컴포넌트
class Test extends Componet {
    render() {
        return (
            <div>
                <h1></h1>
                <p></p>
            </div>
        )
    }
}

// 함수형 컴포넌트
function Test() {
    return (
        <div>
            <h1></h1>
            <p></p>
        </div>
    )
}
```

## 3. React 중요 개념
### 3-1. Component
- 부품 개념으로 컴포넌트들이 App.js라는 화면에 실제 보여지는 컴포넌트가 모여 완성품이 된다.
``` javascript
// 1. 함수형 컴포넌트
import React from 'react';

function 컴포넌트명() {
    return (...)
}

// 2. 클래스형 컴포넌트
import React, { Component } from 'react';

class 컴포넌트명 extend Componet {
    render() {
        return (...)
    }
}
```
### 3-2. Property(props)
- 컴포넌트끼리 값을 전달하는 수단이다.
- 입력값을 바꾸려하지 않고 항상 동일한 입력값에 대해 동일한 결과를 반환해야 한다.
``` javascript
<div className="App">
    <Reset />
    <GetName name="Ann" /> {/* name="Ann"은 props이다. */}
    <div>Hello world!</div>
</div>
```
``` javascript
// 1. 함수형
function Func(props) {
    return <h1>Hello, {props.name}</h1>
}

// 2. 클래스형
class ClassFunc extend React.Componet {
    render() {
        return <h1>Hello, {this.props.name}</h1>
    }
}
```
- 부모 컴포넌트가 자식 컴포넌트에게 데이터를 전달하는 것을 말하며, 자식 컴포넌트는 여러개가 될 수 있다.
- 자식 컴포넌트가 부모 컴포넌트에게 콜백함수를 사용해 props를 전달할 수 있는데 전달하는 기능(함수)은 부모 컴포넌트에서 구현되어야 한다.
- 형제간의 컴포넌트는 전달할 수 없다.

``` javascript
// 1. 부모컴포넌트가 자식컴포넌트에 props 전달
const ParentCom = () => {
    return (
        <div>
            <strong>Parent Componet :</strong>
            <ChildCom name={'Child'} />
        </div>
    )
}

const ChildCom = (props) => {
    return (
        <>
            <span>{props.name} Component</span>
        </>
    )
}
```
### 3-3. state
- props와 다르게 컴포넌트간에 사용하기 보다는 **컴포넌트 안에서** 데이터를 빈번하게 수정할 때 사용한다.
- state는 현재 컴포넌트에서 값이 바뀔 수 있어 내부에서 선언되어 사용되는 변수처럼 **컴포넌트 내부에서 자유롭게 이용**할 수 있다.


## 4. React 불변성
- 리액트에서 불변성이란?
  - 원본의 데이터를 변경하지 않고 보존하는 코드
  - 원본을 복사하여 복사한 데이터를 조작해 작업이 끝나면 해당 데이터의 값을 원본데이터에 대입해주는 것을 말한다.

### 4-1. 불변성의 장점
- 원본데이터를 유지하면 원본의 값과 원본을 기반으로 새롭게 만든 데이터와 바로 비교가 가능해진다.

예시로 `arr = [1,2,3]`을 바로 직접 변경하여 `arr2 = arr.push(4)` 새로운 배열 생성.<br/>
`arr2 = [1,2,3,4]`가 되고 동시에 arr도 `[1,2,3,4]`가 되어 원본과 비교가 불가능해진다.<br/>
때문에 보통 리액트에서는 `arr = [1,2,3]`, `arr2 = [...arr, 4]`로 기존데이터를 복사해 새로운 배열로 재정의하여 원본을 유지하며 비교가 가능하다.
``` javascript
state = {
    a: 'A',
    b: 'B'
}
test = () => {
    let { a, b } = this.state;
    a = 'C';
    if(this.a === a) { // false반환됨. return console.log('같음')
        return console.log('다름');
    }
}
```


---
#### Reference
https://curryyou.tistory.com/484