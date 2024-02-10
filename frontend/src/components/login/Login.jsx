import { useState } from 'react'
import React from 'react'
import Input from './Input'
function Login({ handleclick, ...props }) {
    const [signin, setsignin] = useState(false)
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
                    {!signin && <form action="" className='flex flex-col gap-[50px] items-center mb-[20px]'>
                        <Input
                            placeholder="Username"
                            required={true}
                            name="username" />
                        <Input
                            placeholder="Password"
                            required={true}
                            type='password'
                            name="password" />
                        <button className='w-[235px] h-[67px] bg-[#0f1d29] text-white text-[20px] rounded-full hover:scale-105 transition-all ease-out'>LOG IN</button>
                    </form>}
                    {
                        signin && <form action="" className='flex flex-col gap-[40px] items-center mb-[20px]'>
                            <Input
                                placeholder="Username"
                                required={true}
                                name="username" />
                            <Input
                                placeholder="Create Password"
                                required={true}
                                type='password'
                                name="createpassword" />
                            <Input
                                placeholder="Confirm Password"
                                required={true}
                                type='password'
                                name="confirmpassword" />
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

