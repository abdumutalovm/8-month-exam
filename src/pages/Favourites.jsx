import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import image from '../assets/image.png';
import fav from '../assets/fav.png'
import nigga from '../assets/nigga.png'

function Favourites() {
    const favoriteSongIds = useSelector((state) => state.favorites.songs);
    const [favoriteSongs, setFavoriteSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = useSelector((state) => state.auth.token);
    const [playlist, setPlaylist] = useState({
        name: 'Favorite Playlist',
        owner: { display_name: 'User' },
        tracks: { items: [], total: 0 },
        images: [],
    });
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        const fetchFavoriteSongs = async () => {
            setLoading(true);
            try {
                const fetchedSongs = await Promise.all(
                    favoriteSongIds.map(async (songId) => {
                        const response = await fetch(`https://api.spotify.com/v1/tracks/${songId}`, {
                            method: 'GET',
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });
                        if (!response.ok) {
                            throw new Error(`Failed to fetch song with id: ${songId}`);
                        }
                        return response.json();
                    })
                );
                setFavoriteSongs(fetchedSongs);
            } catch (error) {
                console.error('Error fetching favorite songs:', error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchFavoriteSongs();
        }
    }, [favoriteSongIds, token]);

    useEffect(() => {
        setPlaylist((prevPlaylist) => ({
            ...prevPlaylist,
            tracks: { ...prevPlaylist.tracks, items: favoriteSongs.map((song) => ({ track: song })) },
        }));
    }, [favoriteSongs]);

    const removeFav = (songId) => {
        const favoriteSongs = JSON.parse(localStorage.getItem('favoriteSongs')) || [];
        const indexToRemove = favoriteSongs.indexOf(songId);
        if (indexToRemove !== -1) {
            favoriteSongs.splice(indexToRemove, 1);
        }
        localStorage.setItem('favoriteSongs', JSON.stringify(favoriteSongs));
        setFavoriteSongs(favoriteSongs);
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

    const playRandomSong = () => {
        const randomIndex = Math.floor(Math.random() * favoriteSongs.length);
        const randomSong = favoriteSongs[randomIndex];
        playSong(randomSong.preview_url);
    };

    return (
        <div className='wrapper w-[1025px] px-[30px] py-[15px] h-[2800px] bg-[linear-gradient(0deg,_rgba(18,_18,_18,_1)_85%,_rgb(51,_51,_163)_100%)]'>
            <div className='flex items-center gap-7'>
                <img src={fav} className='w-[297px] h-[297px]' />
                <div className='text-white flex flex-col'>
                    <h6 className='font-medium text-base w-[50px]'>PUBLIC PLAYLIST</h6>
                    <h1 className='font-black text-[100px]'>Liked Songs</h1>
                    <h3>{playlist.tracks.items[0]?.track.name} and more</h3>
                    <div className='flex items-center gap-2'>
                        <img src={nigga} alt="person img" />
                        <h1>davedirect3</h1>
                        <FiberManualRecordIcon fontSize='small' />
                        <h5>{favoriteSongs.length} songs</h5>
                    </div>
                </div>
            </div>

            <div className='mt-14 flex items-center justify-between'>
                <div className='flex items-center gap-5'>
                    <button className='transition hover:opacity-65' onClick={playRandomSong}>
                        <PlayArrowIcon className='w-[70px] text-white' />
                    </button>
                    <button className='transition hover:opacity-65'>
                        <FavoriteBorderIcon className='text-white' sx={{ fontSize: "30px" }} />
                    </button>
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
                {favoriteSongs.map((songData, index) => (
                    <div key={songData.id} className={`flex items-center px-2 py-1 mb-2 bg-[#121212] cursor-pointer hover:bg-zinc-800 ${favoriteSongIds.includes(songData.id) ? 'bg-green-500' : ''}`} onClick={() => playSong(songData.preview_url)}>
                        <div className='flex items-center gap-2'>
                            <h1 className='mr-6'>{index + 1}</h1>
                            <img src={songData.album.images[0]?.url || image} alt={songData.name} className='w-[52px]' />
                            <div className='w-[260px]'>
                                <h1 className='text-[16px]'>{songData.name}</h1>
                                <h2 className='text-[14px]'>{songData.artists.map(artist => artist.name).join(', ')}</h2>
                            </div>
                        </div>
                        <h3 className='w-[450px]'>{songData.album.name}</h3>
                        <div className='flex items-center gap-10'>
                            <span onClick={() => removeFav(songData.id)}>
                                <FavoriteIcon className={`${favoriteSongIds.includes(songData.id) ? 'text-green-500' : ''}`} />
                            </span>
                            <h5>
                                {(() => {
                                    let durationMs = songData.duration_ms;
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

            <div className='fixed bottom-0 left-0 w-full bg-[#121212] text-white flex items-center justify-between px-4 py-2'>
                <div className='flex items-center'>
                    <img src={currentSong ? favoriteSongs.find(song => song.preview_url === currentSong)?.album.images[0]?.url || image : image} className='w-[52px] h-[52px]' alt="Album Art" />
                    <div className='ml-3'>
                        <h1 className='text-[16px]'>{currentSong ? favoriteSongs.find(song => song.preview_url === currentSong)?.name : 'No song selected'}</h1>
                        <h2 className='text-[14px]'>{currentSong ? favoriteSongs.find(song => song.preview_url === currentSong)?.artists.map(artist => artist.name).join(', ') : ''}</h2>
                    </div>
                </div>

                <div className='flex items-center gap-4'>
                    <button onClick={() => playSong(currentSong)} className='text-white'>
                        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                    </button>
                </div>
            </div>

            <audio ref={audioRef} controls style={{ display: 'none' }}></audio>
        </div>
    );
}

export default Favourites;
