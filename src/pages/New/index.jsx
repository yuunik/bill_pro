import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import BillTypeIcon from '@/components/BillTypeIcon'
import classNames from 'classnames'
import { billListData } from '@/contants'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { insertBillList } from '@/store/modules/billStore'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'

import './index.scss'

const New = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // 控制收入与支出的状态
    const [billType, setBillType] = useState('pay')

    // 账单金额
    const [money, setMoney] = useState()

    // 账单图标类型
    const [useFor, setUseFor] = useState()

    // 保存账单金额
    const saveMoney = (value) => {
        setMoney(+value)
    }

    // 新增账单
    const saveNewBill = () => {
        dispatch(insertBillList({
            type: billType,
            money: billType === 'pay' ? -money : money,
            date: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            useFor
        }))
        // 路由跳转
        navigate('/')
    }

    return (
        <div className="keepAccounts">
            <NavBar className="nav" onBack={() => navigate(-1)}>
                记一笔
            </NavBar>

            <div className="header">
                <div className="kaType">
                    <Button
                        shape="rounded"
                        className={classNames({selected: billType === 'pay'})}
                        onClick={() => setBillType('pay')}
                    >
                        支出
                    </Button>
                    <Button
                        className={classNames({selected: billType === 'income'})}
                        onClick={() => setBillType('income')}
                        shape="rounded"
                    >
                        收入
                    </Button>
                </div>

                <div className="kaFormWrapper">
                    <div className="kaForm">
                        <div className="date">
                            <BillTypeIcon type="calendar" className="icon" />
                            <span className="text">{'今天'}</span>
                            <DatePicker
                                className="kaDate"
                                title="记账日期"
                                max={new Date()}
                            />
                        </div>
                        <div className="kaInput">
                            <Input
                                className="input"
                                placeholder="0.00"
                                type="number"
                                value={money}
                                onChange={saveMoney}
                            />
                            <span className="iconYuan">¥</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="kaTypeList">
                {
                    billListData[billType].map(item => {
                        return (
                            <div className="kaType" key={item.type}>
                                <div className="title">{item.name}</div>
                                <div className="list">
                                    {item.list.map(item => {
                                        return (
                                            <div
                                                className={classNames(
                                                    'item',
                                                    {
                                                        selected: item.type === useFor
                                                    }
                                                )}
                                                key={item.type}
                                                onClick={() => setUseFor(item.type)}
                                            >
                                                <div className="icon">
                                                    <BillTypeIcon type={item.type} />
                                                </div>
                                                <div className="text">{item.name}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className="btns">
                <Button className="btn save" onClick={saveNewBill}>
                    保 存
                </Button>
            </div>
        </div>
    )
}

export default New