import React from 'react'

function Btn({ does, ...props }) {
    return (
        <button className='flex justify-center items-center py-[20px] 
        bg-[#4c68c9] rounded-t-3xl w-[500px] text-white text-[25px] absolute
        bottom-0 left-[calc(50%-250px)]' {...props}>{does}</button>
    )
}

export default Btn