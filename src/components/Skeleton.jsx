import React from 'react';

const SkeletonLoader = () => {
    return (
        <div className="animate-pulse flex items-center gap-4 w-[468px] rounded-md bg-[rgba(255,255,255,0.04)]">
            <div className="bg-gray-400 rounded-l-md w-[88px] h-[88px]"></div>
            <div className="flex-1 space-y-2 py-1">
                <div className="h-4 bg-gray-400 rounded w-3/4"></div>
                <div className="h-4 bg-gray-400 rounded w-1/2"></div>
            </div>
        </div>
    );
};

export default SkeletonLoader;
