import React from "react";
import { useMutation } from "@apollo/client";

import ButtonAsLink from "./ButtonAsLink";
import { useState } from "react";

import { TOGGLE_FAVORITE } from "../gql/mutation";
import { GET_MY_FAVORITES } from "../gql/query";

const FavoriteNote = props => {
	// Сохраняем число избранных заметок пользователя как состояние
	const [count, setCount] = useState(props.favoriteCount);

	// Если пользователь отметил заметку как избранную,
	// сохраняем это как состояние
	const [favorited, setFavorited] = useState(
		// Проверяем, присутствует ли заметка в списке избранных
		props.me.favorites.filter(note => note.id === props.noteId).length > 0
	);

	// Хук мутации toggleFavorite
	const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
		variables: {
			id: props.noteId
		},
		// Повторно получаем запрос GET_MY_FAVORITES
		refetchQueries: [{ query: GET_MY_FAVORITES }]
	});

	// Если пользователь добавил заметку в избранное,
	// отображаем вариант кк удаления из списка.
	// В противном случае отображаем вариант ее удаления

	return (
		<React.Fragment>
			{favorited ? (
				<ButtonAsLink
					onClick={() => {
						toggleFavorite();
						setFavorited(false);
						setCount(count - 1);
					}}
				>
					Remove Favorite
				</ButtonAsLink>
			) : (
				<ButtonAsLink
					onClick={() => {
						toggleFavorite();
						setFavorited(true);
						setCount(count + 1);
					}}
				>
					Add Favorite
				</ButtonAsLink>
			)}
			: {count}
		</React.Fragment>
	);
};

export default FavoriteNote;