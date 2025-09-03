// Requests Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeRequestsPage();
});

function initializeRequestsPage() {
    initializeTabs();
    initializeFilters();
    initializeRequestActions();
    initializeModals();
    initializeChat();
    initializeAttachments();
    updateTabCounts();
}

// Tabs functionality
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Filter requests based on tab
            filterRequestsByTab(tabName);
        });
    });
}

function filterRequestsByTab(tabName) {
    const requestCards = document.querySelectorAll('.request-card');
    
    requestCards.forEach(card => {
        const status = card.dataset.status;
        
        if (tabName === 'all' || status === tabName) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function updateTabCounts() {
    const requestCards = document.querySelectorAll('.request-card');
    const counts = {
        pending: 0,
        approved: 0,
        rejected: 0
    };
    
    requestCards.forEach(card => {
        const status = card.dataset.status;
        if (counts.hasOwnProperty(status)) {
            counts[status]++;
        }
    });
    
    // Update count displays
    document.getElementById('pendingCount').textContent = counts.pending;
    document.getElementById('approvedCount').textContent = counts.approved;
    document.getElementById('rejectedCount').textContent = counts.rejected;
}

// Filter functionality
function initializeFilters() {
    const statusFilter = document.getElementById('statusFilter');
    const typeFilter = document.getElementById('typeFilter');
    
    if (statusFilter) {
        statusFilter.addEventListener('change', filterRequests);
    }
    
    if (typeFilter) {
        typeFilter.addEventListener('change', filterRequests);
    }
}

function filterRequests() {
    const typeFilter = document.getElementById('typeFilter').value;
    const activeTab = document.querySelector('.tab-btn.active').dataset.tab;
    const requestCards = document.querySelectorAll('.request-card');
    
    requestCards.forEach(card => {
        const status = card.dataset.status;
        const type = card.dataset.type;
        
        let showCard = true;
        
        // Check if card matches active tab
        if (activeTab !== 'all' && status !== activeTab) {
            showCard = false;
        }
        
        // Check if card matches type filter
        if (typeFilter && type !== typeFilter) {
            showCard = false;
        }
        
        card.style.display = showCard ? 'block' : 'none';
    });
}

// Request actions (approve/reject)
function initializeRequestActions() {
    // Approve buttons
    const approveButtons = document.querySelectorAll('.approve-request');
    approveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const requestId = this.dataset.requestId;
            approveRequest(requestId);
        });
    });
    
    // Reject buttons
    const rejectButtons = document.querySelectorAll('.reject-request');
    rejectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const requestId = this.dataset.requestId;
            rejectRequest(requestId);
        });
    });
    
    // Chat buttons
    const chatButtons = document.querySelectorAll('.chat-with-user');
    chatButtons.forEach(button => {
        button.addEventListener('click', function() {
            const requestId = this.dataset.requestId;
            openChatModal(requestId);
        });
    });
    
    // Attachments buttons
    const attachmentsButtons = document.querySelectorAll('.view-attachments');
    attachmentsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const requestId = this.dataset.requestId;
            openAttachmentsModal(requestId);
        });
    });
}

// Modal functionality (only for chat and attachments)
function initializeModals() {
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const chatModal = document.getElementById('chatModal');
        const attachmentsModal = document.getElementById('attachmentsModal');
        
        if (e.target === chatModal) {
            chatModal.style.display = 'none';
        }
        
        if (e.target === attachmentsModal) {
            attachmentsModal.style.display = 'none';
        }
    });
}

// Direct approve function
function approveRequest(requestId) {
    const requestCard = document.querySelector(`[data-request-id="${requestId}"]`);
    if (!requestCard) return;
    
    // Show loading state
    const approveBtn = requestCard.querySelector('.approve-request');
    const originalText = approveBtn.innerHTML;
    approveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Approving...';
    approveBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Update the request card
        updateRequestStatus(requestId, 'approve');
        
        // Reset button
        approveBtn.innerHTML = originalText;
        approveBtn.disabled = false;
        
        // Show success message
        showNotification('Request approved successfully!', 'success');
        
        // Add notification
        if (window.notificationManager) {
            window.notificationManager.addNotification({
                type: 'approved',
                title: 'Request Approved',
                message: `Request #${requestId} has been approved successfully`,
                data: { requestId: requestId }
            });
        }
    }, 1000);
}

// Direct reject function
function rejectRequest(requestId) {
    const requestCard = document.querySelector(`[data-request-id="${requestId}"]`);
    if (!requestCard) return;
    
    // Show loading state
    const rejectBtn = requestCard.querySelector('.reject-request');
    const originalText = rejectBtn.innerHTML;
    rejectBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Rejecting...';
    rejectBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Update the request card
        updateRequestStatus(requestId, 'reject');
        
        // Reset button
        rejectBtn.innerHTML = originalText;
        rejectBtn.disabled = false;
        
        // Show success message
        showNotification('Request rejected successfully!', 'success');
        
        // Add notification
        if (window.notificationManager) {
            window.notificationManager.addNotification({
                type: 'rejected',
                title: 'Request Rejected',
                message: `Request #${requestId} has been rejected`,
                data: { requestId: requestId }
            });
        }
    }, 1000);
}



