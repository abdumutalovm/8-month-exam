import React from 'react'
import friend from '../assets/account.svg'
import add from '../assets/add_person.png'
import x from '../assets/x.png'

function RightSideBar() {
    return (
        <div className='w-2/12 min-h-full bg-black px-5 py-6'>
            <div className='flex items-center justify-between'>
                <h1 className='text-white font-bold text-[16px]'>Friend Activity</h1>
                <div className='flex items-center gap-4'>
                    <img src={add} alt="friend add icon" className='hover:opacity-70 cursor-pointer' />
                    <img src={x} alt="x icon" className='hover:opacity-70 cursor-pointer' />
                </div>
            </div>
            <h1 className='text-zinc-400 font-medium mb-6 text-[15px] mt-6'>Let friends and followers on Spotify see what you’re listening to.</h1>

            <div className='flex flex-col gap-3 mb-4'>
                <img src={friend} alt="friend icon" className='w-[155px]' />
                <img src={friend} alt="friend icon" className='w-[155px]' />
                <img src={friend} alt="friend icon" className='w-[155px]' />
            </div>

            <h2 className='text-zinc-400 font-medium mb-5'>Go to Settings Social and enable “Share my listening activity on Spotify.’ You can turn this off at any time.</h2>

            <button className='px-7 py-3 bg-white text-black rounded-[30px] w-full text-[15px] hover:bg-zinc-300 font-bold'>SETTINGS</button>
        </div>
    )
}

export default RightSideBar