import React from 'react';

export default function Loading() {
    return (
        <div>
            <div className="jumping-dots-loader"> <span></span> <span></span> <span></span> </div>
            <div className="moving-gradient"></div>
        </div>
    )
}