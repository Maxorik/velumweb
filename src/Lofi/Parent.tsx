import {useState, FC} from "react";
import {LofiPlayer} from "./LofiPlayer";
import {VolumeSettings} from "./VolumeSettings";
import {Ambient} from "./Ambient";

export const MusicInterface: FC = () => {
    const baseVolume: number = +localStorage.getItem('masterVolume') || 0.5;
    const [volume, setVolume] = useState<number>(baseVolume);

    return(
        <div className='iface-group-container'>
            <LofiPlayer volume={volume} />
            <VolumeSettings volume={volume} setVolume={setVolume} />
            <Ambient />
        </div>
    )
}