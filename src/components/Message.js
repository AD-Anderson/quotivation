import React from "react";

const Message = ({ messageText, removeMessage }) => {
  return (
    <div className="message">
      <p>{messageText}</p>
      <span className="close-messsage" onClick={removeMessage}>
        X
      </span>
    </div>
  );
};

export default Message;
