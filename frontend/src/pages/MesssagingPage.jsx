import React, { useState, useEffect } from "react";

const MesssagingPage = () => {
  // Sample users with profile pictures
  const users = [
    { id: 1, name: "Alice", lastMessage: "Hey, how are you?", time: "10:42 AM", unread: 2 },
    { id: 2, name: "Bob", lastMessage: "Can we meet tomorrow?", time: "9:15 AM", unread: 0 },
    { id: 3, name: "Charlie", lastMessage: "I sent you the files", time: "Yesterday", unread: 0 },
    { id: 4, name: "David", lastMessage: "Let's catch up soon!", time: "Yesterday", unread: 1 },
    { id: 5, name: "Family Group", lastMessage: "Mom: Who's bringing dessert?", time: "Yesterday", unread: 5 },
    { id: 6, name: "Work Team", lastMessage: "Sarah: Meeting at 3pm", time: "3/22/25", unread: 0 },
  ];

  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState({
    1: [
      { text: "Hey there!", sender: "other", time: "10:30 AM" },
      { text: "How are you doing?", sender: "other", time: "10:31 AM" },
      { text: "I'm good, thanks! How about you?", sender: "me", time: "10:40 AM" },
      { text: "Hey, how are you?", sender: "other", time: "10:42 AM" },
    ],
    2: [
      { text: "Hi, do you have time to meet?", sender: "other", time: "9:10 AM" },
      { text: "Can we meet tomorrow?", sender: "other", time: "9:15 AM" }
    ]
  });
  const [input, setInput] = useState("");
  const [showUserList, setShowUserList] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const handleSendMessage = () => {
    if (input.trim() && selectedUser) {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      setMessages((prev) => ({
        ...prev,
        [selectedUser.id]: [
          ...(prev[selectedUser.id] || []),
          { text: input, sender: "me", time: timeString },
        ],
      }));
      setInput("");
    }
  };

  // Function to get initials for avatar
  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-900 text-white">
      {/* User List */}
      <div 
        className={`${isMobile ? 'fixed inset-0 z-10' : 'relative'} 
          md:w-1/3 lg:w-1/4 w-full bg-gray-800 border-r border-gray-700 transition-transform duration-300 
          ${isMobile && selectedUser ? '-translate-x-full' : 'translate-x-0'}`}
      >
        {/* App header */}
        <div className="bg-gray-900 text-white p-4 flex justify-between items-center border-b border-gray-700">
          <h2 className="text-xl font-medium">Vaartalapkaro</h2>
          <div className="flex space-x-3">
            <button className="text-gray-300 hover:text-white">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="text-gray-300 hover:text-white">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Search bar */}
        <div className="px-3 py-2 border-b border-gray-700">
          <div className="bg-gray-700 flex items-center rounded-lg px-3 py-1">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              className="bg-gray-700 ml-2 outline-none flex-1 py-1 text-white placeholder-gray-400"
              type="text"
              placeholder="Search or start new chat"
            />
          </div>
        </div>
        
        {/* Chat list */}
        <ul className="overflow-y-auto max-h-[calc(100%-116px)]">
          {users.map((user) => (
            <li
              key={user.id}
              className={`flex items-center px-3 py-3 border-b border-gray-700 cursor-pointer hover:bg-gray-700 ${
                selectedUser?.id === user.id ? "bg-gray-700" : ""
              }`}
              onClick={() => {
                setSelectedUser(user);
                if (isMobile) {
                  setShowUserList(false);
                }
              }}
            >
              {/* Avatar */}
              <div className="h-12 w-12 rounded-full bg-gray-600 flex items-center justify-center text-white font-medium flex-shrink-0">
                {getInitials(user.name)}
              </div>
              
              {/* Chat details */}
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-baseline">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs text-gray-400">{user.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-300 truncate">{user.lastMessage}</p>
                  {user.unread > 0 && (
                    <span className="bg-green-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-medium">
                      {user.unread}
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-900 relative">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="p-3 bg-gray-800 text-white flex items-center border-b border-gray-700">
              {isMobile && (
                <button
                  className="mr-2"
                  onClick={() => setSelectedUser(null)}
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-medium">
                {getInitials(selectedUser.name)}
              </div>
              <div className="ml-3 flex-1">
                <div className="font-medium">{selectedUser.name}</div>
                <div className="text-xs text-gray-300">online</div>
              </div>
              <div className="flex space-x-3">
                <button className="text-gray-300 hover:text-white">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </button>
                <button className="text-gray-300 hover:text-white">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                <button className="text-gray-300 hover:text-white">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Chat Background */}
            <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col">
              <div className="flex flex-col justify-end flex-1">
                {messages[selectedUser.id]?.map((msg, index) => (
                  <div
                    key={index}
                    className={`my-1 max-w-xs ${
                      msg.sender === "me" ? "self-end" : "self-start"
                    }`}
                  >
                    <div
                      className={`rounded-lg px-3 py-2 relative ${
                        msg.sender === "me"
                          ? "bg-green-800 text-white"
                          : "bg-gray-700 text-white"
                      }`}
                    >
                      {msg.text}
                      <div className="flex justify-end items-center mt-1 text-xs text-gray-300">
                        <span>{msg.time}</span>
                        {msg.sender === "me" && (
                          <span className="text-blue-400 ml-1">
                            ✓✓
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="p-3 bg-gray-800 flex items-center border-t border-gray-700">
              <button className="p-2 text-gray-400 hover:text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <button className="p-2 text-gray-400 hover:text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-2 mx-2 border border-gray-600 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
                placeholder="Type a message"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
              <button 
                onClick={handleSendMessage}
                className="p-2 text-gray-400 hover:text-white"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-gray-900 text-gray-300">
            <div className="h-40 w-40 mb-4 rounded-full bg-gray-800 flex items-center justify-center">
              <svg className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h2 className="text-xl font-medium mb-2">Vaartalapkaro</h2>
            <p className="text-center max-w-md px-4">
              Select a chat to start messaging
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MesssagingPage;