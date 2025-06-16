/**
 * хелпер для получения и установления состояния элементов
 **/

/** получить расположение окна **/
export const getWindowPosition = (id: string) => {
    const savedPosition = localStorage.getItem(`velum-window-${id}`);
    return savedPosition ? JSON.parse(savedPosition) : null;
}

/** сохранить положение окна */
export const saveWindowPosition = (id: string, position: {x: number, y: number}) => {
    localStorage.setItem(`velum-window-${id}`, JSON.stringify(position))
}