import {useEffect, useRef, useState, FC, Ref} from "react";

interface VolumePlayerProps {
    volume: number;
    setVolume: (volume: number) => void;
}

/** Громкость основного плеера */
export const VolumeSettings: FC<VolumePlayerProps> = ({ volume, setVolume }) => {
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