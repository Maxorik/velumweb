import {useEffect, useRef, useState, FC, Ref} from "react";

interface MusicPlayerProps {
    play: boolean;
    setPlay: (play: boolean) => void;
    volume: number;
}

interface VolumePlayerProps {
    volume: number;
    setVolume: (volume: number) => void;
}

export const MusicInterface: FC = () => {
    const [play, setPlay] = useState<boolean>(false);

    const baseVolume: number = +localStorage.getItem('masterVolume') || 0.5;
    const [volume, setVolume] = useState<number>(baseVolume);

    return(
        <div className='iface-group-container'>
            <MusicPlayer play={play} setPlay={setPlay} volume={volume} />
            <VolumeSettings volume={volume} setVolume={setVolume} />
            <SoundManager />
        </div>
    )
}

/** Базовый play\pause */
const MusicPlayer: FC<MusicPlayerProps> = ({ play, setPlay, volume }) => {
    const playerRef: Ref<HTMLAudioElement> = useRef(null);
    const playerHandler = (state: boolean) => {
        state === true ? playerRef.current.play() : playerRef.current.pause();
        setPlay(state);
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
        <audio controls ref={ playerRef } >
            <source src="https://live.lofiradio.ru/lofi_mp3_320?fb9e" type="audio/aac" />
        </audio>
    </div>
};

/** Громкость всего FIXME */
const VolumeSettings: FC<VolumePlayerProps> = ({ volume, setVolume }) => {
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const hideVolumeTimer: Ref<number> = useRef(0);
    const showHoveringForm = (state: boolean) => {
        if (state) {
            setShowSettings(true);
            clearTimeout(hideVolumeTimer.current)
        } else {
            const timerId = setTimeout(() => {
                setShowSettings(false)
            }, 1000);
            hideVolumeTimer.current = timerId;
        }
    }

    /** отрисовка всплывающей формы */
    const volumeBtnRef: Ref<HTMLButtonElement> = useRef(null);
    const volumeHoveringFormTop: Ref<number> = useRef(0);
    useEffect(() => {
        const volumeBtnCoordinates = volumeBtnRef.current.getBoundingClientRect();
        volumeHoveringFormTop.current = volumeBtnCoordinates.top - 15;
    }, [showSettings]);

    /** изменение громкости */
    const onChangeVolume = (event) => {
        const volume = +event.target.value;
        volume > 0 && localStorage.setItem('masterVolume', volume.toString());
        setVolume(volume);
    }

    /** без звука */
    const oldVolume: Ref<number> = useRef(volume);
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
            <button
                className='iface-btn'
                onClick={ setMute }
                ref={ volumeBtnRef }
                onMouseEnter={() => showHoveringForm(true)}
                onMouseLeave={() => showHoveringForm(false)}
            >
                { volume === 0 ?
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"
                         data-slot="icon">
                        <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L20.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72-1.72-1.72Z"
                        />
                    </svg> :
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"
                         data-slot="icon">
                        <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z"
                        />
                    </svg>
                }
            </button>
            { showSettings &&
                <div
                    className='hovering-form volume-window'
                    style={{ top: volumeHoveringFormTop.current + 'px' }}
                    onMouseEnter={() => showHoveringForm(true)}
                    onMouseLeave={() => showHoveringForm(false)}
                >
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={onChangeVolume}
                    />
                </div> }
        </div>
    )
};

/** Выбор звуков */
const SoundManager: FC = () => {
    const [managerWindow, showManagerWindow] = useState<boolean>(false);

    const managerBtnRef: Ref<HTMLButtonElement> = useRef(null);
    const managerHoveringFormTop: Ref<number> = useRef(0);
    useEffect(() => {
        const managerBtnCoordinates = managerBtnRef.current.getBoundingClientRect();
        managerHoveringFormTop.current = managerBtnCoordinates.top - 15;
    }, [managerWindow]);

    return(
        <div>
            <button
                className='iface-btn'
                onClick={ () => showManagerWindow(!managerWindow) }
                ref={managerBtnRef}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"
                      data-slot="icon">
                    <path d="M13.1707057,7 C13.5825421,5.83480763 14.6937812,5 16,5 C17.3062188,5 18.4174579,5.83480763 18.8292943,7 L21,7 C21.5522847,7 22,7.44771525 22,8 C22,8.55228475 21.5522847,9 21,9 L18.8292943,9 C18.4174579,10.1651924 17.3062188,11 16,11 C14.6937812,11 13.5825421,10.1651924 13.1707057,9 L3,9 C2.44771525,9 2,8.55228475 2,8 C2,7.44771525 2.44771525,7 3,7 L13.1707057,7 Z M5.17070571,15 C5.58254212,13.8348076 6.69378117,13 8,13 C9.30621883,13 10.4174579,13.8348076 10.8292943,15 L21,15 C21.5522847,15 22,15.4477153 22,16 C22,16.5522847 21.5522847,17 21,17 L10.8292943,17 C10.4174579,18.1651924 9.30621883,19 8,19 C6.69378117,19 5.58254212,18.1651924 5.17070571,17 L3,17 C2.44771525,17 2,16.5522847 2,16 C2,15.4477153 2.44771525,15 3,15 L5.17070571,15 Z M16,9 C16.5522847,9 17,8.55228475 17,8 C17,7.44771525 16.5522847,7 16,7 C15.4477153,7 15,7.44771525 15,8 C15,8.55228475 15.4477153,9 16,9 Z M8,17 C8.55228475,17 9,16.5522847 9,16 C9,15.4477153 8.55228475,15 8,15 C7.44771525,15 7,15.4477153 7,16 C7,16.5522847 7.44771525,17 8,17 Z"
                    />
                </svg>
            </button>
            { managerWindow &&
                <div
                    className='hovering-form manager-window'
                    style={{ top: managerHoveringFormTop.current + 'px' }}
                >

                </div> }
        </div>
    )
};