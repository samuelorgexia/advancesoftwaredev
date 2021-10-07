import React, {Fragment, useState, useEffect} from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';

function LiveChat( {socket, username, room} ) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]); // sets message list to current data and then adds the new data
            
        });
    }, [socket]);

    return (
        <div>

            <div className="chat-window">
            <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
                    <div className="flex items-center space-x-4">
                        <div className="flex flex-col leading-tight">
                            <div className="text-2xl mt-1 flex items-center">
                                <span className="text-gray-700 mr-3"> Live Chat</span>
                                <span className="text-green-500">
                                    <svg width="10" height="10">
                                        <circle cx="5" cy="5" r="5" fill="currentColor"></circle>
                                    </svg>
                                </span>
                            </div>
                            <span className="text-lg text-gray-600"> </span>
                        </div>
                    </div>
                </div>
                <div className="chat-body">
                    <ScrollToBottom className="message-container">
                        {messageList.map((messageContent) => {
                            return (
                                <div className="message" id={username === messageContent.author ? "you" : "other"}>
                                    <div>
                                        <div className="message-content">
                                                <p>{messageContent.message}</p>
                                        </div>
                                        <div className="message-meta">
                                            <p id="time">{messageContent.time}</p>
                                            <p id="author">{messageContent.author}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </ScrollToBottom>
                </div>
            </div>
            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                    <div className="relative flex">

                            <input 
                                className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-full py-3"
                                placeholder="Write Something" 
                                type="text" 
                                value={currentMessage}
                                placeholder="Write Something"
                                onChange={(event) => {
                                    setCurrentMessage(event.target.value);
                                }}
                                onKeyPress={(event) => {
                                    event.key === "Enter" && sendMessage();
                                }}
                            />
                        <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                            <button 
                                onClick={sendMessage}
                                type="button" 
                                className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 transform rotate-90">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                            </svg>
                            </button>
                        </div>
                    </div>
                </div>
            {/* <div>
                <input 
                    type="text" 
                    value={currentMessage}
                    placeholder="test.."
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div> */}

            {/* <div className="flex-1 justify-between flex flex-col h-screen">
                <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
                    <div className="flex items-center space-x-4">
                        <div className="flex flex-col leading-tight">
                            <div className="text-2xl mt-1 flex items-center">
                                <span className="text-gray-700 mr-3"> Live Chat</span>
                                <span className="text-green-500">
                                    <svg width="10" height="10">
                                        <circle cx="5" cy="5" r="5" fill="currentColor"></circle>
                                    </svg>
                                </span>
                            </div>
                            <span className="text-lg text-gray-600"> </span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                        <div className="flex items-end">
                            <div className="mt-0 flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                                <div className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                                    {messageList.map((messageContent) => {
                                        return (
                                            <div className="h-auto ">
                                                <div className="md:w-auto h-auto break-all">
                                                    <p>{messageContent.message}</p>
                                                </div>
                                            <div>
                                                <p>{messageContent.time} {messageContent.author}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                    <div className="relative flex">

                            <input 
                                className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-full py-3"
                                placeholder="Write Something" 
                                type="text" 
                                value={currentMessage}
                                placeholder="test.."
                                onChange={(event) => {
                                    setCurrentMessage(event.target.value);
                                }}
                                onKeyPress={(event) => {
                                    event.key === "Enter" && sendMessage();
                                }}
                            />
                        <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                            <button 
                                onClick={sendMessage}
                                type="button" 
                                className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 transform rotate-90">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                            </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>         */}




        </div>
    )
}

export default LiveChat
