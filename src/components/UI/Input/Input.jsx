import React from "react";

const Input = React.forwardRef( ({onChange, ...props}, ref) => {

  function handleChange(event){
    onChange(event);
  }

  return (
    <>
      <input
        {...props}
        autoComplete="off"
        required
        onChange={handleChange}
        ref={ref}
      />
      <span id={`error-${props.id}`} className="popup__error-message" />
    </>

  );
});

export default Input;
