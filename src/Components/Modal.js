import React from 'react';
import "./Modal.css";

function Modal({onClick,title,message,onGoBack,successButton}) {

 return (
    <div>
        <div className="modal">
          <div className="modal-content">
            <h2>{title}</h2>
            <p>{message}</p>

            <div className="modal-buttons">
              <button onClick={onClick}>{successButton}</button>
            </div>
            {onGoBack && <div className="modal-buttons">
              <button onClick={onGoBack}>Go Back</button>
            </div>}
          </div>
        </div>
    </div>
  );
}

export default Modal;
