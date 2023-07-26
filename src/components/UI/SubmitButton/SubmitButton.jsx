import React from "react";

const SubmitButton = (props) => {
  return (
    <button type="submit" className="popup__submit-button" {...props}>
      {props.children}
    </button>
  );
}

export default SubmitButton;
