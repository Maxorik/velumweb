import {useEffect, useRef, useState, FC, Ref} from "react";
import rain from '../../assets/sounds/rain.mp3'

interface AmbientProps {
    refName: string;
    localStorageItem: string
}

/** Выбор звуков */
export const Ambient: FC = () => {
    const [managerWindow, showManagerWindow] = useState<boolean>(false);

    /** звуки дождя TODO вынести в хук*/
    const rainAudioRef: Ref<HTMLAudioElement> = useRef(null);
    const [playRain, setPlayRain] = useState<boolean>(false);
    const initialVolume = +localStorage.getItem('rainVolume') || 0.5;
    const [rainVolume, setRainVolume] = useState<number>(initialVolume);
    const onChangeRainVolume = (event) => {
        const volume = +event.target.value;
        volume > 0 && localStorage.setItem('rainVolume', volume.toString());
        setRainVolume(volume);
    }
    const rainHandler = () => {
        const state = !playRain;
        state === true ? rainAudioRef.current.play() : rainAudioRef.current.pause();
        setPlayRain(state);
    }
    useEffect(() => {
        if (rainAudioRef.current) {
            rainAudioRef.current.volume = rainVolume;
        }
    }, [rainVolume])

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
                    <div className='ambient-main-container'>
                        <div className='ambient-container'>
                            <p className='title'>Дождь</p>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={rainVolume}
                                onChange={onChangeRainVolume}
                                className='input-range-big'
                            />
                            <button
                                className='iface-btn'
                                onClick={ rainHandler }
                            >
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 384 512"
                                     fill={ playRain ? '#f5924f' : '#fff' }
                                     aria-hidden="true"
                                     data-slot="icon">
                                    <path d="
                                    M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z
                                    "
                                    />
                                </svg>
                            </button>
                            <audio controls ref={ rainAudioRef } >
                                <source src={ rain } type="audio/aac" />
                            </audio>
                        </div>
                    </div>
                </div> }
        </div>
    )
};