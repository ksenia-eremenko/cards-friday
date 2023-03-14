import React from 'react';
import './SliderFilter.scss';

const SliderFilter = () => {
    return (
        <div className={'slider-container'}>
            <div className={'slider-title b-title bt14 medium'}>Number of cards</div>
            <div className={'slider-wrapper'}>
                <span className="output outputOne b-title bt14 medium">2</span>
                <span className="output outputTwo b-title bt14 medium">10</span>
                <div className="range-slider">

                    <span className="full-range"></span>
                    <span className="incl-range"></span>
                    <input name="rangeOne" value="20" min="0" max="100" step="1" type="range"/>
                    <input name="rangeTwo" value="90" min="0" max="100" step="1" type="range"/>
                </div>

            </div>

        </div>
    );
};

export default SliderFilter;