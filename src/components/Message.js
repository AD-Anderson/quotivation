import React, { useEffect } from "react";

const Message = ({ messageText, removeMessage }) => {
  useEffect(() => {
    const messageTimeout = setTimeout(() => {
      removeMessage();
    }, 1500);

    window.setTimeout(messageTimeout);

    return () => window.clearTimeout(messageTimeout);
  });
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
