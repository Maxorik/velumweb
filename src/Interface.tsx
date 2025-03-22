import { FC } from 'react'
import { MusicInterface } from "./Lofi/Parent";
import '../style/iface.scss'

export const UserInterface: FC = () => {
    return(
        <div className='iface-main-container'>
            <div className='iface-spacer' />
            <MusicInterface />
            <div className='divider' />
        </div>
    )
}

