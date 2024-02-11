import { useState } from 'react'
import { useForm } from "react-hook-form"
import {
    login as loginuser,
    register
} from "../../../services/authService.js"
import React from 'react'
import Input from './Input'
import { setAuthenticated } from '../../../store/authSlice.js'
import { useDispatch } from 'react-redux'



function Login({ handleclick, ...props }) {
    const dispatch = useDispatch()
    const [signin, setsignin] = useState(false)
    const { register: registerlogin, handleSubmit: handlelogin, reset: resetlogin } = useForm()
    const { register: registersignin, handleSubmit: handlesignin, reset: resetsignin } = useForm()
    const login = async (data) => {
        const userData =
        {
            password: data.password,
            username: data.username
        }
        try {
            const response = await loginuser(userData)
            //* reached here implies successfull login
            // console.log(response.data);
            const user = {
                username: response.username,
                fullname: response.fullname ? response.fullname : "",
                email: response.email ? response.email : "",
                userId: response._id,
                familysize: response.familysize ? response.familysize : 1,
                contactno: response.contactno ? response.contactno : "",
                dateofbirth: response.dateofbirth ? response.dateofbirth : "",
                //* here we have one
            }
            dispatch(setAuthenticated({ user: user }))
            resetlogin()
        } catch (error) {
            console.log(error);
        }
    }
    const Signin = async (data) => {
        const userData =
        {
            username: data.user,
            password: data.confirmpassword
        }

        try {
            const response = await register(userData)
            //* reached here implies successfull login
            // console.log(response.data);
            const user = {
                username: response.username,
                fullname: response.fullname ? response.fullname : "",
                email: response.email ? response.email : "",
                userId: response._id,
                familysize: response.familysize ? response.familysize : 1,
                contactno: response.contactno ? response.contactno : "",
                retirementage: response.retirementage ? response.retirementage : 60,
                //* here we have one
            }
            setsignin(false)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='w-[100%] h-full bg-transparent flex justify-center items-center absolute top-0 backdrop-blur'>
            <div className='h-[600px] w-[500px] bg-white rounded-3xl flex flex-col'>
                <div className='flex justify-center items-center py-[20px] bg-[#4c68c9] rounded-t-3xl'>
                    <p
                        className='text-[32px] text-[#807ef3] cursor-pointer'
                        onClick={handleclick}
                    >Go Back</p>
                </div>
                <div className='flex-1 bg-gradient-to-b from-[#122843] to-[#4c68c9] flex items-center pt-[50px] flex-col rounded-b-3xl'>
                    {!signin &&
                        <form
                            action=""
                            className='flex flex-col gap-[50px] items-center mb-[20px]'
                            onSubmit={handlelogin(login)}>
                            <Input
                                placeholder="Username"
                                required={true}
                                name="username"
                                id="username"
                                {...registerlogin("username", { required: { value: true, message: "username is required" } })} />
                            <Input
                                placeholder="Password"
                                required={true}
                                type='password'
                                name="password"
                                id="password"
                                {...registerlogin("password", { required: { value: true, message: "password" } })} />
                            <button type="submit" className='w-[235px] h-[67px] bg-[#0f1d29] text-white text-[20px] rounded-full hover:scale-105 transition-all ease-out'>LOG IN</button>
                        </form>}
                    {
                        signin && <form
                            action=""
                            className='flex flex-col gap-[40px] items-center mb-[20px]'
                            onSubmit={handlesignin(Signin)}>
                            <Input
                                placeholder="Username"
                                required={true}
                                name="user"
                                {...registersignin("user", { required: { value: true, message: "username is required" } })} />
                            <Input
                                placeholder="Create Password"
                                required={true}
                                type='password'
                                name="createpassword"
                                {...registersignin("createpassword", { required: { value: true, message: "createpassword is required" } })} />
                            <Input
                                placeholder="Confirm Password"
                                required={true}
                                type='password'
                                name="confirmpassword"
                                {...registersignin("confirmpassword", { required: { value: true, message: "confirmpassword is required" } })} />
                            <button className='w-[235px] h-[67px] bg-[#0f1d29] text-white text-[20px] rounded-full hover:scale-105 transition-all ease-out'>Create</button>
                        </form>
                    }
                    <div
                        className='text-center text-white text-[20px] 
                    cursor-pointer hover:text-blue-400'
                        onClick={() => setsignin(!signin)}>
                        {!signin ? "dont have an account" : "already have an account"}</div>
                </div>
            </div>
        </div>
    )
}

export default Login

