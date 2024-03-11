import classNames from 'classnames'
import { useMemo } from 'react'

// 账单类型的中文适配
import { billTypeToName } from '@/constants'

import './index.scss'

const DailyBill = ({date, billList}) => {
    // 当日支出
    const pay = useMemo(() => billList.filter(bill => bill.type === 'pay').reduce((sum, bill) => sum + bill.money, 0), [billList])
    // 当日收入
    const income = useMemo(() => billList.filter(bill => bill.type === 'income').reduce((sum, bill) => sum + bill.money, 0), [billList])
    // 当日结余
    const balances = useMemo(() => pay + income, [pay, income])

    return (
        <div className={classNames('dailyBill')}>
            <div className="header">
                <div className="dateIcon">
                    <span className="date">{date}</span>
                    <span className={classNames('arrow')}></span>
                </div>
                <div className="oneLineOverview">
                    <div className="pay">
                        <span className="type">支出&nbsp;</span>
                        <span className="money">{pay.toFixed(2)}</span>
                    </div>
                    <div className="income">
                        <span className="type">收入&nbsp;</span>
                        <span className="money">{income.toFixed(2)}</span>
                    </div>
                    <div className="balance">
                        <span className="type">结余&nbsp;</span>
                        <span className="money">{balances.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            {/* 单日列表 */}
            <div className="billList">
                {billList.map(item => {
                    return (
                        <div className="bill" key={item.id}>
                            <div className="detail">
                                <div className="billType">{billTypeToName[item.useFor]}</div>
                            </div>
                            <div className={classNames('money', item.type)}>
                                {item.money.toFixed(2)}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default DailyBill