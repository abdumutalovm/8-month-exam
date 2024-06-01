import React from 'react';

const Skeleton2 = () => {
    return (
        <div className="animate-pulse flex flex-col items-start gap-4 w-56 h-[328px] mb-4 p-4 bg-zinc-800 rounded-md">
            <div className="bg-zinc-700 rounded-md w-full h-[180px]"></div>
            <div className="w-full">
                <div className="h-4 bg-zinc-700  rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-zinc-700 rounded w-1/2"></div>
            </div>
        </div>
    );
};

export default Skeleton2;
