"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Send, ArrowUp, X, Search } from 'lucide-react';
import { SidebarDemo } from '@/components/Sidebar';
import ProtectedRoute from '@/components/protectedRoute';
import { askTutor, getChatHistory } from "@/api/chat";

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [sessionId, setSessionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isChatListOpen, setIsChatListOpen] = useState(false);
  const [searchChat, setSearchChat] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [context, setContext] = useState('General');

  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchHistory = async () => {
      if (!token) return;
      
      try {
        const history = await getChatHistory(token);
        if (history && history.length > 0) {
          setChatHistory(history);
          // Load the most recent chat by default
          const mostRecentChat = history[0];
          setMessages(mostRecentChat.messages || []);
          setSessionId(mostRecentChat.sessionId || `session-${Date.now()}`);
        } else {
          const newSessionId = `session-${Date.now()}`;
          setSessionId(newSessionId);
          setChatHistory([]);
        }
      } catch (err) {
        console.error("Failed to fetch chat history:", err.message);
        // Create new session if history fetch fails
        const newSessionId = `session-${Date.now()}`;
        setSessionId(newSessionId);
        setChatHistory([]);
      }
    };

    fetchHistory();
  }, [token]);

  const filteredChats = chatHistory.filter(chat => {
    const chatTitle = chat.title || chat.messages?.[0]?.message || 'New Chat';
    return chatTitle.toLowerCase().includes(searchChat.toLowerCase());
  });

  const loadChat = (chat) => {
    setMessages(chat.messages || []);
    setSessionId(chat.sessionId);
    setMessageInput('');
    setLoading(false);
    setIsChatListOpen(false);

    if (chat.context) {
      setContext(chat.context);
    }
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || loading) return;

    const userMessage = { 
      id: Date.now(), 
      role: "user", 
      message: messageInput,
      sender: 'user',
      text: messageInput
    };
    
    setMessages((prev) => [...prev, userMessage]);
    const currentMessage = messageInput; 
    setMessageInput("");
    setLoading(true);

    try {
      const response = await askTutor({
        message: currentMessage,
        context: context,
        sessionId: sessionId,
      }, token);
      
      const aiMessage = { 
        id: Date.now() + 1,
        role: "ai", 
        message: response.reply,
        sender: 'ai',
        text: response.reply
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      
      setChatHistory(prevHistory => {
        const existingChatIndex = prevHistory.findIndex(chat => chat.sessionId === sessionId);
        const updatedMessages = [...messages, userMessage, aiMessage];
        
        if (existingChatIndex >= 0) {
          const updatedHistory = [...prevHistory];
          updatedHistory[existingChatIndex] = {
            ...updatedHistory[existingChatIndex],
            messages: updatedMessages,
            lastUpdated: new Date().toISOString()
          };
          return updatedHistory;
        } else {
          const newChat = {
            sessionId: sessionId,
            messages: updatedMessages,
            context: context,
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString()
          };
          return [newChat, ...prevHistory];
        }
      });
      
    } catch (err) {
      console.error("Ask failed:", err.message);
      
      const errorMessage = {
        id: Date.now() + 1,
        role: "ai",
        message: "Sorry, I encountered an error. Please try again.",
        sender: 'ai',
        text: "Sorry, I encountered an error. Please try again."
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setMessageInput('');
    setLoading(false);
    setSessionId(`session-${Date.now()}`);
    setIsChatListOpen(false);
    setContext('General'); // Reset context to default
  };

  const formatChatTitle = (chat) => {
    if (chat.title) return chat.title;
    if (chat.messages && chat.messages.length > 0) {
      const firstMessage = chat.messages[0].message || chat.messages[0].text;
      return firstMessage.length > 40 ? firstMessage.substring(0, 40) + '...' : firstMessage;
    }
    return 'New Chat';
  };

  const formatChatDate = (chat) => {
    if (chat.createdAt) {
      return new Date(chat.createdAt).toLocaleDateString();
    }
    if (chat.sessionId) {
      // Extract timestamp from session ID if it contains one
      const timestamp = chat.sessionId.split('-').pop();
      if (timestamp && !isNaN(timestamp)) {
        return new Date(parseInt(timestamp)).toLocaleDateString();
      }
    }
    return 'Recent';
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen">
        <div className={sidebarOpen ? "w-[270px] min-w-[220px] max-w-xs transition-all duration-300" : "w-[60px] min-w-[60px] max-w-[60px] transition-all duration-300"}>
          <SidebarDemo open={sidebarOpen} setOpen={setSidebarOpen} />
        </div>
        
        <div className="flex-1 flex flex-col h-screen bg-gray-900 text-white transition-all duration-300">          
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-lg">
                🤖
              </div>
              <div>
                <h2 className="font-semibold text-lg">AI Tutor</h2>
                <p className="text-gray-400 text-sm">Ask me anything!</p>
              </div>
            </div>
            <button
              onClick={() => setIsChatListOpen(true)}
              className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
              title="Chat History"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-400">
                  <div className="text-4xl mb-4">💬</div>
                  <p>Start a conversation with your AI tutor!</p>
                </div>
              </div>
            )}
            
            {messages.map((message) => (
              <div
                key={message.id || `${message.sender}-${Date.now()}-${Math.random()}`}
                className={`flex ${(message.sender === 'user' || message.role === 'user') ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-2 rounded-2xl ${
                    (message.sender === 'user' || message.role === 'user')
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-200'
                  }`}
                >
                  <p className="text-sm sm:text-base whitespace-pre-wrap">
                    {message.text || message.message}
                  </p>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-2 rounded-2xl bg-gray-800 text-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="animate-pulse">●</div>
                    <div className="animate-pulse" style={{animationDelay: '0.2s'}}>●</div>
                    <div className="animate-pulse" style={{animationDelay: '0.4s'}}>●</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-700">
            <div className="relative">
              <textarea
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask your tutor a question..."
                disabled={loading}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[44px] max-h-32 disabled:opacity-50"
                rows={1}
                style={{
                  height: 'auto',
                  minHeight: '44px'
                }}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!messageInput.trim() || loading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors"
              >
                <ArrowUp size={16} className={messageInput.trim() && !loading ? 'text-white' : 'text-gray-500'} />
              </button>
            </div>
          </div>

          {/* Chat History Modal */}
          {isChatListOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-gray-900 rounded-lg w-full max-w-md max-h-[80vh] flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                  <div>
                    <h3 className="text-lg font-semibold">Chat History</h3>
                    <p className="text-gray-400 text-sm">Select a previous chat or start a new one.</p>
                  </div>
                  <button
                    onClick={() => setIsChatListOpen(false)}
                    className="w-8 h-8 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="p-4 border-b border-gray-700">
                  <div className="relative mb-3">
                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search chats..."
                      value={searchChat}
                      onChange={(e) => setSearchChat(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={startNewChat}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus size={16} />
                    Start New Chat
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {filteredChats.length === 0 ? (
                    <div className="p-4 text-center text-gray-400">
                      {chatHistory.length === 0 ? (
                        <div>
                          <div className="text-3xl mb-2">💬</div>
                          <p>No chat history yet.</p>
                          <p className="text-sm">Start your first conversation!</p>
                        </div>
                      ) : (
                        <p>No chats match your search.</p>
                      )}
                    </div>
                  ) : (
                    filteredChats.map((chat, index) => (
                      <div
                        key={chat.sessionId || index}
                        onClick={() => loadChat(chat)}
                        className={`flex items-start gap-3 p-4 hover:bg-gray-800 cursor-pointer transition-colors border-b border-gray-800 ${
                          chat.sessionId === sessionId ? 'bg-gray-800' : ''
                        }`}
                      >
                        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                          🤖
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{formatChatTitle(chat)}</h4>
                          <p className="text-gray-400 text-sm">{formatChatDate(chat)}</p>
                          {chat.messages && chat.messages.length > 0 && (
                            <p className="text-gray-500 text-xs mt-1">
                              {chat.messages.length} message{chat.messages.length !== 1 ? 's' : ''}
                            </p>
                          )}
                        </div>
                        {chat.sessionId === sessionId && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2" />
                        )}
                      </div>
                    ))
                  )}
                </div>

                <div className="p-4 border-t border-gray-700">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400 text-sm">
                      {chatHistory.length} total chat{chatHistory.length !== 1 ? 's' : ''}
                    </p>
                    <button
                      onClick={() => setIsChatListOpen(false)}
                      className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-sm font-medium transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ChatInterface;