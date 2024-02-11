import React from 'react'

function Expense() {
    return (
        <div className='w-[100%] h-full backdrop-blur absolute top-0 left-0 bg-transparent z-50 flex justify-center items-center '>
            <div className='w-[90%] h-[90%] bg-gradient-to-b from-[#c94c54] to-[#ba2c35] rounded-[80px] relative flex flex-col justify-center items-center gap-[50px]'>
                <div className='text-white text-[60px] mt-[200px]'>Smart Spending Insights</div>
                <div className='text-white text-[20px] w-[500px] text-center'>Expense Analyzer is your go-to tool for gaining valuable insights into your spending habits and financial health. With Expense Analyzer, tracking and managing your expenses becomes effortless and insightful. Our intuitive platform categorizes your expenditures, providing clear visualizations and detailed reports to help you understand where your money is going. Whether you're monitoring monthly budgets, identifying areas for savings, or planning for future financial goals, Expense Analyzer offers the tools you need to take control of your finances. With customizable features and real-time updates, you can stay informed and make informed decisions about your spending patterns. Say goodbye to financial guesswork and hello to smart spending with Expense Analyzer. Start optimizing your expenses and achieving your financial goals today.</div>

            </div>
        </div>

    )
}

export default Expense