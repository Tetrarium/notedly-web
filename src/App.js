// index.js
// This is the main entry point of our application

import React from "react";
import ReactDom from "react-dom";

// Импортируем библиотеки ApolloClient
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

// Настраиваем API URI и кэш
const uri = process.env.API_URI;
const cache = new InMemoryCache();

// Настраиваем Apollo Client
const client = new ApolloClient({
	uri,
	cache,
	connectToDevTools: true
});

// Импортируем глобальные стили
import GlobalStyle from "./components/GlobalStyle";

// Импортируем маршруты
import Pages from "./pages";

const App = () => {
	return (
		<ApolloProvider client={client}>
			<GlobalStyle />
			<Pages />
		</ApolloProvider>
	)
}

ReactDom.render(<App />, document.getElementById('root'));