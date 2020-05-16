import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Users from './pages/Users';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Nav from './components/Nav';
import Chat from './components/Chat';

const App = () => (
	<Router>
		<div>
			<Nav />
			<Switch>
				<Route exact path="/" component={Users} />
				<Route exact path="/Users" component={Users} />
				<Route exact path="/Users/:id" component={Detail} />
				<Route exact path="/Chat" component={Chat} />
				<Route component={NoMatch} />
			</Switch>
		</div>
	</Router>
);

export default App;
