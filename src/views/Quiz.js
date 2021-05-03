import React from 'react';

import Issues from '../components/quiz/issues';
import Historic from '../components/quiz/historic';

function Quiz() {
    return (
        <div className="Quiz">
            <h1>Quiz page</h1>
            <Issues/>
            <Historic/>
        </div>
    );
}


export default Quiz;
