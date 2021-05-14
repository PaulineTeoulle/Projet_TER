import React, {useState} from 'react';
import robotError from '../public/robotError.svg'


function Warning({message}) {    
    return (
        <div className="Warning">
            <div>
                <img src={robotError} alt="logo error"/>
            </div>
            <p>This website is only viewable in landscape mode</p>
        </div>
    );
}

export default Warning;
