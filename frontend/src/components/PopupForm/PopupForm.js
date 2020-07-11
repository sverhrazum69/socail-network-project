import React from "react";
import Popup from "reactjs-popup";
import './PopupForm.css'
import InputForm from "../Form/Form";

const PopupForm = props => (
<Popup trigger={<button className="button"> Open Modal </button>} modal>
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> Edit data </div>
        <div className="content">
          {" "}
            <InputForm placeholderValues = {props.placeholderValues} exit={close}/>  
        </div>
        <div className="actions">

          <Popup
            trigger={<button className="button"> Trigger </button>}
            position="top center"
            closeOnDocumentClick
          >
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
              magni omnis delectus nemo, maxime molestiae dolorem numquam
              mollitia, voluptate ea, accusamus excepturi deleniti ratione
              sapiente! Laudantium, aperiam doloribus. Odit, aut.
            </span>
          </Popup>
          <button
            className="button"
            onClick={() => {
              console.log("modal closed ");
              close();
            }}
          >
            close modal
          </button>
        </div>
      </div>
    )}
  </Popup>
);

export default PopupForm