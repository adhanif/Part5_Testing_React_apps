import React from "react";
import PropTypes from "prop-types";
import { useState, forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideVisibility = { display: visible ? "none" : "" };
  const showVisibility = { display: visible ? "" : "none" };

  const handleVisiblity = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      handleVisiblity,
    };
  });

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  };

  return (
    <div>
      <div style={hideVisibility}>
        <button onClick={handleVisiblity} className="newBlog">{props.buttonLabel}</button>
      </div>
      <div style={showVisibility}>
        {props.children}
        <button onClick={handleVisiblity}>cancel</button>
      </div>
    </div>
  );
});
Togglable.displayName = "Togglable";
export default Togglable;
