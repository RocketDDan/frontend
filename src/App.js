import './App.css';

import { BrowserRouter, useLocation } from 'react-router-dom';

import Router from './route/Router';
import Header from './components/layout/Header';
import { FeedProvider } from './store/FeedContext';

function App() {
	return (
		<div className="App">
			<FeedProvider>
				<BrowserRouter>
					<AppLayout />
				</BrowserRouter>
			</FeedProvider>
		</div>
	);
}

function AppLayout() {
	const location = useLocation();

	return (
		<div className="app-container">
			<Header />
			<main className={
				`router-container 
				${(location.pathname === '/feed/list' || location.pathname === '/')
					? 'feed-router-container'
					: ''}`
			}
			>
				<Router />
			</main>
			{/* <Footer /> */}
		</div>
	);
}

export default App;
