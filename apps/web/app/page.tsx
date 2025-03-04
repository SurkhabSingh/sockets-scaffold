"use client";
import { useState } from "react";
import { useSocket } from "../context/SocketContext";
import classes from "./page.module.css";

export default function Page() {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState("");
  return (
    <div>
      <div>
        <input
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message..."
          className={classes["chat-input"]}
        />
        <button
          onClick={(e) => sendMessage(message)}
          className={classes["button"]}
        >
          Send
        </button>
        <div>
          {messages.map((e) => (
            <li>{e}</li>
          ))}
        </div>
      </div>
    </div>
  );
}
