import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { FrappeProvider } from 'frappe-react-sdk'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Weather from './pages/Weather'
function App() {
	const [count, setCount] = useState(0)

	return (
		<div className="App">
			<FrappeProvider socketPort={import.meta.env.VITE_SOCKET_PORT ?? ''}>
				<BrowserRouter basename={import.meta.env.VITE_BASE_PATH}>
					<Routes>
						<Route path="/" element={<Weather />} />

					</Routes>
				</BrowserRouter>
			
			</FrappeProvider>
		</div>
	)
}

export default App
