import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../redux/favoritesSlice';
import HeaderPagination from '../components/HeaderPagination';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import search from '../assets/search.svg';
import options from '../assets/options.svg';
import download from '../assets/download.svg';
import PlaylistAbout from '../components/PlaylistAbout';
import bottom from '../assets/bottom.svg';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import image from '../assets/image.png';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import repeat from '../assets/repeat.svg'
import shuffle from '../assets/shuffle.svg'
import musicDur from '../assets/music_duration.svg'
import volume from '../assets/vol_duration.svg'
import volume2 from '../assets/vol_icon.svg'


function Musics() {
    const params = useParams();
    const token = useSelector((state) => state.auth.token);
    const favoriteSongs = useSelector((state) => state.favorites.songs);
    const dispatch = useDispatch();
    const [playlist, setPlaylist] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        setLoading(true);
        if (params.id && token) {
            fetch(`https://api.spotify.com/v1/playlists/${params.id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setPlaylist(data);
                })
                .catch(err => {
                    console.error('Error fetching playlist:', err);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [params.id, token]);

    if (loading) {
        return (
            <div className='flex flex-col'>
                <PlaylistAbout />
            </div>
        );
    }

    if (!playlist) {
        return <div>Playlist not found</div>;
    }

    const handleAddFav = (trackId, trackData) => {
        dispatch(toggleFavorite(trackId));
        const isFavorite = favoriteSongs.includes(trackId);

        if (!isFavorite) {
            localStorage.setItem(trackId, JSON.stringify(trackData));
        } else {
            localStorage.removeItem(trackId);
        }
    };

    const playSong = (songUrl) => {
        if (audioRef.current) {
            if (currentSong === songUrl && isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.src = songUrl;
                audioRef.current.play();
                setCurrentSong(songUrl);
                setIsPlaying(true);
            }
        }
    };

    return (
        <div className='wrapper w-[1025px] px-[30px] py-[15px] h-[2800px] bg-[linear-gradient(0deg,_rgba(18,_18,_18,_1)_85%,_rgb(51,_51,_163)_100%)]'>
            <HeaderPagination />
            <div className='flex items-center gap-7'>
                <img src={playlist.images[0]?.url || image} alt={playlist.description || 'Playlist image'} className='w-[200px] h-[200px]' />
                <div className='text-white flex flex-col gap-3 justify-between'>
                    <h6 className='font-medium text-base'>PUBLIC PLAYLIST</h6>
                    <h1 className='font-black text-[45px] w-[553px] overflow-hidden h-[70px]'>{playlist.name}</h1>
                    <h3>{playlist.tracks.items[0]?.track.name} and more</h3>
                    <div className='flex items-center gap-2'>
                        <h4>Made for {playlist.owner.display_name}</h4>
                        <FiberManualRecordIcon fontSize='small' />
                        <h5>{playlist.tracks.total} songs, {Math.floor(playlist.tracks.items.reduce((total, item) => total + item.track.duration_ms, 0) / 3600000)} hr {Math.floor((playlist.tracks.items.reduce((total, item) => total + item.track.duration_ms, 0) % 3600000) / 60000)} min</h5>
                    </div>
                </div>
            </div>

            <div className='mt-14 flex items-center justify-between'>
                <div className='flex items-center gap-5'>
                    <button className='transition hover:opacity-65' onClick={() => playSong(playlist.tracks.items[0]?.track.preview_url)}>
                        {isPlaying ? <span className='p-2 flex items-center bg-green-500 rounded-[50%]'><PauseIcon className='text-black' sx={{ fontSize: "30px" }} /></span> : <span className='p-2 flex items-center bg-green-500 rounded-[50%]'><PlayArrowIcon className='text-black' sx={{ fontSize: "30px" }} /></span>}
                    </button>
                    <button className='transition hover:opacity-65'>
                        <FavoriteBorderIcon className='text-white' sx={{ fontSize: "30px" }}></FavoriteBorderIcon>
                    </button>
                    <button className='transition px-2 py-1.5 rounded-[50%] cursor-pointer border border-white hover:opacity-65'>
                        <img src={download} className='w-[15px]' alt="download icon" />
                    </button>
                    <button className='transition hover:opacity-65'>
                        <img src={options} className='w-[44px]' alt="options icon" />
                    </button>
                </div>

                <div className='flex items-center text-white gap-5'>
                    <div className='flex items-center text-white gap-5'>
                        <img src={search} alt="search icon" />
                        <div className='flex items-center gap-2 cursor-pointer hover:opacity-75'>
                            <h1>Custom Order</h1>
                            <img src={bottom} alt="" />
                        </div>
                    </div>
                </div>
            </div>

            <div className='text-zinc-400 mt-7'>
                <div className='flex items-center font-semibold text-[16px] pl-5'>
                    <h1 className='mr-6'>#</h1>
                    <h2 className='mr-[300px]'>Title</h2>
                    <h3 className='mr-[150px]'>Album</h3>
                    <h2 className='mr-[230px]'>DATE ADDED</h2>
                    <AccessTimeIcon />
                </div>
                <hr className='mt-3 border-zinc-600 mb-8' />
            </div>

            <div className='pl-4 text-white'>
                {playlist.tracks.items.map((item, index) => (
                    <div key={item.track.id} className={`flex items-center px-2 py-1 mb-2 bg-[#121212] cursor-pointer hover:bg-zinc-800 ${favoriteSongs.includes(item.track.id) ? 'bg-green-500' : ''}`} onClick={() => playSong(item.track.preview_url)}>
                        <div className='flex items-center gap-2'>
                            <h1 className='mr-6'>{index + 1}</h1>
                            <img src={item.track.album.images[0]?.url || image} alt={item.track.name} className='w-[52px]' />
                            <div className='w-[260px]'>
                                <h1 className='text-[16px]'>{item.track.name}</h1>
                                <h2 className='text-[14px]'>{item.track.artists.map(artist => artist.name).join(', ')}</h2>
                            </div>
                        </div>
                        <h3 className='w-[450px]'>{item.track.album.name}</h3>

                        <div className='flex items-center gap-10'>
                            <span onClick={() => handleAddFav(item.track.id)}>
                                <FavoriteIcon className={`${favoriteSongs.includes(item.track.id) ? 'text-green-500' : ''}`} />
                            </span>
                            <h5>
                                {(() => {
                                    let durationMs = item.track.duration_ms;
                                    let minutes = Math.floor(durationMs / 60000);
                                    let seconds = ((durationMs % 60000) / 1000).toFixed(0);
                                    if (seconds < 10) {
                                        seconds = '0' + seconds;
                                    }
                                    return `${minutes}:${seconds}`;
                                })()}
                            </h5>
                        </div>
                    </div>
                ))}
            </div>

            <div className='fixed bottom-0 mx-auto left-0 w-full bg-[#121212] text-white flex items-center justify-between px-4 py-2'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center mr-[190px]'>
                        <img src={currentSong ? playlist.tracks.items.find(item => item.track.preview_url === currentSong)?.track.album.images[0]?.url || image : image} className='w-[52px] h-[52px]' alt="Album Art" />
                        <div className='ml-3'>
                            <h1 className='text-[16px] w-[200px]  text-white'>{currentSong ? playlist.tracks.items.find(item => item.track.preview_url === currentSong)?.track.name : ''}</h1>
                            <h2 className='text-[14px]'>{currentSong ? playlist.tracks.items.find(item => item.track.preview_url === currentSong)?.track.artists.map(artist => artist.name).join(', ') : ''}</h2>
                        </div>

                    </div>
                    <div className='flex flex-col gap-1 items-center mr-[240px]'>
                        <div className='flex items-center gap-4'>
                            <img className='cursor-pointer hover:opacity-75' src={repeat} alt="repeat icon" />
                            <SkipPreviousIcon></SkipPreviousIcon>
                            <button className='transition hover:opacity-75' onClick={() => playSong(currentSong)}>
                                {isPlaying ? <PauseIcon className='text-white' sx={{ fontSize: "30px" }} /> : <PlayArrowIcon className='text-white' sx={{ fontSize: "30px" }} />}
                            </button>
                            <SkipNextIcon></SkipNextIcon>
                            <img className='cursor-pointer hover:opacity-75' src={shuffle} alt="shuffle icon" />
                        </div>

                        <img src={musicDur} alt="music duration" />


                    </div>
                    <div className='flex items-center gap-3'>
                        <img src={volume2} alt="" />
                        <img src={volume} alt="" />
                    </div>
                </div>

                <div className='flex items-center gap-4'>

                    <audio ref={audioRef} />
                </div>
            </div>
        </div >
    );
}

export default Musics;
