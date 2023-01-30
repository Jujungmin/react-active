import React, { Component } from 'react';

class CounterByClass extends Component {
    // 방법1 :: 생성자 constructor 외부에서 state 선언하기
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         count: 0,
    //         otherNumber: 404,
    //     }       
    // }

    // 방법2
    state = {
        count: 0,
        otherNumber: 404,
    }
    
    render() {
        const { count, otherNumber } = this.state;
        
        return (
            <div>
                <h1>{count}</h1>
                <p>state에 여러 값이 올 수도 있습니다: {otherNumber}</p>
                {/* 방법1 */}
                {/* <button onClick={() => this.setState({count: count + 1}) }> + </button> */}
                
                {/* 방법2 :: this.state에 함수를 인자로 전달하기 */}
                {/* <button onClick={() => {
                    this.setState(preState => ({
                        count: preState.count + 1
                    }))
                }}> + </button> */}
                
                {/* 방법3 :: setState의 두번째 인자로 콜백함수 전달하기 */}
                <button onClick={() => {
                    this.setState({
                        count: count + 1
                    }, () => { // 두번째 인자로 전달한 콜백함수
                        console.log('count: ', count);
                    })
                }}> + </button>
            </div>
        )
    }


}

export default CounterByClass;

// 참고
// https://bamtory29.tistory.com/entry/State-state%EC%9D%98-%EC%86%8C%EA%B0%9C%EC%99%80-%ED%81%B4%EB%9E%98%EC%8A%A4%ED%98%95-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%9D%98-state