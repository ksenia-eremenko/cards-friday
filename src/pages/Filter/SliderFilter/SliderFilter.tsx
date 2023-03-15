import React, {ChangeEvent, useEffect, useState} from 'react';
import './SliderFilter.scss';
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {getPacks, setMax, setMin} from "../../../store/packs-reducer";


function useDebounce(num1: number, num2: number, delay: number = 800) {
    const [debouncedValue, setDebouncedValue] = useState([num1, num2]);
    useEffect(
        () => {
            const handler = setTimeout(() => {
                setDebouncedValue([num1, num2]);
            }, delay);

            return () => {
                clearTimeout(handler);
            };
        },
        [num1, num2, delay]
    );
    return debouncedValue;
}


const SliderFilter = () => {

    const minCardCount = useAppSelector(state => state.packs.queryParams.min)
    const maxCardCount = useAppSelector(state => state.packs.queryParams.max)

    const dispatch = useAppDispatch();


    const [value1, setValue1] = useState(minCardCount);
    const [value2, setValue2] = useState(maxCardCount);
    const debouncedSearchTerm = useDebounce(value1, value2, 1500);


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const min = parseInt(e.currentTarget.value);
        setValue1(min)
    }

    const onChangeHandler2 = (e: ChangeEvent<HTMLInputElement>) => {
        const max = parseInt(e.currentTarget.value);
        setValue2(max)
    }


    useEffect(
        () => {
            dispatch(setMin(value1))
            dispatch(setMax(value2))
            dispatch(getPacks())
        },
        [debouncedSearchTerm]
    );

    return (
        <div className={'slider-container'}>
            <div className={'slider-title b-title bt14 medium'}>Number of cards</div>
            <div className={'slider-wrapper'}>
                <span className="output outputOne b-title bt14 medium">{value1}</span>
                <span className="output outputTwo b-title bt14 medium">{value2}</span>
                <div className="range-slider">
                    <span className="full-range"></span>
                    <span className="incl-range" style={{width: `${value2 - value1}%`, left: `${value1}%`}}></span>

                    <input name="rangeOne" onChange={onChangeHandler} value={value1} type="range"/>

                    <input name="rangeTwo" onChange={onChangeHandler2} value={value2} type="range"/>

                </div>
            </div>
        </div>
    );
};

export default SliderFilter;