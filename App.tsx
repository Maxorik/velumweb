import React from 'react';
import ReactDOM from 'react-dom/client';

import lofi_33 from './assets/video/lofi_33.mp4'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <video src={lofi_33} class="main-bg" loop autoplay='true' muted playsinline/>
)