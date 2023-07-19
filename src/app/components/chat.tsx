"use client";

import { useChat } from "ai/react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import SendButton from "./SendButton";
import RegenerateButton from "./RegenerateButton";
import StopButton from "./StopButton";
import UserIcon from "./UserIcon";
import AiIcon from "./AiIcon";

const Chat = () => {
  const messageEndRef = useRef<HTMLLIElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    reload,
  } = useChat({
    api: "/api/chat",
  });

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [messages]);

  return (
    <div className="relative w-full h-screen flex flex-col items-center">
      <div className="w-full text-gray-900 text-md rounded-lg flex justify-center overflow-scroll h-[85%] relative">
        {messages.length === 0 ? (
          <div className="text-sky-200 w-full flex justify-center items-center flex-col text-xl ">
            <p className="border p-6 border-gray-200 rounded-xl underline-offset-8 underline">
              Welcome to the AI Chatbot. 🧠 <br />
            </p>
            <p className="my-6">
              This Chatbot is focused on <strong>FOOD</strong> and{" "}
              <strong>COOKING</strong>.🍔🥗
            </p>
          </div>
        ) : (
          <ul className="p-0 w-full transition duration-200">
            {messages.map((item, index) => (
              <div
                className={clsx(
                  item.role === "user"
                    ? "flex text-green-200 bg-gray-800"
                    : "flex bg-gray-700 w-full"
                )}
              >
                <div className="flex justify-center items-start my-6 mx-4">
                  {item.role === "user" ? <UserIcon /> : <AiIcon />}
                  <span
                    className={clsx(
                      item.role === "user" ? "text-green-200" : "text-sky-200"
                    )}
                  >
                    :
                  </span>
                </div>
                <li
                  key={index}
                  className={clsx(
                    item.role === "user"
                      ? "text-green-200 my-2 bg-gray-800 p-4 pl-2 text-justify"
                      : "text-sky-200 my-1 bg-gray-700 p-4 rounded-md pl-2 pr-10 w-full text-justify"
                  )}
                >
                  <article ref={messageEndRef} className="prose">
                    <ReactMarkdown>{item.content}</ReactMarkdown>
                  </article>
                </li>
              </div>
            ))}
          </ul>
        )}
      </div>
      <div className="w-4/6 md:w-1/2 p-4 absolute bottom-0 mb-2">
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="w-full my-2 flex justify-center">
            {isLoading && (
              <button
                onClick={stop}
                title="Stop Generating"
                className="text-gray-300 flex"
              >
                <StopButton />
                Stop
              </button>
            )}
            <></>
            {/* // TODO: Add REGENERATE RESPONSE button.
              // <button
              //   onClick={reload}
              //   title="Regenerate Response"
              //   className="text-gray-300 flex"
              // >
              //   <RegenerateButton /> Regenerate Response
              // </button> */}
          </div>
          <div className="relative flex items-center">
            <input
              value={input}
              disabled={isLoading}
              onChange={handleInputChange}
              type="text"
              id="chat"
              className="text-gray-100 rounded-lg block w-full p-3 bg-gray-700 placeholder:text-gray-400 font-light"
              placeholder="Send a message"
              autoComplete="off"
              required
            />
            <button
              type="submit"
              className="text-gray-300 hover:text-blue-600 rounded-lg text-md sm:w-auto text-center transition duration-200 absolute right-0 px-2"
              title="Send"
            >
              <SendButton />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
