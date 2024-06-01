import React from 'react'
import home from '../assets/home.png'
import find from '../assets/find.png'
import liked_song from '../assets/liked_songs.png'
import addPLaylist from '../assets/add_playlist.png'
import library from '../assets/library.png'
import { useNavigate } from 'react-router-dom'

function LeftSideBar() {
    const navigate = useNavigate();
    function hanldeNavigate1() {
        navigate('/')
    }

    function hanldeNavigate2() {
        navigate('/search')
    }

    function hanldeNavigate3() {
        navigate('/')
    }
    function hanldeNavigate4() {
        navigate('/favourites')
    }
    return (
        <div className='w-2/12 h-[7940px] bg-black text-zinc-300'>
            <div className='px-5 py-6 flex flex-col gap-7'>
                <div className='flex flex-col'>
                    <div onClick={hanldeNavigate1} className='transition flex mb-5 cursor-pointer items-center gap-4 hover:opacity-70'>
                        <img src={home} alt="home icon" />
                        <h1 className='font-bold'>Home</h1>
                    </div>
                    <div onClick={hanldeNavigate2} className='transition flex mb-5 cursor-pointer items-center gap-4 hover:opacity-70'>
                        <img src={find} alt="home icon" />
                        <h1 className='font-bold'>Search</h1>
                    </div>
                    <div onClick={hanldeNavigate3} className='transition flex mb-5 cursor-pointer items-center gap-4 hover:opacity-70'>
                        <img src={library} alt="home icon" />
                        <h1 className='font-bold'>Your Library</h1>
                    </div>
                </div>

                <div>
                    <div className='opacity-70 mb-5 flex items-center gap-4 cursor-pointer hover:opacity-70'>
                        <img src={addPLaylist} alt="" />
                        <h1>Create Playlist</h1>
                    </div>
                    <div onClick={hanldeNavigate4} className='transition flex items-center gap-4 cursor-pointer hover:opacity-70'>
                        <img src={liked_song} alt="" />
                        <h1>Liked Songs</h1>
                    </div>
                </div>

                <hr className='border-zinc-600' />

                <div className='flex flex-col gap-3'>
                    <h1 className='cursor-pointer hover:text-zinc-400'>Chill Mix</h1>
                    <h1 className='cursor-pointer hover:text-zinc-400'>Insta Hits</h1>
                    <h1 className='cursor-pointer hover:text-zinc-400'>Your Top Songs 2021</h1>
                    <h1 className='cursor-pointer hover:text-zinc-400'>Mellow Songs</h1>
                    <h1 className='cursor-pointer hover:text-zinc-400'>Anime Lofi & Chillhop Music</h1>
                    <h1 className='cursor-pointer hover:text-zinc-400'>BG Afro “Select” Vibes</h1>
                    <h1 className='cursor-pointer hover:text-zinc-400'>Afro “Select” Vibes</h1>
                    <h1 className='cursor-pointer hover:text-zinc-400'>Happy Hits!</h1>
                    <h1 className='cursor-pointer hover:text-zinc-400'>Deep Focus</h1>
                    <h1 className='cursor-pointer hover:text-zinc-400'>Instrumental Study</h1>
                    <h1 className='cursor-pointer hover:text-zinc-400'>OST Compilations</h1>
                    <h1 className='cursor-pointer hover:text-zinc-400'>Nostalgia for old souled mill...</h1>
                    <h1 className='cursor-pointer hover:text-zinc-400'>Mixed Feelings</h1>
                </div>
            </div>
        </div>
    )
}

export default LeftSideBar