// 引入 React 核心库
import React from 'react'
// 引入 React 扩展库
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

// 引入 App
import App from '@/App'
// 引入 router
import router from '@/router'

const root = ReactDOM.createRoot(document.querySelector(".root"))
root.render(
    <RouterProvider router={router}>
        <App />
    </RouterProvider>
)

