import React from 'react';

// function CreateUser({ username, email, onChange, onCreate }) {
//     return (
//         <div>
//             <input 
//                 name="username"
//                 placeholder="계정명"
//                 onChange={onChange}
//                 value={username}
//             />
//             <input
//                 name="email"
//                 placeholder="이메일"
//                 onChange={onChange}
//                 value={email}
//             />
//             <button onClick={onCreate}>등록</button>
//         </div>
//     )
// }

// 비구조화할당화 말고 props로 값 전달.
function CreateUser(props) {
    return (
        <div>
            <input
                name="username"
                placeholder="계정명"
                onChange={props.onChange}
                value={props.username}
            />
            <input
                name="email"
                placeholder="이메일"
                onChange={props.onChange}
                value={props.email}
            />

           <button onClick={props.onCreate}>등록</button>
        </div>
    )
}

export default CreateUser;
