import React, { useState , useRef } from 'react';

function InputSample() {
	const [inputs, setInputs] = useState({
		name: '',
		nickname: ''
	});

	const nameInput = useRef();

	const { name, nickname } = inputs;

	const onChange = (e) => {
		const { name, value } = e.target; // input의 name, value값 가져오기
		setInputs({
			...inputs,
			[name]: value
		});
	};

	const onReset = (e) => {
		setInputs({
			name: '',
			nickname: ''
		})
		nameInput.current.focus(); // 초기화클릭시 name input에 포커스
	}

	return (
		<div>
			<input name="name" placeholder="이름" onChange={onChange} value={name} ref={nameInput} />
			<input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname} />
			<button onClick={onReset}>초기화</button>
			<div>
				<strong>값: </strong>
				{name} ({nickname})
			</div>
		</div>
	)
}

export default InputSample;