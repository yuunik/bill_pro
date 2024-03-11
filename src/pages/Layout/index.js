import { Outlet } from 'react-router-dom'
import { Button } from 'antd-mobile'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { getBillList } from '@/store/modules/billStore'

const Layout = () => {
    // 获取 billState
    const billState = useSelector(state => state.billState)
    // 获取 提交对象 dispatch
    const dispatch = useDispatch()

    // 组件挂载或更新时调用
    useEffect(() => {
        dispatch(getBillList())
    }, [dispatch])

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