import React from "react";
import './LetterButton.css';

const LetterButton=({onClick,letterObject})=>{
    return (
        <div className="button">
            <button
            className="buttonInline"
             style={{
                boxShadow: '2px 2px 1px #0a051a',
                margin:2,
                color:!letterObject.isDisabled?"black":"gray"
            }}
            disabled={letterObject.isDisabled}
             onClick={()=>onClick(letterObject)}>{letterObject.letter}</button>
        </div>
    )
}

export default LetterButton;
