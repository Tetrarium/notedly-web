import React from "react";
// Импортируем компонент Link из react-router
import { Link } from "react-router-dom";

import Button from "../components/Button";

const Home = () => {
	return (
		<div>
			<p>This is the home page</p>
			<Button>Click me!</Button>
		</div>
	);
};

export default Home;