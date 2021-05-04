import React, {useState} from 'react';

import Issues from '../components/quiz/issues';
import Historic from '../components/quiz/historic';

function Quiz() {

    const tree = [1,2,3,4];
    const [CurrentIssue, setCurrentIssue] = useState(0);

    function changeData(element){
        setCurrentIssue(element);
    }

    return (
        <div className="Quiz">
            <Issues data={CurrentIssue} changeData={changeData}/>
            <Historic/>
        </div>
    );
}


export default Quiz;
