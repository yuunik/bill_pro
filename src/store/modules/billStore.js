import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const billStore = createSlice({
    name: 'billStore',
    initialState: {
        // 账单
        billList: []
    },
    reducers: {
        // 设置账单
        setBillList: (state, action) => {
            state.billList = action.payload
        },
        // 新增账单
        addBillList: (state, action) => {
            state.billList.push(action.payload)
        }
    }
})

const { setBillList, addBillList } = billStore.actions
// 异步 actions
/**
 * 获取账单数据
 * @returns {(function(*): Promise<void>)|*}
 */
const getBillList = () => {
    return async (dispatch) => {
        const result = await axios({
            url: 'http://localhost:3030/billList',
            method: 'get'
        })
        // 设置账单
        dispatch(setBillList(result.data))
    }
}

/**
 * 新增账单数据
 * @param data 新的账单数据
 * @returns {(function(*): Promise<void>)|*}
 */
const insertBillList = (data) => {
    return async (dispatch) => {
        const result = await axios({
            url: 'http://localhost:3030/billList',
            method: 'post',
            data
        })
        // 新增账单
        dispatch(addBillList(result.data))
    }
}

// 导出 actions
export {
    getBillList,
    insertBillList
}

const billReducer = billStore.reducer
// 导出 reducer
export default billReducer