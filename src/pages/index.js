import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Layout from "../components/Layout";

import Home from "./home";
import MyNotes from "./mynotes";
import Favorites from "./favorites";

const Pages = () => {
	return (
		<Router>
			<Layout>
				<Route exact path="/" component={Home} />
				<Route exact path="/mynotes" component={MyNotes} />
				<Route exact path="/favorites" component={Favorites} />
			</Layout>
		</Router>
	);
};

export default Pages;