import React, { useState } from "react";
import './LetterButton.css';

const LetterButton=({onClick,letter})=>{
    const [disabled,setDisabled]=useState(false);
    const handleClick = ()=>{
        onClick(letter);
        setDisabled(true);
    }
    return (
        <div className="button">
            <button
             style={{
                boxShadow: '2px 2px 1px #0a051a',
                margin:2,
                color:!disabled?"black":"gray"
            }}
            disabled={disabled}

             onClick={()=>handleClick()}>{letter}</button>
        </div>
    )
}

export default LetterButton;
