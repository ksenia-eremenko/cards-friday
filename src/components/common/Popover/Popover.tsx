import React, {useState} from 'react';
import {TbDotsVertical} from 'react-icons/tb';
import './Popover.scss';
import {HiOutlineDotsCircleHorizontal} from 'react-icons/hi';
import {AiFillEdit} from 'react-icons/ai';
import {MdOutlineDeleteForever} from 'react-icons/md';
import {GiHatchets} from 'react-icons/gi';

type PopoverPropsType = {
    onClickEdit?: () => void
    onClickDelete?: () => void
    onClickLearn?: () => void
}

const Popover = (props: PopoverPropsType) => {
    const [open, setOpen] = useState(false)
    return (
        <div className='popover-container' tabIndex={0} onClick={() => setOpen(!open)} onBlur={() => setOpen(false)}>
            {open
                ? <div className='popover'>
                    <HiOutlineDotsCircleHorizontal className='circle' size='26px' onBlur={()=>setOpen(false)}/>
                    <ul className={open ? 'popover-list' : 'popover-list' + ' ' + 'closed'}>
                        <li className="popover-item" onClick={props.onClickEdit}>
                            <AiFillEdit size='22px'/>
                            <span>Edit</span>
                        </li>
                        <li className="popover-item" onClick={props.onClickDelete}>
                            <MdOutlineDeleteForever size='22px'/>
                            <span>Delete</span>
                        </li>
                        <li className="popover-item" onClick={props.onClickLearn}>
                            <GiHatchets size='22px'/>
                            Learn
                        </li>
                    </ul>
                </div>
                : <TbDotsVertical className='dots' size='14px'/>
            }
        </div>

    );
};

export default Popover;
