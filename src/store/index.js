import { configureStore } from '@reduxjs/toolkit'
import billReducer from '@/store/modules/billStore'

const store = configureStore({
    reducer: {
        billState: billReducer
    }
})

export default store