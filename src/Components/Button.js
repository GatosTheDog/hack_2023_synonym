import React from "react";
import "./Button.css";


const Button =({onClick,name})=>{
    return (
    <div>
        <button 
        onClick={onClick}
        className="buttonContainer"
        >
            {name}
        </button>
    </div>
    )
}

export default Button;