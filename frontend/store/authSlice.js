import { createSlice } from "@reduxjs/toolkit"

const defaultAuthenticated = false
const authAnduserSlice = createSlice({
    name: "authAnduser",
    initialState: { isAuthenticated: defaultAuthenticated, userData: null },
    reducers: {
        setAuthenticated: (state, action) => {
            state.isAuthenticated = true,
                state.userData = action.payload.user
        },
        setunAuthenticated: (state, action) => {
            state.isAuthenticated = false,
                state.userData = null
        }
    }

})

export const { setAuthenticated, setunAuthenticated } = authAnduserSlice.actions
export default authAnduserSlice.reducer

