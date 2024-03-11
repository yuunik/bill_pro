import {
    NavBar,
    DatePicker
} from 'antd-mobile'
import {useState, useMemo, useEffect} from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import _ from 'lodash'

import './index.scss'

const Month = () => {
    // 展示日期选择器的标记
    const [isShowDatePicker, setIsShowDatePicker] = useState(false)
    // 当前日期
    const [date, setDate] = useState(() => dayjs().format("YYYY - MM "))
    // 获取 billStore 的状态管理库
    const billState = useSelector(state => state.billState)

    // 获取账单列表
    const { billList } = billState

    // 以月份分组的账单列表
    const monthGroup = useMemo(() => _.groupBy(billList, (bill) => dayjs(bill.date).format("YYYY - MM ")) , [billList])

    // 当前月的账单列表
    const [currentMonthBillList, setCurrentMonthBillList] = useState([])

    // 组件挂载时调用
    useEffect(() => {
        if (monthGroup[date]) {
            // 当前月的账单列表的默认值
            setCurrentMonthBillList(monthGroup[date])
        }
    }, [monthGroup])

    // 当前月的支出、收入、结余
    const { pay, income, balances } = useMemo(() => {
        // 支出
        const pay = currentMonthBillList.filter(bill => bill.type === 'pay').reduce((sum, bill) => sum + bill.money, 0)
        // 收入
        const income = currentMonthBillList.filter(bill => bill.type === 'income').reduce((sum, bill) => sum + bill.money, 0)
        // 结余
        const balances = pay + income
        return {
            pay,
            income,
            balances
        }
    }, [currentMonthBillList])

    // 选择日期
    const selectDate = (value) => {
        const selectedDate = dayjs(value).format("YYYY - MM ")
        // 获取当前月的账单列表
        setCurrentMonthBillList(monthGroup[selectedDate])
        // 修改账单日期
        setDate(selectedDate)
        // 关闭弹窗
        setIsShowDatePicker(false)
    }

    return (
        <div className="monthlyBill">
            <NavBar className="nav" backArrow={false}>
                月度收支
            </NavBar>
            <div className="content">
                <div className="header">
                    {/* 时间切换区域 */}
                    <div className="date" onClick={() => setIsShowDatePicker(true)}>
                        <span className="text">
                          {date}月账单
                        </span>
                        <span className={classNames('arrow', {expand: isShowDatePicker})}></span>
                    </div>
                    {/* 统计区域 */}
                    <div className='twoLineOverview'>
                        <div className="item">
                            <span className="type">支出</span>
                            <span className="money">{pay.toFixed(2)}</span>
                        </div>
                        <div className="item">
                            <span className="type">收入</span>
                            <span className="money">{income.toFixed(2)}</span>
                        </div>
                        <div className="item">
                            <span className="type">结余</span>
                            <span className="money">{balances.toFixed(2)}</span>
                        </div>
                    </div>
                    {/* 时间选择器 */}
                    <DatePicker
                        className="kaDate"
                        title="记账日期"
                        precision="month"
                        visible={isShowDatePicker}
                        max={new Date()}
                        onConfirm={ selectDate }
                        onCancle={() => setIsShowDatePicker(false)}
                        onClose={() => setIsShowDatePicker(false)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Month