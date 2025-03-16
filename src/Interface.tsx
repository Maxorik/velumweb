import {useState, useRef, useEffect, forwardRef} from "react";
import '../style/iface.scss'

export const UserInterface = () => {
    const playerRef = useRef(null);

    return(
        <div className='iface-container'>
            <div className='iface-spacer' />
            <MusicPlayer ref={playerRef} />
            <VolumeSettings />
        </div>
    )
}

const MusicPlayer = forwardRef(function MusicPlayer(props, ref: React.RefObject<HTMLAudioElement>) {
    const [play, setPlay] = useState(false);

    const playerHandler = (state: boolean) => {
        state === true ? ref.current.play() : ref.current.pause();
        setPlay(state);
    }

    useEffect(() => {
        ref.current.volume = 0.3;
    }, [])

    return <div>
        { !play ? <button className='iface-btn' onClick={ ()=>playerHandler(true) }>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"
                 data-slot="icon">
                <path d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                      />
            </svg>
        </button> : <button className='iface-btn' onClick={ ()=>playerHandler(false) }>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"
                 data-slot="icon">
                <path d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
                      />
            </svg>
        </button> }
        <audio controls ref={ ref } >
            <source src="https://live.lofiradio.ru/lofi_mp3_320?fb9e" type="audio/aac" />
        </audio>
    </div>
});

const VolumeSettings = (playerRef) => {
    const [showSettings, setShowSettings] = useState(false);

    return(
        <div>
            <button className='iface-btn' onClick={ ()=>setShowSettings(!showSettings) }>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"
                     data-slot="icon">
                    <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z"
                    />
                </svg>
            </button>
        </div>
    )
}