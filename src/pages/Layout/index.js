import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div className="layout">
            我是 Layout 模块
            {/* 二级路由出口 */}
            <Outlet />
        </div>
    )
}

export default Layout