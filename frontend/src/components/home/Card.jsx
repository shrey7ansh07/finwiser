import React from 'react'

function Card({
    bg_check,
    Heading,
    descirption,
    Svg,
    ...props
}) {
    return (
        <div className={`w-[400px] h-[280px] rounded-[30px] ${bg_check}
        px-[40px] py-[30px] hover:scale-110 hover:border-white hover:border-2 transition-all ease-in-out`} {...props}>
            <div className='flex items-center justify-between mb-[20px]'>
                <h1 className="text-[45px] text-white font-semibold">{Heading}</h1>
                <Svg className="text-white text-[60px]" />
            </div>
            <div className='text-white text-[20px]'>
                {descirption}
            </div>
        </div>)
}

export default Card