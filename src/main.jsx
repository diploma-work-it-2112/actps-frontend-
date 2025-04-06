import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Router from './router'
import './style/app.css'


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <Router />
    </BrowserRouter>
)


