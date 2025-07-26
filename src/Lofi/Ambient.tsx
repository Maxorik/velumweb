import {useEffect, useRef, useState, FC, Ref} from "react";
import { isMobile } from '../../App'

import rain from '../../assets/sounds/rain.mp3'
import campfire from '../../assets/sounds/campfire.mp3'
import whitenoise from '../../assets/sounds/whitenoise.mp3'
import blizzard from '../../assets/sounds/blizzard.mp3'
import ocean from '../../assets/sounds/ocean.mp3'
import underwater from '../../assets/sounds/underwater.mp3'
import catpurr from '../../assets/sounds/catpurr.mp3'

/** Выбор звуков */
export const Ambient: FC = () => {
    const [managerWindow, showManagerWindow] = useState<boolean>(false);
    const managerBtnRef: Ref<HTMLButtonElement> = useRef(null);
    const managerHoveringFormTop: Ref<number> = useRef(0);

    useEffect(() => {
        const managerBtnCoordinates = managerBtnRef.current.getBoundingClientRect();
        managerHoveringFormTop.current = !isMobile ? managerBtnCoordinates.top - 15 : -59;
    }, [managerWindow]);

    return(
        <div>
            <button
                className='iface-btn'
                onClick={ () => showManagerWindow(!managerWindow) }
                ref={managerBtnRef}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={ managerWindow ? "#f5924f" : "#fff"} aria-hidden="true"
                      data-slot="icon">
                    <path d="M4 12h3a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7C2 6.477 6.477 2 12 2s10 4.477 10 10v7a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h3a8 8 0 1 0-16 0z"
                    />
                </svg>
            </button>
            <div
                className={ managerWindow ? 'hovering-form manager-window' : 'collapsed'}
                style={{ top: managerHoveringFormTop.current + (isMobile ? 'vh' : 'px') }}
            >
                <div className='ambient-main-container'>
                    { Object.keys(ambientSettings).map(type => <AmbientPlayer type={ type } key={ type }/>)}
                </div>
            </div>
        </div>
    )
};

/** экземпляр миниплеера */
const AmbientPlayer: FC = ({type}) => {
    const audioRef: Ref<HTMLAudioElement> = useRef(null);
    const [playAmbient, setPlayAmbient] = useState<boolean>(false);

    const initialVolume = +localStorage.getItem(ambientSettings[type].localStorageItem) || 0.5;
    const [volume, setVolume] = useState<number>(initialVolume);
    const onChangeVolume = (event) => {
        const vol = +event.target.value;
        vol > 0 && localStorage.setItem(ambientSettings[type].localStorageItem, vol.toString());
        setVolume(vol);
    }

    const playerHandler = () => {
        const state = !playAmbient;
        state === true ? audioRef.current.play() : audioRef.current.pause();
        setPlayAmbient(state);
    }

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume])

    return(
        <div className='ambient-container'>
            <p className='title' style={{ width: '70px' }}>{ ambientSettings[type].title }</p>
            <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={onChangeVolume}
                className='input-range-big'
            />
            <button
                className='iface-btn'
                onClick={ playerHandler }
            >
                <svg xmlns="http://www.w3.org/2000/svg"
                     viewBox={ ambientSettings[type].viewBox }
                     fill={ playAmbient ? '#f5924f' : '#fff' }
                     aria-hidden="true"
                     data-slot="icon"
                >
                    <path d={ ambientSettings[type].svg_d }/>
                </svg>
            </button>
            <audio ref={ audioRef } loop>
                <source src={ ambientSettings[type].audio }/>
            </audio>
        </div>
    )
}

