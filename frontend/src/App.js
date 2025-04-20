import React, { useState, useEffect } from 'react';
import './styles.css'; // Import custom styles

function App() {
  const [activeChat, setActiveChat] = useState('1');
  const [messages, setMessages] = useState({
    '1': [],
    '2': [],
    '3': []
  });
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Scroll to the bottom when new messages are added
    const messageContainer = document.getElementById('messages-container');
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messages]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();

    if (!newMessage.trim() || isLoading) return;

    // Add user message
    setMessages((prevMessages) => {
      const updatedMessages = { ...prevMessages };
      updatedMessages[activeChat].push({
        content: newMessage,
        role: 'user',
        timestamp: new Date(),
      });
      return updatedMessages;
    });

    // Simulate AI response
    setIsLoading(true);
    setTimeout(() => {
      setMessages((prevMessages) => {
        const updatedMessages = { ...prevMessages };
        updatedMessages[activeChat].push({
          content: 'This is a simulated response from the AI assistant.',
          role: 'assistant',
          timestamp: new Date(),
        });
        return updatedMessages;
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <button id="new-chat-btn" className="new-chat-btn">
            <i className="fas fa-plus"></i> New Chat
          </button>
        </div>
        <div className="sidebar-content">
          <div className="sidebar-group">
            <div className="sidebar-group-label">Recent Chats</div>
            <div className="sidebar-group-content">
              <div className="sidebar-menu">
                {Object.keys(messages).map((chatId) => (
                  <div
                    key={chatId}
                    className={`sidebar-menu-item ${chatId === activeChat ? 'active' : ''}`}
                    onClick={() => setActiveChat(chatId)}
                  >
                    <i className="fas fa-message"></i>
                    <span>{`Chat ${chatId.replace('chat-', '')}`}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="chat-container">
        <div className="messages-container" id="messages-container">
          {messages[activeChat].length === 0 ? (
            <div className="empty-state">
              <h2>Welcome to the Legal AI Assistant</h2>
              <p>Ask a question or start a conversation</p>
            </div>
          ) : (
            messages[activeChat].map((message, index) => (
              <div key={index} className="message">
                <div className={`message-avatar ${message.role}`}>
                  {message.role === 'assistant' ? 'AI' : 'You'}
                </div>
                <div className="message-content">
                  <div className="message-sender">{message.role === 'assistant' ? 'AI Assistant' : 'You'}</div>
                  <div className="message-text">{message.content}</div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="input-container">
          <form onSubmit={handleMessageSubmit}>
            <textarea
              id="message-input"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button type="submit" id="send-button" disabled={!newMessage.trim() || isLoading}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
