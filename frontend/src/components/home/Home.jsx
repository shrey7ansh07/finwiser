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


function Home() {
    const [translate, setTranslate] = useState(false);
    const isAuthenticated = useSelector(state => state.authAnduser.isAuthenticated)
    const handleClick = () => {
        setTranslate(!translate);
    }
    return (
        <div>
            <Header />
            <div className='flex justify-center flex-wrap gap-[70px] w-[90%] mx-auto '>
                <Card
                    bg_check="bg-gradient-to-b from-[#727aa8] to-[#2f3a74]"
                    Heading="Policy Summarizer"
                    descirption="Summarize all your contracts in no time!"
                    Svg={FaCompressArrowsAlt}
                ></Card>
                <Card
                    bg_check="bg-gradient-to-b from-[#c6dc89] to-[#89804a]"
                    Heading="Milestone Planning "
                    descirption="Set your own goals to become financially !"
                    Svg={VscMilestone}
                ></Card>
                <Card
                    bg_check="bg-gradient-to-b from-[#c94c54] to-[#ba2c35]"
                    Heading="Expense Analyzer"
                    descirption="Get a detailed overview of all your expenses"
                    Svg={GiExpense}
                ></Card>
                <Card
                    bg_check="bg-gradient-to-b from-[#6fb972] to-[#3f8842]"
                    Heading="Financial Education"
                    descirption="Summarize all your contracts in no time!"
                    Svg={GiBookshelf}
                ></Card>
                <Card
                    bg_check="bg-gradient-to-b from-[#6f83aa] to-[#8717cd]"
                    Heading="Loan & Insurance"
                    descirption="Educate yourself in managing your own finances."
                    Svg={SlBookOpen}
                ></Card>
            </div>
            {!isAuthenticated && <>
                {!translate && <Btn does="LOG IN" onClick={handleClick} />}
                {translate && <Login handleclick={handleClick} />}</>
            }
        </div>

    )
}

export default Home