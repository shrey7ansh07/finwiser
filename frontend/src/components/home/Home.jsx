import React, { useState } from 'react'
import Card from './Card'
import Login from '../login/Login';
import { FaCompressArrowsAlt } from "react-icons/fa";
import { GiExpense } from "react-icons/gi";
import { VscMilestone } from "react-icons/vsc";
import { SlBookOpen } from "react-icons/sl";
import { GiBookshelf } from "react-icons/gi";
import Header from '../header/Header';
import Btn from '../login/Btn';
import { useSelector } from 'react-redux';
import Policy from '../../../cardcomponents/Policy';
import MileStone from '../../../cardcomponents/MileStone';
import Finance from '../../../cardcomponents/FInance';
import Loan from '../../../cardcomponents/Loan';
import Expense from '../../../cardcomponents/Expense';
import { RxCross1 } from "react-icons/rx"



function Home() {
    const [translate, setTranslate] = useState(false);
    const isAuthenticated = useSelector(state => state.authAnduser.isAuthenticated)
    const handleClick = () => {
        setTranslate(!translate);
    }
    const [policy, setpolicy] = useState(false)
    const [milestone, setmilestone] = useState(false)
    const [expense, setexpense] = useState(false)
    const [finance, setfinance] = useState(false)
    const [loan, setloan] = useState(false)
    const [clicked, setclicked] = useState(false)

    return (
        <div>
            <Header />
            {isAuthenticated && clicked && <div className='h-[70px] w-[70px] rounded-full absolute bg-white right-[150px] top-[100px] flex justify-center items-center z-[51] cursor-pointer'
                onClick={() => {
                    setclicked(false)
                    setexpense(false)
                    setfinance(false)
                    setloan(false)
                    setpolicy(false)
                    setmilestone(false)
                }}>
                <RxCross1 className='h-[20px] w-auto' />
            </div>}
            <div className='flex justify-center flex-wrap gap-[70px] w-[90%] mx-auto '>
                <Card
                    bg_check="bg-gradient-to-b from-[#727aa8] to-[#2f3a74]"
                    Heading="Policy Summarizer"
                    descirption="Summarize all your contracts in no time!"
                    Svg={FaCompressArrowsAlt}
                    onClick={() => {
                        setpolicy(true)
                        setclicked(true)
                    }}
                ></Card>
                {isAuthenticated && policy && <Policy />}
                <Card
                    bg_check="bg-gradient-to-b from-[#c6dc89] to-[#89804a]"
                    Heading="Milestone Planning "
                    descirption="Set your own goals to become financially !"
                    Svg={VscMilestone}
                    onClick={() => {
                        setmilestone(true)
                        setclicked(true)
                    }}
                ></Card>
                {isAuthenticated && milestone && <MileStone />}
                <Card
                    bg_check="bg-gradient-to-b from-[#c94c54] to-[#ba2c35]"
                    Heading="Expense Analyzer"
                    descirption="Get a detailed overview of all your expenses"
                    Svg={GiExpense}
                    onClick={() => {
                        setexpense(true)
                        setclicked(true)
                    }}
                ></Card>
                {isAuthenticated && expense && <Expense />}
                <Card
                    bg_check="bg-gradient-to-b from-[#6fb972] to-[#3f8842]"
                    Heading="Financial Education"
                    descirption="Summarize all your contracts in no time!"
                    Svg={GiBookshelf}
                    onClick={() => {
                        setfinance(true)
                        setclicked(true)
                    }}
                ></Card>
                {isAuthenticated && finance && <Finance />}
                <Card
                    bg_check="bg-gradient-to-b from-[#6f83aa] to-[#8717cd]"
                    Heading="Loan & Insurance"
                    descirption="Educate yourself in managing your own finances."
                    Svg={SlBookOpen}
                    onClick={() => {
                        setloan(true)
                        setclicked(true)
                    }}
                ></Card>
                {isAuthenticated && loan && <Loan />}
            </div>
            {!isAuthenticated && <>
                {!translate && <Btn does="LOG IN" onClick={handleClick} />}
                {translate && <Login handleclick={handleClick} />}</>
            }
        </div>

    )
}

export default Home