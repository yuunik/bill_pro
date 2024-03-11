import {
    NavBar,
    DatePicker
} from 'antd-mobile'
import { useState } from 'react'
import classNames from 'classnames'

import './index.scss'

const Month = () => {
    // 展示日期选择器的标记
    const [isShowDatePicker, setIsShowDatePicker] = useState(false)

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
                          2023 | 3月账单
                        </span>
                        <span className={classNames('arrow', {expand: isShowDatePicker})}></span>
                    </div>
                    {/* 统计区域 */}
                    <div className='twoLineOverview'>
                        <div className="item">
                            <span className="money">{100}</span>
                            <span className="type">支出</span>
                        </div>
                        <div className="item">
                            <span className="money">{200}</span>
                            <span className="type">收入</span>
                        </div>
                        <div className="item">
                            <span className="money">{200}</span>
                            <span className="type">结余</span>
                        </div>
                    </div>
                    {/* 时间选择器 */}
                    <DatePicker
                        className="kaDate"
                        title="记账日期"
                        precision="month"
                        visible={isShowDatePicker}
                        max={new Date()}
                        onConfirm={() => setIsShowDatePicker(false)}
                        onCancle={() => setIsShowDatePicker(false)}
                        onClose={() => setIsShowDatePicker(false)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Month