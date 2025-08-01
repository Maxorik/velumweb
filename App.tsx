import React from 'react';
import ReactDOM from 'react-dom/client';
import { VideoBackground } from "./src/Background";
import { UserInterface } from "./src/Forms/Interface";
import { Window } from "./src/Components/Window";
import './style/main.scss'
import './style/phone.scss'

export const isMobile: boolean = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <>
        <VideoBackground />
        <UserInterface />
        {/*<Window id='test' title='hello' content={<span>это контент</span>}/>*/}
    </>
)
