import React, { useState } from 'react'
import { CiEdit } from "react-icons/ci"

const Input2 = React.forwardRef(function Input2({ placeholder = "dd/mm/yy", type = "text", required = false, name, ...props }, ref) {
    const [edit, setedit] = useState(true)
    return (
        <div className='flex gap-[20px] justify-center text-[20px]'>
            <input
                type={type}
                required={required}
                name={name}
                ref={ref}
                readOnly={edit}
                placeholder={placeholder}
                {...props}
                className='w-[500px] h-[60px] px-[30px] py-[10px] text-center rounded-3xl' />
            <div className='w-[60px] h-[60px] rounded-full 
            bg-gradient-to-b from-[#df80f6] to-[#ca40ac] 
            flex justify-center items-center cursor-pointer 
            hover:border-2 border-white '
                onClick={() => setedit(false)}>
                <CiEdit className='w-[30px] h-auto text-white'></CiEdit>
            </div>

        </div>)
})

export default Input2