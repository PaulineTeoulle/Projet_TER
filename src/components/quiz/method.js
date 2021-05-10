import React from 'react';

function Method(props) {

    function finish(){
        props.changeData(0);
    }

    function resume(){
        props.resumeQuiz();
    }

    return (
        <div className="Method">
            {props.method.Libelle}
            <button onClick={finish}>finish</button>
            <button onClick={resume}>continue</button>
        </div>
    );
}

export default Method;
