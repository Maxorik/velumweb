import ReactDOM from 'react-dom/client';
import { VideoBackground } from "./src/Background";
import { UserInterface } from "./src/Interface";
import { Window } from "./src/Components/Window";
import './style/main.scss'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <>
        <VideoBackground />
        <UserInterface />
        <Window id='test' title='hello'/>
    </>
)
