import React, {useState} from "react";

import lofi_33_vid from '../assets/video/lofi_33.mp4'
import lofi_33_img from '../assets/img/lofi_33.webp'

export const VideoBackground = () => {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    return (
        <>
            { !isVideoLoaded && <img alt='bg' className='main-bg' src={lofi_33_img}/> }
                <video
                    src={lofi_33_vid}
                    onLoadedData={ () => setIsVideoLoaded(true) }
                    className="main-bg"
                    loop
                    autoPlay
                    muted
                    playsInline
                />
        </>
    );
};