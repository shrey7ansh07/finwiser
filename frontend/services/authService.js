import axios from "axios"
const api = axios.create()

const register = async (userData) => {
    try {
        const response = await api.post(`/api/v1/users/register`, userData)
        return response.data.data
    }
    catch (error) {
        throw error.response.data
    }
}

const login = async (userData) => {
    try {
        console.log(userData);
        const response = await api.post("/api/v1/users/login", userData)
        return response.data.data.user
    } catch (error) {
        throw error.response.data
    }
}
const logoutUser = async () => {
    try {
        const response = await api.post("/api/v1/users/logout")
        return response.data.data
    } catch (error) {
        throw error.response.data
    }
}
const updateUser = async (data) => {
    try {
        const response = await api.post("/api/v1/users/update", data)
        return response.data.data.user
    }
    catch {
        throw error.response.data
    }
}

const refreshAccessToken = async () => {
    try {
        const response = await api.post("/api/v1/users/refreshtoken", { withCredentials: true })
        return response

    } catch (error) {
        throw error
    }
}
const isLoggedIn = async () => {
    try {
        const response = await api.post("api/v1/users/checkauth")
        return response.data.data.user
    }
    catch (error) {
        throw error.response.data
    }
}

export {
    register,
    login,
    logoutUser,
    updateUser,
    isLoggedIn,

}