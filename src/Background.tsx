import React, {useState, FC, useEffect} from "react";

import lofi_33_vid from '../assets/video/lofi_33.mp4'
import lofi_33_img from '../assets/img/lofi_33.webp'

export const VideoBackground: FC = () => {
    const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);

    /** расчет vh браузера */
    useEffect(() => {
        function setVhVariable(): void {
            const vh: number = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        window.addEventListener('resize', setVhVariable);
        setVhVariable();
    }, [])

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