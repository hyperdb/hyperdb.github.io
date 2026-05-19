import { Route, Switch } from "wouter";
import Blog from "@/pages/Blog";
import BlogDetail from "@/pages/BlogDetail";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import "./App.scss";

function App() {
	return (
		<Switch>
			<Route path="/blog/:postId">
				{(params) => <BlogDetail post_id={params.postId} />}
			</Route>
			<Route path="/blog" component={Blog} />
			<Route path="/profile" component={Profile} />
			<Route path="/" component={Home} />
			<Route>404: No such page!</Route>
		</Switch>
	);
}

export default App;
