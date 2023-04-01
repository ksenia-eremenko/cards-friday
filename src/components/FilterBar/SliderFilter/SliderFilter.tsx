import React, {ChangeEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {resetFilter, setMax, setMin} from "../../../store/packs-reducer";


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
    const min = useAppSelector(state => state.packs.minCardsCount)
    const max = useAppSelector(state => state.packs.maxCardsCount)
    const isReset = useAppSelector(state => state.packs.isReset)

    const dispatch = useAppDispatch();

    const [value1, setValue1] = useState(min);
    const [value2, setValue2] = useState(max);
    console.log(max)

    const debouncedSearchTerm = useDebounce(value1, value2, 1500);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const min = parseInt(e.currentTarget.value);
        setValue1(min)

    }

    const onChangeHandler2 = (e: ChangeEvent<HTMLInputElement>) => {
        const max = parseInt(e.currentTarget.value);
        setValue2(max)
    }

    useEffect(() => {
        if (isReset) {
            setValue1(min)
            setValue2(max)
        }
        isReset && dispatch(resetFilter(false))
    }, [dispatch, isReset])

    useEffect(
        () => {
            dispatch(setMin(value1))
            dispatch(setMax(value2))

        },
        [debouncedSearchTerm]
    );


    return (
        <div className={'slider-container'}>
            <div className={'slider-title b-title bt14 medium'}>Number of cards</div>
            <div className={'slider-wrapper'}>
                <span className="output outputOne b-title bt14 medium">{value1}</span>
                <div className="range">
                    <div className="range-slider">
                        <span className="full-range">
                            <span className="incl-range"
                                  style={{width: `${value2 - value1}%`, maxWidth: '110%', left: `${value1}%`}}></span>
                        </span>
                        <input className='rangeOne' name="rangeOne" onChange={onChangeHandler} value={value1}
                               type="range"/>
                        <input className='rangeTwo' name="rangeTwo" onChange={onChangeHandler2} value={value2}
                               type="range"/>
                    </div>
                </div>
                <span className="output outputTwo b-title bt14 medium">{value2}</span>
            </div>
        </div>
    );
};

export default SliderFilter;