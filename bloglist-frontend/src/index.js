import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Link, Routes, Route, useMatch } from 'react-router-dom'
import store from './store'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <Provider store={store}>
            <App Link={Link} Routes={Routes} Route={Route} useMatch={useMatch} />
        </Provider>
    </Router>
)
