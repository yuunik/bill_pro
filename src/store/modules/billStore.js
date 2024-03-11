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
        }
    }
})

const { setBillList } = billStore.actions
// 异步 actions
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

// 导出 actions
export {
    getBillList
}

const billReducer = billStore.reducer
// 导出 reducer
export default billReducer