function updateRequestStatus(requestId, action) {
    const requestCard = document.querySelector(`[data-request-id="${requestId}"]`);
    if (!requestCard) return;
    
    const statusBadge = requestCard.querySelector('.request-status-badge');
    const actionsDiv = requestCard.querySelector('.request-actions');
    
    // Update status
    const newStatus = action === 'approve' ? 'approved' : 'rejected';
    requestCard.dataset.status = newStatus;
    
    // Update status badge
    statusBadge.className = `request-status-badge ${newStatus}`;
    statusBadge.textContent = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
    
    // Update actions
    actionsDiv.innerHTML = `
        <span class="status-message">
            Request ${newStatus}
        </span>
        <button class="btn-primary chat-with-user" data-request-id="${requestId}">
            <i class="fas fa-comments"></i>
            Chat with User
        </button>
    `;
    
    // Re-attach chat button event
    const newChatBtn = actionsDiv.querySelector('.chat-with-user');
    if (newChatBtn) {
        newChatBtn.addEventListener('click', function() {
            openChatModal(requestId);
        });
    }
    
    // Update tab counts after status change
    updateTabCounts();
}

// Chat functionality
function initializeChat() {
    const chatModal = document.getElementById('chatModal');
    const closeChat = document.getElementById('closeChat');
    const sendMessage = document.getElementById('sendMessage');
    const chatInput = document.getElementById('chatMessageInput');
    
    if (closeChat) {
        closeChat.addEventListener('click', function() {
            chatModal.style.display = 'none';
        });
    }
    
    if (sendMessage) {
        sendMessage.addEventListener('click', sendChatMessage);
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === chatModal) {
            chatModal.style.display = 'none';
        }
    });
}

// Attachments functionality
function initializeAttachments() {
    const attachmentsModal = document.getElementById('attachmentsModal');
    const closeAttachments = document.getElementById('closeAttachments');
    
    if (closeAttachments) {
        closeAttachments.addEventListener('click', function() {
            attachmentsModal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === attachmentsModal) {
            attachmentsModal.style.display = 'none';
        }
    });
}

function openAttachmentsModal(requestId) {
    const modal = document.getElementById('attachmentsModal');
    const attachmentsList = document.getElementById('attachmentsList');
    
    // Load attachments (simulate)
    loadAttachments(requestId, attachmentsList);
    
    modal.style.display = 'block';
}

function loadAttachments(requestId, container) {
    // Sample attachments data (in real app, this would come from API)
    const sampleAttachments = [
        {
            name: 'visit_report.pdf',
            size: '2.5 MB',
            type: 'PDF Document',
            icon: 'fa-file-pdf'
        },
        {
            name: 'vendor_photos.jpg',
            size: '1.2 MB',
            type: 'Image',
            icon: 'fa-file-image'
        },
        {
            name: 'contract_draft.docx',
            size: '850 KB',
            type: 'Word Document',
            icon: 'fa-file-word'
        }
    ];
    
    container.innerHTML = '';
    
    sampleAttachments.forEach(attachment => {
        const attachmentDiv = document.createElement('div');
        attachmentDiv.className = 'attachment-item';
        attachmentDiv.innerHTML = `
            <div class="attachment-info">
                <i class="fas ${attachment.icon}"></i>
                <div class="attachment-details">
                    <span class="attachment-name">${attachment.name}</span>
                    <span class="attachment-meta">${attachment.size} • ${attachment.type}</span>
                </div>
            </div>
            <div class="attachment-download" title="Download ${attachment.name}">
                <i class="fas fa-download"></i>
            </div>
        `;
        
        // Add click event for download
        const downloadBtn = attachmentDiv.querySelector('.attachment-download');
        downloadBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            showNotification(`Downloading ${attachment.name}...`, 'info');
        });
        
        container.appendChild(attachmentDiv);
    });
}

function openChatModal(requestId) {
    const modal = document.getElementById('chatModal');
    const chatMessages = document.getElementById('chatMessages');
    
    // Load chat messages (simulate)
    loadChatMessages(requestId, chatMessages);
    
    modal.style.display = 'block';
    
    // Store current request ID for sending messages
    modal.dataset.currentRequestId = requestId;
}

function loadChatMessages(requestId, container) {
    // Sample chat messages (in real app, this would come from API)
    const sampleMessages = [
        {
            type: 'user',
            message: 'Hi admin, I need your approval for the vendor visit.',
            time: '2:30 PM'
        },
        {
            type: 'admin',
            message: 'Hello! I can see your request. Let me review the details.',
            time: '2:35 PM'
        },
        {
            type: 'user',
            message: 'The vendor seems very professional and experienced.',
            time: '2:40 PM'
        }
    ];
    
    container.innerHTML = '';
    
    sampleMessages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${msg.type}-message`;
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${msg.message}</p>
                <span class="message-time">${msg.time}</span>
            </div>
        `;
        container.appendChild(messageDiv);
    });
    
    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
}

function sendChatMessage() {
    const input = document.getElementById('chatMessageInput');
    const message = input.value.trim();
    const modal = document.getElementById('chatModal');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!message) return;
    
    // Add message to chat
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message admin-message';
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
            <span class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    
    // Clear input
    input.value = '';
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Simulate user response
    setTimeout(() => {
        const userResponse = document.createElement('div');
        userResponse.className = 'message user-message';
        userResponse.innerHTML = `
            <div class="message-content">
                <p>Thank you for your response. I'll wait for your decision.</p>
                <span class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
        `;
        chatMessages.appendChild(userResponse);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 2000);
}

// Notification function
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}
