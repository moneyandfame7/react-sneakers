import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import 'macro-css'
import {BrowserRouter, HashRouter} from 'react-router-dom'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)

