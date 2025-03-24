import React, { useState } from "react";

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "David" },
];

const MessagingPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim() && selectedUser) {
      setMessages((prev) => ({
        ...prev,
        [selectedUser.id]: [...(prev[selectedUser.id] || []), { text: input, sender: "me" }],
      }));
      setInput("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* User List */}
      <div className="w-1/4 bg-gray-800 border-r border-gray-700 p-4">
        <h2 className="text-xl font-semibold mb-4">Messages</h2>
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              className={`p-2 cursor-pointer rounded-lg ${selectedUser?.id === user.id ? "bg-blue-700" : "hover:bg-gray-700"}`}
              onClick={() => setSelectedUser(user)}
            >
              {user.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div className="w-3/4 flex flex-col bg-gray-850">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-gray-800 border-b border-gray-700 font-semibold text-lg">
              Chat with {selectedUser.name}
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {messages[selectedUser.id]?.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 rounded-lg max-w-xs ${msg.sender === "me" ? "bg-blue-600 text-white self-end ml-auto" : "bg-gray-700 text-white"}`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 bg-gray-800 border-t border-gray-700 flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-2 border border-gray-600 bg-gray-700 text-white rounded-lg mr-2"
                placeholder="Type a message..."
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagingPage;