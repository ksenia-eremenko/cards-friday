import React from 'react';
import {Pagination} from '../../components/common/Pagination/Pagination';
import Select from '../../components/common/Select/Select';

type PaginationBlockPropsType = {
    totalItemsCount?: number | undefined
    currentPage: number
    onPageChanged: (page: number) => void
    onChangeSelect: (option: number) => void
    pageCount: number
}

const selectOptions = [
    { id: 1, value: 5 },
    { id: 2, value: 10 },
    { id: 3, value: 15 },
    { id: 4, value: 20 }
]

const PaginationBlock = (props: PaginationBlockPropsType) => {
    return (
        <div className='pagination-block'>
            <Pagination
                totalItemsCount={props.totalItemsCount}
                currentPage={props.currentPage}
                onPageChanged={props.onPageChanged}
                pageCount={props.pageCount}
            />
            <div className='select-block'>
                Show
                <Select options={selectOptions} onChangeSelect={(option: number) => props.onChangeSelect(option)} defaultValue={props.pageCount}/>
                Cards per Page
            </div>
        </div>
    );
};

export default PaginationBlock;
