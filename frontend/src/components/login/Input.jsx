import React from 'react'

const Input = React.forwardRef(function Input({ placeholder, type = "text", required = false, name, ...props }, ref) {
    return (
        <input
            className='w-[450px] h-[60px] rounded-lg bg-black px-[30px] py-[10px] text-[25px] text-white'
            placeholder={placeholder}
            type={type}
            required={required}
            name={name}
            {...props}
            ref={ref}
        />
    )
})

export default Input