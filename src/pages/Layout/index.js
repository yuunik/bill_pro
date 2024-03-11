import { Outlet } from 'react-router-dom'
import {Button} from "antd-mobile";

const Layout = () => {
    return (
        <div className="layout">
            我是 Layout 模块
            <br/>
            <Button color="primary">全局样式</Button>
            {/* 二级路由出口 */}
            <Outlet />
        </div>
    )
}

export default Layout