"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSocket } from "@/contexts/SocketContext";
import "./style.scss";
const Chat = ({ friend_id }: { friend_id: string | number | undefined }) => {
  const { data: session } = useSession();
  const { socket, isConnected } = useSocket();
  const [chatHistory, setChatHistory] = useState<ChatHistoryMessages[]>([]);
  const [message, setMessage] = useState<string>("");

  const getChatHistory = async () => {
    try {
      const res = await fetch(
        // @ts-ignore
        `${process.env.NEXT_PUBLIC_API_URL}/auth/chat/${session?.user?.id}?friend_id=${friend_id}`
      );
      const data = (await res.json()) as ChatHistoryResponse;
      if (data?.ok) {
        setChatHistory(data?.chatHistory);
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : console.log(err));
    }
  };

  const sendMessage = async () => {
    const messageData: MessageDataProps = {
      // @ts-ignore
      from_user_id: session?.user?.id,
      sender_name: session?.user?.name,
      message_text: message,
      to_user_id: Number(friend_id),
    };
    try {
      const res = await fetch("/api/socket/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });
      const data = await res.json();
    } catch (err) {
      alert(err instanceof Error && console.log(err.message));
    }
  };

  useEffect(() => {
    getChatHistory();

    const handleMessage = (data: any) => {
      setChatHistory((prevChatHistory) => [...prevChatHistory, data]);
    };

    socket.on("message", handleMessage);

    // Cleanup
    return () => {
      socket.off("message", handleMessage);
    };
  }, []);

  console.log(chatHistory);

  return (
    <div className="chat-box__wrapper">
      <div className="chat-box__header">
        <div className="chat-box__header-left">Chat Room</div>
        <div className="chat-box__header-right"></div>
      </div>
      <div className="chat-box__body">
        {chatHistory?.map((chat) => {
          // @ts-ignore
          if (chat?.from_user_id !== session?.user?.id) {
            return (
              <div className="chat-box__body-left" key={chat.from_user_id}>
                <div className="chat-box__body-left__message">
                  <div className="chat-box__body-left__message__sender">
                    <div className="chat-box__body-left__message__sender__avatar"></div>
                    <div className="chat-box__body-left__message__sender__name">
                      {chat?.sender_name}
                    </div>
                  </div>
                  <div className="chat-box__body-left__message__content">
                    <p className="chat-box__body-left__message__content__text">
                      {chat?.message_text}
                    </p>
                    <div className="chat-box__body-left__message__content__time">
                      {new Date(chat?.timestamp).toDateString()}
                    </div>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div className="chat-box__body-right" key={chat.to_user_id}>
                <div className="chat-box__body-right__message">
                  <div className="chat-box__body-right__message__sender">
                    <div className="chat-box__body-right__message__sender__avatar"></div>
                    <div className="chat-box__body-right__message__sender__name">
                      {chat.sender_name}
                    </div>
                  </div>
                  <div className="chat-box__body-right__message__content">
                    <p className="chat-box__body-right__message__content__text">
                      {chat?.message_text}
                    </p>
                    <div className="chat-box__body-right__message__content__time">
                      {new Date(chat?.timestamp).toDateString()}
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })}
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
