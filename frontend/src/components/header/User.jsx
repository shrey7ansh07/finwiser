import React, { useState } from 'react'
import { CiUser } from "react-icons/ci";
import Profile from '../profile/Profile'
import { RxCross1 } from "react-icons/rx"
import { useSelector } from 'react-redux';


function User() {
    const user = useSelector(state => state.authAnduser.userData)
    const [name, setname] = useState(false)
    const [clicked, setclicked] = useState(false)
    return (
        <div>
            {!clicked && < div
                className='w-[90px] h-[90px]
            bg-gradient-to-r from-[#b33535] to-[#a72a57]
            rounded-full flex justify-center items-center gap-[10px]
            cursor-pointer hover:w-[300px] transition-all ease-in'
                onMouseEnter={() => setname(true)}
                onMouseLeave={() => setname(false)}
                onClick={() => setclicked(true)}>
                {name && <div className='text-white text-[30px]'>{user?.username}</div >}
                <CiUser className=' h-[60px] w-auto bg-gradient-to-r from-[#b33535] to-[#a72a57] text-white rounded-full ' />
            </div>}
            {clicked && <>
                <div className='h-[70px] w-[70px] rounded-full absolute bg-white right-[150px] top-[100px] flex justify-center items-center z-[51] cursor-pointer'
                    onClick={() => {
                        setclicked(false)
                        setname(false)
                    }}>
                    <RxCross1 className='h-[20px] w-auto' />
                </div>
                <Profile /></>}

        </div >
    )
}

export default User



