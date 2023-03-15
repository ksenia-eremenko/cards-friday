import React, {useEffect, useState} from 'react';
import './Pagination.scss';
import {SlArrowLeft, SlArrowRight} from 'react-icons/sl';

type PaginationPropsType = {
    totalItemsCount: number | undefined
    currentPage: number
    onPageChanged: (page: number) => void
    pageCount: number
}

export const Pagination = React.memo((props: PaginationPropsType) => {
    let pagesInPortion = props.pageCount;
    let portionSize = 10;
    let numberOfPages = 0;
    let [portionOfButtons, setPortionOfButtons] = useState(1);
    if (props.totalItemsCount) {
        numberOfPages = Math.ceil(props.totalItemsCount / pagesInPortion)
    }


    const pages: number[] = []
    for (let i = 1; i <= numberOfPages; i++) {
        pages.push(i)
    }
    let firstPortionPageNumber = (portionOfButtons - 1) * portionSize + 1

    let lastPortionPageNumber = portionOfButtons * portionSize

    let filteredPages = pages.filter(p => p >= firstPortionPageNumber && p <= lastPortionPageNumber)

    const onPrevButtonClickHandler = () => {
        props.onPageChanged(lastPortionPageNumber)
        setPortionOfButtons(portionOfButtons - 1)
    }

    const onNextButtonClickHandler = () => {
        props.onPageChanged(firstPortionPageNumber)
        setPortionOfButtons(portionOfButtons + 1)
    }

    const Variant1 = () => {
        return <>
            {filteredPages.slice(0, 5).map((p: number, i) => {
                return <button key={i}
                               className={props.currentPage === p ? 'styled-btn-1 button' + ' ' + 'currentPage' : 'styled-btn-1 button'}
                               onClick={() => {
                                   props.onPageChanged(p)
                               }}>{p}</button>
            })
            }
            <button className="styled-btn-1 button">...</button>
            <button
                className={props.currentPage === filteredPages[filteredPages.length - 1]
                    ? 'styled-btn-1 button' + ' ' + 'currentPage'
                    : 'styled-btn-1 button'}
                onClick={() => props.onPageChanged(filteredPages[filteredPages.length - 1])}
            >{filteredPages[filteredPages.length - 1]}</button>
        </>
    }

    const Variant2 = () => {
        return <>
            <button
                className={props.currentPage === filteredPages[0]
                    ? 'styled-btn-1 button' + ' ' + 'currentPage'
                    : 'styled-btn-1 button'}
                onClick={() => props.onPageChanged(filteredPages[0])}
            >{filteredPages[0]}</button>
            <button className="styled-btn-1 button">...</button>
            {filteredPages.slice(5, 10).map((p: number, i) => {
                return <button key={i}
                               className={props.currentPage === p ? 'styled-btn-1 button' + ' ' + 'currentPage' : 'styled-btn-1 button'}
                               onClick={() => {
                                   props.onPageChanged(p)
                               }}>{p}</button>
            })
            }
        </>
    }

    useEffect(() => {
        props.onPageChanged(firstPortionPageNumber)
    }, [portionOfButtons])

    return (
        <div className="pagination">
            <button
                className="styled-btn-1 button"
                disabled={portionOfButtons <= 1}
                onClick={onPrevButtonClickHandler}
            >
                <SlArrowLeft/></button>
            {filteredPages.length < 10
                ? filteredPages.map((p: number, i) => {
                    return <button key={i}
                                   className={props.currentPage === p ? 'styled-btn-1 button' + ' ' + 'currentPage' : 'styled-btn-1 button'}
                                   onClick={() => {
                                       props.onPageChanged(p)
                                   }}>{p}</button>
                })
                : props.currentPage <= (firstPortionPageNumber + 4) ? <Variant1/> : <Variant2/>
            }
            <button
                className="styled-btn-1 button"
                disabled={pages[pages.length - 1] === filteredPages[filteredPages.length - 1]}
                onClick={onNextButtonClickHandler}
            >
                <SlArrowRight/></button>
        </div>
    )
})
