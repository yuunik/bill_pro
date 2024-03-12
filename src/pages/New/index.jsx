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

    // 控制日期选择器显隐的标记
    const [isShowDatePicker, setIsShowDatePicker] = useState(false)

    // 账单记录日期
    const [date, setDate] = useState()

    // 保存账单金额
    const saveMoney = (value) => {
        setMoney(+value)
    }

    // 保存账单记录日期
    const saveDate = (value) => {
        // 保存日期
        setDate(value)
        // 关闭选择器
        setIsShowDatePicker(false)
    }

    // 新增账单
    const saveNewBill = () => {
        dispatch(insertBillList({
            type: billType,
            money: billType === 'pay' ? -money : money,
            date: dayjs(date).format("YYYY-MM-DD HH:mm:ss"),
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
                            <span className="text" onClick={() => setIsShowDatePicker(true)}>
                                {
                                    dayjs(date).format("YYYY 年 MM 月 DD 日")
                                }
                            </span>
                            <DatePicker
                                className="kaDate"
                                title="记账日期"
                                max={new Date()}
                                visible={isShowDatePicker}
                                onCancle={() => setIsShowDatePicker(false)}
                                onConfirm={saveDate}
                                onClose={() => setIsShowDatePicker(false)}
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