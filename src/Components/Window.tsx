import React, {useState, FC, useRef, Ref, useEffect, ReactNode} from "react";
import { saveWindowPosition, getWindowPosition } from '../Utils/SnapshotHelper'
import '../../style/window.scss'

interface IPosition {
    x: number,
    y: number
}

interface IWindowProps {
    id: string,
    title?: string,
    content?: ReactNode
}

export const Window: FC<IWindowProps> = ({ id, title, content}) => {
    const [position, setPosition] = useState<IPosition>({ x: 200, y: 200 });
    const boxRef: Ref<HTMLDivElement> = useRef(null);
    const offset: Ref<IPosition> = useRef({ x: 0, y:0 });
    const isDragging: Ref<boolean> = useRef(false);
    const currentPosition: Ref<IPosition> = useRef(position);

    /** проверяем, двигали ли это окно прежде */
    useEffect(() => {
        const savedPosition = getWindowPosition(id);
        if (savedPosition) setPosition(savedPosition);
    }, [id])

    useEffect(() => {
        currentPosition.current = position;
    }, [position])

    const startDragging = (event) => {
        isDragging.current = true;
        offset.current = {
            x: event.clientX - position.x,
            y: event.clientY - position.y,
        };

        document.addEventListener("mousemove", moveWindow);
        document.addEventListener("mouseup", stopDragging);
    }

    const moveWindow = (event) => {
        if (!isDragging.current) return;
        const newX = event.clientX - offset.current.x;
        const newY = event.clientY - offset.current.y;
        const newPosition = { x: newX, y: newY }
        setPosition(newPosition)
    }

    const stopDragging = (event) => {
        isDragging.current = false;
        saveWindowPosition(id, currentPosition.current);
        document.removeEventListener("mousemove", moveWindow);
        document.removeEventListener("mouseup", stopDragging);
    }

    return (
        <div
            ref={boxRef}
            className='modal'
            onMouseDown={startDragging}
            style={{
                top: position.y,
                left: position.x
            }}
        >
            <div className='window-header'>
                { <span className='window-title'> title </span> }
                <div className='window-header-iface'>
                    <div className='window-header-btn btn-hide'/>
                    <div className='window-header-btn btn-close'/>
                </div>
            </div>
            <hr />
            { content }
        </div>
    );
};