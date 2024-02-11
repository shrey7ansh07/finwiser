import { configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import authAnduserReducer from "./authSlice.js"


const persistConfig = {
    key: 'userData',
    storage
}
const persisteduserDataReducer = persistReducer(persistConfig, authAnduserReducer)

export const store = configureStore({
    reducer: {
        authAnduser: persisteduserDataReducer,
    }
})

export const persistor = persistStore(store)