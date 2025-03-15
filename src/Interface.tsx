import {useState, useRef, useEffect} from "react";
import '../style/iface.scss'

export const UserInterface = () => {
    return(
        <div className='iface-container'>
            <div className='iface-btn'>
                <MusicPlayer/>
            </div>
        </div>
    )
}

const MusicPlayer = () => {
    const lofiPlayer = useRef(null);
    const [play, setPlay] = useState(false);

    const playerHandler = (state: boolean) => {
        state === true ? lofiPlayer.current.play() : lofiPlayer.current.pause();
        setPlay(state);
    }

    useEffect(() => {
        lofiPlayer.current.volume = 0.3;
    }, [])

    return <>
        { !play ? <button onClick={ ()=>playerHandler(true) }>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"
                 data-slot="icon">
                <path d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                      />
            </svg>
        </button> : <button onClick={ ()=>playerHandler(false) }>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"
                 data-slot="icon">
                <path d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
                      />
            </svg>
        </button> }
        <audio controls ref={ lofiPlayer } >
            <source src="https://live.lofiradio.ru/lofi_mp3_320?fb9e" type="audio/aac" />
        </audio>
    </>
}