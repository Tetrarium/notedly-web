import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

// Импортируем компонент NoteForm
import NoteForm from "../components/NoteForm";

// Импортируем запрос GET_NOTE
import { GET_NOTE, GET_ME } from "../gql/query";
import { EDIT_NOTE } from "../gql/mutation";

const EditNote = props => {
	// Сохраняем id, полученный из url, в виде переменной
	const id = props.match.params.id;

	// Определяем запрос заметки
	const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

	// Получаем информацию о текущем пользователе
	const { loading: loadingUser, data: userdata } = useQuery(GET_ME);

	// Определяем мутацияю
	const [editNote, { loadingUpdate, errorUpdate }] = useMutation(EDIT_NOTE, {
		variables: {
			id
		},
		onCompleted: () => {
			console.log('complete');
			props.history.push(`/note/${id}`);
		},
		onError: (e) => {
			console.log(e.networkError.result.errors);
		}
	});

	// Если данные загружаются, выдаем сообщение о загрузке
	if (loading || loadingUser) return 'Loading...';

	// Если при получении данных произошел сбой, выдаем сообщение об ошибке
	if (error) return <p>Error! Note not found</p>

	if (loadingUpdate) return <p>Loading Update</p>
	{ console.log(errorUpdate) };

	// Если текущий пользователь не соответствует автору заметки,
	// возвращаем соответствующее сообщение
	if (userdata.me.id !== data.note.author.id) {
		return <p>You do not have access to edit this note</p>;
	}

	// В случае успеха передаем данные в компонент note
	return <NoteForm content={data.note.content} action={editNote} />;
};

export default EditNote;