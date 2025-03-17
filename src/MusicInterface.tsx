import {useEffect, useRef, useState, FC} from "react";

interface MusicPlayerProps {
    play: boolean;
    setPlay: (play: boolean) => void;
    volume: number;
}

interface VolumePlayerProps {
    volume: number;
    setVolume: (volume: number) => void;
}

export const MusicInterface = () => {
    const [play, setPlay] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(0.5);

    return(
        <div className='iface-group-container'>
            <MusicPlayer play={play} setPlay={setPlay} volume={volume} />
            <VolumeSettings volume={volume} setVolume={setVolume} />
        </div>
    )
}

const MusicPlayer: FC<MusicPlayerProps> = ({ play, setPlay, volume }) => {
    const playerRef = useRef(null);
    const playerHandler = (state: boolean) => {
        state === true ? playerRef.current.play() : playerRef.current.pause();
        setPlay(state);
    }

    useEffect(() => {
        playerRef.current.volume = volume;
    }, [volume])

    return <div>
        { !play ?
            <button className='iface-btn' onClick={ ()=>playerHandler(true) }>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"
                     data-slot="icon">
                    <path d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                    />
                </svg>
            </button> :
            <button className='iface-btn' onClick={ ()=>playerHandler(false) }>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"
                     data-slot="icon">
                    <path d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
                    />
                </svg>
            </button> }
        <audio controls ref={ playerRef } >
            <source src="https://live.lofiradio.ru/lofi_mp3_320?fb9e" type="audio/aac" />
        </audio>
    </div>
};

const VolumeSettings: FC<VolumePlayerProps> = ({ volume, setVolume }) => {
    const [showSettings, setShowSettings] = useState(false);
    const oldVolume = useRef(volume);

    const setMute = () => {
        if (volume === 0) {
            oldVolume.current === 0 ? setVolume(0.5) : setVolume(oldVolume.current);
            oldVolume.current = volume;
        } else {
            oldVolume.current = volume;
            setVolume(0);
        }
    }

    return(
        <div>
            { volume === 0 ?
                <button className='iface-btn' onClick={ setMute }>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"
                         data-slot="icon">
                        <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L20.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72-1.72-1.72Z"
                        />
                    </svg>
                </button> :
                <button className='iface-btn' onClick={ setMute }>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"
                         data-slot="icon">
                        <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z"
                        />
                    </svg>
                </button>
            }
        </div>
    )
}