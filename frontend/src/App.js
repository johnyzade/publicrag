import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'; // Import React Router components
import './styles.css'; // Import custom styles
import axios from 'axios'; // Import axios

import Login from './components/Login'; // Assuming you have a Login component

function App() {
  const [activeChat, setActiveChat] = useState('1');
  const [messages, setMessages] = useState({
    '1': [],
    '2': [],
    '3': []
  });
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [flaskMessage, setFlaskMessage] = useState(''); // State for storing message from Flask
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  // Fetch data from Flask backend when the component mounts
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/data')
      .then(response => {
        setFlaskMessage(response.data.message); // Update state with Flask response
      })
      .catch(error => {
        console.error("Error fetching data from Flask:", error);
      });
  }, []);

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
    <Router>
      <div className="app-container">
        <Switch>
          {/* If not logged in, show the Login UI */}
          <Route exact path="/" render={() => (
            isLoggedIn ? <Redirect to="/chat" /> : <Login onLogin={() => setIsLoggedIn(true)} />
          )} />

          {/* If logged in, show the Chatbot UI */}
          <Route path="/chat" render={() => (
            isLoggedIn ? (
              <div className="chat-container">
                <div className="sidebar">
                  {/* Sidebar code */}
                </div>

                <div className="messages-container" id="messages-container">
                  {messages[activeChat].length === 0 ? (
                    <div className="empty-state">
                      <h2>Welcome to the Legal AI Assistant</h2>
                      <p>Ask a question or start a conversation</p>
                      <p>{flaskMessage}</p> {/* Display the message from Flask */}
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
            ) : (
              <Redirect to="/" />
            )
          )} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
