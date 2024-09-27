// src/components/Loader.tsx
import React from 'react';


const Loader: React.FC = ({
    className
}:any) => {
    return (
        <div className={`flex justify-center items-center h-full ${className}`}>
            <div className="animate-spin rounded-full border-t-4 border-b-4 border-[#1F485B] h-16 w-16"></div>
        </div>
    );
};

export default Loader;
