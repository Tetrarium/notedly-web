import { useQuery, gql } from "@apollo/client";
import React from "react";
import ReactMarkdown from "react-markdown";
// Импортируем компонент Link из react-router
import { Link } from "react-router-dom";

import Button from "../components/Button";
import NoteFeed from "../components/NoteFeed";

// GrathQL - запрос, хранящийся в виде переменной
const GET_NOTES = gql`
	query NoteFeed($cursor: String) {
		noteFeed(cursor: $cursor) {
			cursor
			hasNextPage
			notes {
				id
				createdAt
				content
				favoriteCount
				author {
					username
					id
					avatar
				}
			}
		}
	}
`;

const loadMore = (data, fetchMore) => {
	fetchMore({
		variables: {
			cursor: data.noteFeed.cursor
		},
		updateQuery: (previousResult, { fetchMoreResult }) => {
			return {
				noteFeed: {
					cursor: fetchMoreResult.noteFeed.cursor,
					hasNextPage: fetchMoreResult.noteFeed.hasNextPage,

					// Совмещаем новые результаты со старыми
					notes: [
						...previousResult.noteFeed.notes,
						...fetchMoreResult.noteFeed.notes
					],
					__typename: 'noteFeed'
				}
			};
		}
	})
}

const Home = () => {
	// Хук запроса
	const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

	// Если данные загружаются, отображается сообщение о загрузке
	if (loading) {
		return <p>Loading...</p>;
	}

	// Если при получении данных произошел сбой,
	// отображается сообщение об ошибке
	if (error) {
		return <p>Error!</p>;
	}

	return (
		<React.Fragment>
			<NoteFeed notes={data.noteFeed.notes} />

			{data.noteFeed.hasNextPage && (
				<Button
					onClick={() => loadMore(data, fetchMore)}
				>Load more</Button>
			)}
		</React.Fragment>

	)
};

export default Home;