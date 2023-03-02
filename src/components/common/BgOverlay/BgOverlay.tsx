import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useCallback } from 'react';
import { setAppOpenMenuAC } from '../../../store/app-reducer';
import { useAppDispatch, useAppSelector } from '../../../store/store';
const BgOverlay = () => {
    const openMenu = useAppSelector(state => state.app.openMenu)
    const dispatch = useAppDispatch()

    const resizeHandler = useCallback(() => {
        if (window.matchMedia('(min-width: 767px)').matches) {
            dispatch(setAppOpenMenuAC(false));
        }
    }, [dispatch])

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', () => resizeHandler);
        };
    }, [resizeHandler]);

    const onClickHandler = () => {
        dispatch(setAppOpenMenuAC(false));
    }

    return <div className={classNames(
        'bg-overlay',
        { active: openMenu }
    )} onClick={onClickHandler}></div>
};

export default BgOverlay;