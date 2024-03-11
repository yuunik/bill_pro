import { createBrowserRouter } from 'react-router-dom'

// 引入一级路由
import Layout from '@/pages/Layout'
import New from '@/pages/New'
// 引入二级路由
import Month from '@/pages/Month'
import Year from '@/pages/Year'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Month />
            },
            {
                path: 'year',
                element: <Year />
            }
        ]
    },
    {
        path: '/new',
        element: <New />
    }
])

export default router