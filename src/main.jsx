import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import Users from './pages/Users.jsx'
createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		{/* <App /> */}
		<Users />
	</BrowserRouter>
);
