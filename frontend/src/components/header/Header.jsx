import React from 'react'
import logo from "../../assets/Group.svg"
import name from "../../assets/FINWISER.svg"
import User from './User'
import { useSelector } from 'react-redux'


function Header() {
    const isAuthenticated = useSelector(state => state.authAnduser.isAuthenticated)
    return (

        <div className='w-[100%] h-[15vh] bg-white mb-[40px] 
        bg-gradient-to-b from-[#293077] to-[#120727] py-[30px] px-[30px]
        flex justify-between'>
            <div className='flex gap-3 items-center'>
                <img src={logo} />
                <img src={name} alt="" />
            </div>
            {isAuthenticated && <User />}

        </div>

    )
}

export default Header