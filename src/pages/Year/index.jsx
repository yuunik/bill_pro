import { NavBar, DatePicker } from 'antd-mobile'
import { useState } from 'react'
import classNames from 'classnames'

import './index.scss'
import dayjs from "dayjs";

const Year = () => {
    // 控制日期选择器的显隐
    const [isShowDatePicker, setIsShowDatePicker] = useState(false)

    // 账单日期
    const [date, setDate] = useState(dayjs().format("YYYY"))

    // 保存日期
    const saveDate = (value) => {
        setDate(dayjs(value).format("YYYY"))
        // 关闭选择器
        setIsShowDatePicker(false)
    }
    return (
        <div className="annualBill">
            <NavBar className="nav" backArrow={false}>
                年度收支
            </NavBar>
            <div className="content">
                <div className="header">
                    {/* 时间切换区域 */}
                    <div className="date" onClick={() => setIsShowDatePicker(true)}>
                        <span className="text">
                          {date} 年账单
                        </span>
                        <span className={classNames('arrow', {expand: isShowDatePicker})}></span>
                    </div>
                    {/* 统计区域 */}
                    <div className='twoLineOverview'>
                        <div className="item">
                            <span className="type">支出</span>
                            <span className="money">{100}</span>
                        </div>
                        <div className="item">
                            <span className="type">收入</span>
                            <span className="money">{200}</span>
                        </div>
                        <div className="item">
                            <span className="type">结余</span>
                            <span className="money">{200}</span>
                        </div>
                    </div>
                    {/* 时间选择器 */}
                    <DatePicker
                        className="kaDate"
                        title="记账年份"
                        precision="year"
                        visible={isShowDatePicker}
                        max={new Date()}
                        onConfirm={saveDate}
                        onCancle={() => setIsShowDatePicker(false)}
                        onClose={() => setIsShowDatePicker(false)}
                    />
                </div>
            </div>
        </div >
    )
}

export default Year