/** параметры звуков */
const ambientSettings = {
    whitenoise: {
        localStorageItem: 'whiteVolume',
        audio: whitenoise,
        title: 'Белый шум',
        viewBox: '0 0 24 24',
        svg_d: 'M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z'
    },
    rain: {
        localStorageItem: 'rainVolume',
        title: 'Дождь',
        audio: rain,
        viewBox: '0 0 384 512',
        svg_d: 'M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z',
    },
    campfire: {
        localStorageItem: 'campfireVolume',
        title: 'Костер',
        audio: campfire,
        viewBox: '0 0 384 512',
        svg_d: 'M153.6 29.9l16-21.3C173.6 3.2 180 0 186.7 0C198.4 0 208 9.6 208 21.3V43.5c0 13.1 5.4 25.7 14.9 34.7L307.6 159C356.4 205.6 384 270.2 384 337.7C384 434 306 512 209.7 512H192C86 512 0 426 0 320v-3.8c0-48.8 19.4-95.6 53.9-130.1l3.5-3.5c4.2-4.2 10-6.6 16-6.6C85.9 176 96 186.1 96 198.6V288c0 35.3 28.7 64 64 64s64-28.7 64-64v-3.9c0-18-7.2-35.3-19.9-48l-38.6-38.6c-24-24-37.5-56.7-37.5-90.7c0-27.7 9-54.8 25.6-76.9z'
    },
    catpurr: {
        localStorageItem: 'catpurrVolume',
        title: 'Кошка',
        audio: catpurr,
        viewBox: '0 0 48 48',
        svg_d: 'M47.967,30.119l0.021,0.028L47.928,2.688c0-1.312-1.066-2.375-2.377-2.375    c-0.727,0-1.348,0.341-1.787,0.851l-0.021-0.007l-8.43,10.36v0.037C32.266,8.949,28.326,7.355,24,7.355    c-4.285,0-8.19,1.568-11.231,4.129l0.017-0.047L4.37,1.193L4.344,1.206C3.908,0.674,3.275,0.313,2.538,0.313    c-1.303,0-2.359,1.055-2.359,2.358l-0.17,27.803c0,0.006-0.003,0.014-0.003,0.017c0,0.009,0,0.018,0,0.021v0.183h0.012    c0.105,9.25,7.516,16.732,16.736,16.968v0.024h14.045c9.496,0,17.195-7.699,17.195-17.195    C47.994,30.367,47.967,30.246,47.967,30.119z M29.609,44.692H19.16c-0.257,0.012-0.511,0.038-0.771,0.038    c-8.521,0-15.427-6.909-15.427-15.429c0-0.355,0.018-0.707,0.041-1.058L3,28.247V16.286V7.094V3.491l9.465,11.577    c0,0-0.001,0.011-0.001,0.013c0.064-0.027,0.122-0.064,0.187-0.091C15.559,12.09,19.57,10.297,24,10.297    c4.396,0,8.379,1.769,11.279,4.63l9.74-11.437V6.54v7.483v14.582l-0.008-0.001c0.01,0.219,0.025,0.438,0.025,0.661    C45.037,37.784,38.131,44.692,29.609,44.692z'
    },
    blizzard: {
        localStorageItem: 'blizzardVolume',
        title: 'Метель',
        audio: blizzard,
        viewBox: '0 0 448 512',
        svg_d: 'M224 0c17.7 0 32 14.3 32 32V62.1l15-15c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-49 49v70.3l61.4-35.8 17.7-66.1c3.4-12.8 16.6-20.4 29.4-17s20.4 16.6 17 29.4l-5.2 19.3 23.6-13.8c15.3-8.9 34.9-3.7 43.8 11.5s3.8 34.9-11.5 43.8l-25.3 14.8 21.7 5.8c12.8 3.4 20.4 16.6 17 29.4s-16.6 20.4-29.4 17l-67.7-18.1L287.5 256l60.9 35.5 67.7-18.1c12.8-3.4 26 4.2 29.4 17s-4.2 26-17 29.4l-21.7 5.8 25.3 14.8c15.3 8.9 20.4 28.5 11.5 43.8s-28.5 20.4-43.8 11.5l-23.6-13.8 5.2 19.3c3.4 12.8-4.2 26-17 29.4s-26-4.2-29.4-17l-17.7-66.1L256 311.7v70.3l49 49c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-15-15V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V449.9l-15 15c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l49-49V311.7l-61.4 35.8-17.7 66.1c-3.4 12.8-16.6 20.4-29.4 17s-20.4-16.6-17-29.4l5.2-19.3L48.1 395.6c-15.3 8.9-34.9 3.7-43.8-11.5s-3.7-34.9 11.5-43.8l25.3-14.8-21.7-5.8c-12.8-3.4-20.4-16.6-17-29.4s16.6-20.4 29.4-17l67.7 18.1L160.5 256 99.6 220.5 31.9 238.6c-12.8 3.4-26-4.2-29.4-17s4.2-26 17-29.4l21.7-5.8L15.9 171.6C.6 162.7-4.5 143.1 4.4 127.9s28.5-20.4 43.8-11.5l23.6 13.8-5.2-19.3c-3.4-12.8 4.2-26 17-29.4s26 4.2 29.4 17l17.7 66.1L192 200.3V129.9L143 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l15 15V32c0-17.7 14.3-32 32-32z'
    },
    ocean: {
        localStorageItem: 'oceanVolume',
        title: 'Океан',
        audio: ocean,
        viewBox: '0 0 576 512',
        svg_d: 'M269.5 69.9c11.1-7.9 25.9-7.9 37 0C329 85.4 356.5 96 384 96c26.9 0 55.4-10.8 77.4-26.1l0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25C449.5 149.7 417 160 384 160c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4C42.8 92.6 61 83.5 75.3 71.6c11.1-9.5 27.3-10.1 39.2-1.7l0 0C136.7 85.2 165.1 96 192 96c27.5 0 55-10.6 77.5-26.1zm37 288C329 373.4 356.5 384 384 384c26.9 0 55.4-10.8 77.4-26.1l0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25C449.5 437.7 417 448 384 448c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4c18.1-4.2 36.2-13.3 50.6-25.2c11.1-9.4 27.3-10.1 39.2-1.7l0 0C136.7 373.2 165.1 384 192 384c27.5 0 55-10.6 77.5-26.1c11.1-7.9 25.9-7.9 37 0zm0-144C329 229.4 356.5 240 384 240c26.9 0 55.4-10.8 77.4-26.1l0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25C449.5 293.7 417 304 384 304c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4c18.1-4.2 36.2-13.3 50.6-25.2c11.1-9.5 27.3-10.1 39.2-1.7l0 0C136.7 229.2 165.1 240 192 240c27.5 0 55-10.6 77.5-26.1c11.1-7.9 25.9-7.9 37 0z'
    },
    underwater: {
        localStorageItem: 'underwaterVolume',
        title: 'Под водой',
        audio: underwater,
        viewBox: '0 0 512 512',
        svg_d: 'M315 144v21.75L292 160l-16 80H164c-49.154 16.385-81.254 27.1-102.578 34.846L52 256l-16-16v44.918C20.047 292.31 20 296.316 20 304c0 7.712.05 11.717 16 19.162V368l16-16 9.352-18.703c21.094 7.734 52.752 18.418 101.072 34.703H372c160-16 160-128 0-128h-16v-64l-23-5.75V144h-18zM148 263h256v18H148v-18z'
    },
}