import './App.css';

import { BrowserRouter, useLocation } from 'react-router-dom';

import Router from './route/Router';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer'

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<AppLayout />
			</BrowserRouter>
		</div>
	);
}

function AppLayout() {
	const location = useLocation();

	return (
		<div className="app-container">
			<Header />
			<main className={`router-container ${location.pathname === '/feed/list' ? 'feed-router-container' : ''}`}>
				<Router />
			</main>
			<Footer />
		</div>
	);
}

export default App;
