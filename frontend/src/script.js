document.addEventListener('DOMContentLoaded', function() {
  // DOM elements
  const sidebar = document.querySelector('.sidebar');
  const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
  const newChatBtn = document.getElementById('new-chat-btn');
  const chatItems = document.querySelectorAll('.sidebar-menu-item');
  const messagesContainer = document.getElementById('messages');
  const emptyState = document.getElementById('empty-state');
  const messageForm = document.getElementById('message-form');
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  
  // State
  let activeChat = '1'; // Default active chat
  let chats = [
    { id: '1', title: 'Chat 1', messages: [] },
    { id: '2', title: 'Chat 2', messages: [] },
    { id: '3', title: 'Chat 3', messages: [] }
  ];
  let isLoading = false;
  
  // Initialize
  init();
  
  function init() {
    // Set up event listeners
    sidebarToggleBtn.addEventListener('click', toggleSidebar);
    newChatBtn.addEventListener('click', createNewChat);
    messageForm.addEventListener('submit', handleSubmit);
    messageInput.addEventListener('input', handleInput);
    messageInput.addEventListener('keydown', handleKeyDown);
    
    // Set up chat item click listeners
    chatItems.forEach(item => {
      item.addEventListener('click', () => {
        setActiveChat(item.dataset.chatId);
      });
    });
    
    // Set initial active chat
    setActiveChat(activeChat);
  }
  
  function toggleSidebar() {
    sidebar.classList.toggle('open');
  }
  
  function createNewChat() {
    const newChatId = `chat-${Date.now()}`;
    const newChat = {
      id: newChatId,
      title: 'New Chat',
      messages: []
    };
    
    chats.unshift(newChat);
    
    // Create new chat item in sidebar
    const newChatItem = document.createElement('div');
    newChatItem.className = 'sidebar-menu-item';
    newChatItem.dataset.chatId = newChatId;
    newChatItem.innerHTML = `
      <i class="fas fa-message"></i>
      <span>New Chat</span>
    `;
    
    newChatItem.addEventListener('click', () => {
      setActiveChat(newChatId);
    });
    
    const sidebarMenu = document.querySelector('.sidebar-menu');
    sidebarMenu.prepend(newChatItem);
    
    setActiveChat(newChatId);
  }
  
  function setActiveChat(chatId) {
    // Update active state in UI
    document.querySelectorAll('.sidebar-menu-item').forEach(item => {
      if (item.dataset.chatId === chatId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
    
    activeChat = chatId;
    
    // Load messages for this chat
    loadMessages(chatId);
  }
  
  function loadMessages(chatId) {
    const chat = chats.find(c => c.id === chatId);
    
    if (!chat) return;
    
    // Clear messages container
    messagesContainer.innerHTML = '';
    
    // Show or hide empty state
    if (chat.messages.length === 0) {
      emptyState.style.display = 'flex';
    } else {
      emptyState.style.display = 'none';
      
      // Render messages
      chat.messages.forEach(message => {
        appendMessage(message);
      });
    }
    
    // Scroll to bottom
    scrollToBottom();
  }
  
  function handleInput() {
    // Enable/disable send button based on input
    sendButton.disabled = !messageInput.value.trim();
  }
  
  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (messageInput.value.trim()) {
        messageForm.dispatchEvent(new Event('submit'));
      }
    }
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    
    const messageText = messageInput.value.trim();
    if (!messageText || isLoading) return;
    
    // Create user message
    const userMessage = {
      id: `msg-${Date.now()}`,
      content: messageText,
      role: 'user',
      timestamp: new Date()
    };
    
    // Add to current chat
    const currentChat = chats.find(c => c.id === activeChat);
    if (currentChat) {
      currentChat.messages.push(userMessage);
    }
    
    // Clear input
    messageInput.value = '';
    sendButton.disabled = true;
    
    // Show empty state if needed
    if (emptyState.style.display === 'flex') {
      emptyState.style.display = 'none';
    }
    
    // Append message to UI
    appendMessage(userMessage);
    scrollToBottom();
    
    // Show loading state
    isLoading = true;
    showTypingIndicator();
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: `msg-${Date.now()}`,
        content: "This is a simulated response from the AI assistant. In a real implementation, this would be connected to an AI model like GPT-4o using an API.",
        role: 'assistant',
        timestamp: new Date()
      };
      
      // Add to current chat
      if (currentChat) {
        currentChat.messages.push(aiMessage);
      }
      
      // Remove typing indicator
      removeTypingIndicator();
      
      // Append AI message
      appendMessage(aiMessage);
      scrollToBottom();
      
      isLoading = false;
    }, 1000);
  }
  
  function appendMessage(message) {
    const messageEl = document.createElement('div');
    messageEl.className = 'message';
    messageEl.dataset.id = message.id;
    
    const isAssistant = message.role === 'assistant';
    
    messageEl.innerHTML = `
      <div class="message-avatar ${isAssistant ? 'assistant' : ''}">
        ${isAssistant ? 'AI' : 'U'}
      </div>
      <div class="message-content">
        <div class="message-sender">${isAssistant ? 'AI Assistant' : 'You'}</div>
        <div class="message-text">${message.content}</div>
      </div>
    `;
    
    messagesContainer.appendChild(messageEl);
  }
  
  function showTypingIndicator() {
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message';
    typingIndicator.id = 'typing-indicator';
    
    typingIndicator.innerHTML = `
      <div class="message-avatar assistant">
        AI
      </div>
      <div class="message-content">
        <div class="message-sender">AI Assistant</div>
        <div class="typing-indicator"></div>
      </div>
    `;
    
    messagesContainer.appendChild(typingIndicator);
    scrollToBottom();
  }
  
  function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }
  
  function scrollToBottom() {
    const messagesContent = document.querySelector('.messages-content');
    messagesContent.scrollTop = messagesContent.scrollHeight;
  }
});