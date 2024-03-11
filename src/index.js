// 引入 React 核心库
import React from 'react'
// 引入 React 扩展库
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider} from 'react-redux'

// 引入 router
import router from '@/router'
import store from '@/store'

// 引入样式
import '@/index.scss'

const root = ReactDOM.createRoot(document.querySelector(".root"))
root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)

