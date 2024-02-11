import React from 'react'
import Input2 from './Input2';
import { useForm } from "react-hook-form"
import { CiUser } from "react-icons/ci";
import { RxExit } from "react-icons/rx"
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, updateUser } from '../../../services/authService.js';
import { setunAuthenticated, setAuthenticated } from '../../../store/authSlice';

function Profile() {
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const user = useSelector(state => state.authAnduser.userData)
    const logout = async () => {
        try {
            await logoutUser()
            //* reacher here implies successfull logout
            dispatch(setunAuthenticated())
        }
        catch (error) {
            throw error
        }
    }
    const update = async (data) => {
        const userdata = {
            dateofbirth: data.date,
            contactno: data.number,
            email: data.email,
            fullname: user?.fullname,
            username: user?.username,
            familysize: user?.familysize

        }
        try {
            const response = await updateUser(userdata)
            const user = {
                username: response.username,
                fullname: response.fullname ? response.fullname : "",
                email: response.email ? response.email : "",
                userId: response._id,
                familysize: response.familysize ? response.familysize : 1,
                contactno: response.contactno ? response.contactno : "",
                dateofbirth: response.dateofbirth ? response.dateofbirth : "",
                //* here we have one
            }
            dispatch(setAuthenticated({ user: user }))

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className='w-[100%] h-full backdrop-blur absolute top-0 left-0 bg-transparent z-50 flex justify-center items-center '>
            <div className='w-[90%] h-[90%] bg-gradient-to-r from-[#f17474] to-[#b72485] rounded-[80px] relative'>

                <div className='flex justify-center items-center flex-col gap-[20px]'>
                    <CiUser className='w-[200px] h-[250px] text-white font-bold' />
                    <div className='text-white text-[50px]'>{user?.username}</div>
                    <form action=""
                        className='flex flex-col gap-[50px] justify-center items-center'
                        onSubmit={handleSubmit(update)}>
                        <Input2
                            type="date"
                            name="datebirth"
                            defaultValue={user && user.dateofbirth}
                            {...register("date", { required: { value: true } })} />
                        <Input2
                            placeholder="XXXXXXXXXX"
                            type="number"
                            name="number"
                            defaultValue={user && user.contactno}
                            {...register("number", { required: { value: true } })} />
                        <Input2
                            placeholder="email"
                            type="email"
                            name="email"
                            defaultValue={user && user.email}
                            {...register("email", { required: { value: true } })} />
                        <button className='w-[200px] h-[50px] rounded-3xl bg-white text-[20px]'>Save</button>
                    </form>
                </div>
                <div className='w-[200px] h-[50px] rounded-3xl bg-white  
                absolute left-[30px]cursor-pointer flex justify-center 
                items-center gap-[20px] left-[30px] cursor-pointer
                '
                    onClick={logout}>
                    <RxExit className='w-[30px] h-auto' />
                    <p className='text-[20px]'>logout</p>
                </div>
            </div>
        </div >
    )
}

export default Profile