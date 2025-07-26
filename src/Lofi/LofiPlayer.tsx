import React, {useEffect, useRef, FC, Ref, useState} from "react";

interface MusicPlayerProps {
    play: boolean;
    setPlay: (play: boolean) => void;
    volume: number;
}

/** Базовый play\pause */
export const LofiPlayer: FC<MusicPlayerProps> = ({ volume }) => {
    const [play, setPlay] = useState<boolean>(false);
    const playerRef: Ref<HTMLAudioElement> = useRef(null);
    const playerHandler = (state: boolean) => {
        if (playerRef.current) {
            if (state) {
                playerRef.current.src = 'https://live.lofiradio.ru/lofi_mp3_320?fb9e';
                playerRef.current.play()
            } else {
                playerRef.current.pause();
            }
            setPlay(state);
        }
    }

    useEffect(() => {
        playerRef.current.volume = volume;
    }, [volume])

    return <div>
        <button className='iface-btn' onClick={ ()=>playerHandler(!play) }>
            { !play ?
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"
                     data-slot="icon">
                    <path d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                    />
                </svg> :
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"
                     data-slot="icon">
                    <path d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
                    />
                </svg>
            }
        </button>
        <audio controls ref={ playerRef } />
    </div>
};

