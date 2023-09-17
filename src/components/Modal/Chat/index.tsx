"use client";
import { useState } from "react";
import "./style.scss";
const Chat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");
  const sendMessage = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  return (
    <div className="chat-box__wrapper">
      <div className="chat-box__header">
        <div className="chat-box__header-left">Chat Room</div>
        <div className="chat-box__header-right"></div>
      </div>
      <div className="chat-box__body">
        <div className="chat-box__body-left">
          <div className="chat-box__body-left__message">
            <div className="chat-box__body-left__message__sender">
              <div className="chat-box__body-left__message__sender__avatar"></div>
              <div className="chat-box__body-left__message__sender__name">
                John Doe
              </div>
            </div>
            <div className="chat-box__body-left__message__content">
              <p className="chat-box__body-right__message__content__text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, voluptatum.
              </p>
              <div className="chat-box__body-left__message__content__time">
                11:51pm
              </div>
            </div>
          </div>
        </div>
        <div className="chat-box__body-right">
          <div className="chat-box__body-right__message">
            <div className="chat-box__body-right__message__sender">
              <div className="chat-box__body-right__message__sender__avatar"></div>
              <div className="chat-box__body-right__message__sender__name">
                Ryan Garcia
              </div>
            </div>
            <div className="chat-box__body-right__message__content">
              <p className="chat-box__body-right__message__content__text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, voluptatum.
              </p>
              <div className="chat-box__body-right__message__content__time">
                11:50pm
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="chat-box__footer">
        <div className="chat-box__footer-left">
          <textarea
            name="sender-input"
            className="chat-box__footer-left__input"
            onChange={(e) => setMessage(e.currentTarget.value)}
          ></textarea>
        </div>
        <div className="chat-box__footer-right">
          <button
            className="chat-box__footer-right__button"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
