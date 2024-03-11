// 引入 React 核心库
import React from 'react'
// 引入 React 扩展库
import ReactDOM from 'react-dom/client'
// 引入 App
import App from './App'

const root = ReactDOM.createRoot(document.querySelector(".root"))
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)

