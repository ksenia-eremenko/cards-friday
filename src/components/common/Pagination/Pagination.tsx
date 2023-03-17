import React, {useEffect, useState} from 'react';
import './Pagination.scss';
import {SlArrowLeft, SlArrowRight} from 'react-icons/sl';
import useDebounce from '../../../utils/hooks/useDebounce';

type PaginationPropsType = {
    totalItemsCount: number | undefined
    currentPage: number
    onPageChanged: (page: number) => void
    pageCount: number
}

export const Pagination = React.memo((props: PaginationPropsType) => {
    const [localCurrentPage, setLocalCurrentPage] = useState(props.currentPage)
    const debouncedCurrentPage = useDebounce<number>(localCurrentPage, 1000)

    const [portionOfButtons, setPortionOfButtons] = useState(1);
    const debouncedPortionOfButtons = useDebounce<number>(portionOfButtons)

    let pagesInPortion = props.pageCount;
    let portionSize = 10;
    let numberOfPages = 0;

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
        setLocalCurrentPage(firstPortionPageNumber - 1)
        setPortionOfButtons(portionOfButtons - 1)
    }

    const onNextButtonClickHandler = () => {
        setLocalCurrentPage(lastPortionPageNumber + 1)
        setPortionOfButtons(portionOfButtons + 1)
    }

    const Variant1 = () => {
        return <>
            {filteredPages.slice(0, 5).map((p: number, i) => {
                return <button key={i}
                               className={localCurrentPage === p ? 'styled-btn-1 button' + ' ' + 'currentPage' : 'styled-btn-1 button'}
                               onClick={() => {
                                   setLocalCurrentPage(p)
                               }}>{p}</button>
            })
            }
            <button className="styled-btn-1 button">...</button>
            <button
                className={localCurrentPage === filteredPages[filteredPages.length - 1]
                    ? 'styled-btn-1 button' + ' ' + 'currentPage'
                    : 'styled-btn-1 button'}
                onClick={() => setLocalCurrentPage(filteredPages[filteredPages.length - 1])}
            >{filteredPages[filteredPages.length - 1]}</button>
        </>
    }

    const Variant2 = () => {
        return <>
            <button
                className={localCurrentPage === filteredPages[0]
                    ? 'styled-btn-1 button' + ' ' + 'currentPage'
                    : 'styled-btn-1 button'}
                onClick={() => setLocalCurrentPage(filteredPages[0])}
            >{filteredPages[0]}</button>
            <button className="styled-btn-1 button">...</button>
            {filteredPages.slice(5, 10).map((p: number, i) => {
                return <button key={i}
                               className={localCurrentPage === p ? 'styled-btn-1 button' + ' ' + 'currentPage' : 'styled-btn-1 button'}
                               onClick={() => {
                                   setLocalCurrentPage(p)
                               }}>{p}</button>
            })
            }
        </>
    }

    useEffect(() => {
        props.onPageChanged(debouncedCurrentPage)
    }, [debouncedCurrentPage, debouncedPortionOfButtons])

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
                                   className={localCurrentPage === p ? 'styled-btn-1 button' + ' ' + 'currentPage' : 'styled-btn-1 button'}
                                   onClick={() => {
                                       setLocalCurrentPage(p)
                                   }}>{p}</button>
                })
                : localCurrentPage <= (firstPortionPageNumber + 4) ? <Variant1/> : <Variant2/>
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
