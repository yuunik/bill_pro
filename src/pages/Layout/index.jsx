import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import {  TabBar } from 'antd-mobile'
import {
    BillOutline,
    AddSquareOutline,
    CalculatorOutline
} from 'antd-mobile-icons'

import { getBillList } from '@/store/modules/billStore'

import './index.scss'

const Layout = () => {
    // 获取 提交对象 dispatch
    const dispatch = useDispatch()
    // 获取路由跳转对象
    const navigate = useNavigate()

    // 组件挂载或更新时调用
    useEffect(() => {
        dispatch(getBillList())
    }, [dispatch])

    // tabBar 列表数据
    const tabList = [
        {
            key: '',
            title: '月度账单',
            icon: <BillOutline />
        },
        {
            key: 'new',
            title: '记账',
            icon: <AddSquareOutline />
        },
        {
            key: 'year',
            title: '年度账单',
            icon: <CalculatorOutline />
        }
    ]

    // 切换 tabBar
    const switchTabBar = (path) => {
        navigate(path)
    }

    return (
        <div className="layout">
            <div className="container">
                {/* 二级路由出口 */}
                <Outlet />
            </div>
            <div className="footer">
                <TabBar onChange={ switchTabBar }>
                    {
                        tabList.map(tab => (
                            <TabBar.Item key={tab.key} icon={tab.icon} title={tab.title} />
                        ))
                    }
                </TabBar>
            </div>
        </div>
    )
}

export default Layout