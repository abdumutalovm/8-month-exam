import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SkeletonLoader from '../components/Skeleton';
import YourTopMixes from './YourTopMixes';
import MadeForYou from './MadeForYou';
import { useNavigate } from 'react-router-dom';
import HeaderPagination from './HeaderPagination';
import RecentlyPlayed from './RecentlyPLayed';
import JumpBackIn from './JumpBackIn';
import UniquelyYours from './UniquelyYours';

function HomeHeader() {
    const token = useSelector(state => state.auth.token);
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        if (token) {
            fetch('https://api.spotify.com/v1/browse/featured-playlists', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data && data.playlists && data.playlists.items) {
                        setPlaylists(data.playlists.items.slice(0, 6));
                    }
                })
                .catch(err => {
                    console.error('Error fetching playlists:', err);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [token]);

    function handleRedirect(playlistId) {
        navigate(`/playlist/${playlistId}`);
    }

    return (
        <>
            <div className='wrapper h-[2000px] px-[30px] py-[15px] mb-9 bg-[linear-gradient(0deg,_rgba(18,_18,_18,_1)_85%,_rgba(51,_51,_163,_1)_100%)]'>
                <HeaderPagination></HeaderPagination>
                <h1 className='font-bold text-white text-[30px] mb-6'>Good afternoon</h1>

                <div className='flex items-center justify-between gap-4'>
                    <div className='flex flex-wrap gap-5 mb-16'>
                        {loading ? (
                            Array(6).fill(0).map((_, index) => <SkeletonLoader key={index} />)
                        ) : (
                            playlists.map((playlist) => (
                                <div key={playlist.id} onClick={() => handleRedirect(playlist.id)} className='cursor-pointer flex items-center gap-4 mx-auto 2xl:w-[468px] lg:w-[368px] md:w-full rounded-md bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.12)]'>
                                    <img src={playlist.images[0]?.url || rec} alt={playlist.name} className='rounded-l-md w-[88px]' />
                                    <h1 className='text-white font-bold text-xl'>{playlist.name}</h1>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <YourTopMixes />
                <MadeForYou />
                <RecentlyPlayed></RecentlyPlayed>
                <JumpBackIn></JumpBackIn>
                <UniquelyYours></UniquelyYours>
            </div>
        </>
    );
}

export default HomeHeader;
