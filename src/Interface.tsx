import { FC } from 'react'
import { MusicInterface } from "./MusicInterface";
import '../style/iface.scss'

export const UserInterface: FC = () => {
    return(
        <div className='iface-main-container'>
            <div className='iface-spacer' />
            <MusicInterface />
        </div>
    )
}

