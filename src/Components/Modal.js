import React, { useState } from 'react';
import "./Modal.css";

function Modal({onClick,title,message}) {

 return (
    <div>
        <div className="modal">
          <div className="modal-content">
            <h2>{title}</h2>
            <p>{message}</p>

            <div className="modal-buttons">
              <button onClick={onClick}>Submit</button>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Modal;
