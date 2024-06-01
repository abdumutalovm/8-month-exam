import React from 'react';

const PlaylistAbout = () => {
    return (
        <>
            <div className="animate-pulse h-[2800px] p-6 bg-[linear-gradient(0deg,_rgba(18,_18,_18,_1)_85%,_rgb(221,_246,_40)_100%)] flex gap-4 w-[1000px] bg-[rgba(255,255,255,0.04)]">
                <div className="bg-gray-400 mt-16 p-7 float-start mr-14 w-[300px] h-[300px]"></div>
                <div className="flex-1 space-y-2 py-1 mt-40">
                    <div className="h-4 bg-gray-400 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-400 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-400 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-400 rounded w-1/2"></div>
                </div>

            </div>


        </>
    );
};

export default PlaylistAbout;
