import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";

const Wrapper = styled.div`
	border: 1px solid #f5f4f0;
	max-width: 500px;
	padding: 1em;
	margin: 0 auto;
`;

const Form = styled.form`
	label,
	input {
		display: block;
		line-height: 2em;
	}

	input {
		width: 100%;
		margin-bottom: 1em;
	}
`;

// Добавляем props, передаваемый в компонент для дальнейшего использования
const UserForm = props => {
	// Устанавливаем состояние формы по умолчанию
	const [values, setValues] = useState();

	// Обновляем состояние при вводе пользователем данных
	const onChange = event => {
		setValues({
			...values,
			[event.target.name]: event.target.value
		});
	};


	// Отрисовываем форму
	return (
		<Wrapper>
			{/* Отображаем соответствующие заголовки формы */}
			{props.formType === 'signup' ? <h2>Sign Up</h2> : <h2>Sign In</h2>}

			{/* Выполняем мутацию, когда пользователь отправляет форму */}
			<Form
				onSubmit={event => {
					event.preventDefault();
					props.action({
						variables: {
							...values
						}
					});
				}}
			>
				{props.formType === 'signup' && (
					<React.Fragment>
						<label htmlFor="username">Username:</label>
						<input
							required
							type="text"
							id="username"
							name="username"
							placeholder="username"
							onChange={onChange}
						/>
					</React.Fragment>
				)}

				<label htmlFor="email">Email:</label>
				<input
					required
					type="email"
					id="email"
					name="email"
					placeholder="Email"
					onChange={onChange}
				/>
				<label htmlFor="password">Password:</label>
				<input
					required
					type="password"
					name="password"
					id="password"
					placeholder="Password"
					onChange={onChange}
				/>
				<Button type="submit">Submit</Button>
			</Form>
		</Wrapper>
	);
};

export default UserForm;