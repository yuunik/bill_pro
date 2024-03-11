import classNames from 'classnames'
import { useMemo, useState } from 'react'

// 账单类型的中文适配
import { billTypeToName } from 'src/contants'
// 账单类型图标的组件
import BillTypeIcon from '@/components/BillTypeIcon'

import './index.scss'

const DailyBill = ({date, billList}) => {
    // 当日支出
    const pay = useMemo(() => billList.filter(bill => bill.type === 'pay').reduce((sum, bill) => sum + bill.money, 0), [billList])
    // 当日收入
    const income = useMemo(() => billList.filter(bill => bill.type === 'income').reduce((sum, bill) => sum + bill.money, 0), [billList])
    // 当日结余
    const balances = useMemo(() => pay + income, [pay, income])

    // 控制账单列表的显隐
    const [isShowBill, setIsShowBill] = useState(false)

    return (
        <div className={classNames('dailyBill')}>
            <div className="header">
                <div className="dateIcon">
                    <span className="date">{date}</span>
                    <span className={classNames('arrow', {expand: isShowBill})} onClick={() => setIsShowBill(!isShowBill)}></span>
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
            {
                isShowBill
                &&
                <div className="billList">
                    {
                        billList.map(bill => {
                            return (
                                <div className="bill" key={bill.id}>
                                    {/* 账单类型图标 */}
                                    <BillTypeIcon type={bill.useFor}/>
                                    <div className="detail">
                                        <div className="billType">{billTypeToName[bill.useFor]}</div>
                                    </div>
                                    <div className={classNames('money', bill.type)}>
                                        {bill.money.toFixed(2)}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}
export default DailyBill