import ReactDOM from 'react-dom/client';
import { VideoBackground } from "./src/Background";
import { UserInterface } from "./src/Interface";
import './style/main.scss'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <>
        <VideoBackground />
        <UserInterface />
    </>
)
