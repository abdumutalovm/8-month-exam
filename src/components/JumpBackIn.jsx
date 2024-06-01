import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Skeleton2 from './Skeleton2';
import { useNavigate } from 'react-router-dom';

function JumpBackIn() {
    const token = useSelector(state => state.auth.token);
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [seeAll, setSeeAll] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        if (token) {
            fetch('https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFLVaM30PMBm4/playlists', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data && data.playlists && data.playlists.items) {
                        setPlaylists(data.playlists.items);
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

    function handleSee() {
        setSeeAll(prevSeeAll => !prevSeeAll);
    }

    function handleRedirect(playlistId) {
        navigate(`/playlist/${playlistId}`);
    }

    return (
        <div className={`mb-16 ${seeAll ? "" : "h-[400px]"} overflow-hidden`}>
            <div className='flex items-center justify-between'>
                <h1 className='font-bold text-white text-[30px] mb-6'>Jump In Back</h1>
                <h1 onClick={handleSee} className='transition text-[#ADADAD] font-bold text-base cursor-pointer hover:opacity-75'>
                    {seeAll ? "SEE LESS" : "SEE ALL"}
                </h1>
            </div>

            <div className='flex items-center flex-wrap justify-between'>
                {loading ? (
                    Array(10).fill(0).map((_, index) => <Skeleton2 key={index} />)
                ) : (
                    playlists.map((el, index) => (
                        <div key={index} onClick={() => handleRedirect(el.id)} className='transition mb-5 w-[224px] cursor-pointer p-4 rounded-[8px] flex flex-col justify-between bg-[#1B1B1B] hover:bg-[#232323]'>
                            <img src={el.images[0]?.url || ''} alt="" className='rounded-md' />
                            <div>
                                <h1 className='text-white font-bold text-xl overflow-hidden h-[40px] mt-5 mb-1'>{el.name}</h1>
                                <h4 className='text-[#B3B3B3] font-medium overflow-hidden h-[40px]'>{el.description}</h4>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default JumpBackIn;
