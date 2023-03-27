import React from 'react';
import avatar from '../../../assets/images/image-2.png';

type PropsType = {
    image: string
}

const Avatar = ({image}: PropsType) => {
    return (
        <div className="avatar">
            <img src={image ? image : avatar} alt="avatar" />
        </div>
    );
};

export default Avatar;
