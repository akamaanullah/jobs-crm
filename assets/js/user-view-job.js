// User View Job JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeUserViewJob();
});

function initializeUserViewJob() {
    setupCountdownTimer();
    setupImageModal();
    setupChatToggles();
    setupAddVendorModal();
    setupFinalApprovalModal();
    setupJobCompleteModal();
    setupVendorActionButtons();
    setupProgressStatus();
    setupContactButtons();
}

// Countdown Timer
function setupCountdownTimer() {
    const countdownElements = document.querySelectorAll('.countdown');
    
    countdownElements.forEach(element => {
        const deadline = element.getAttribute('data-deadline');
        if (deadline) {
            updateCountdown(element, deadline);
            setInterval(() => updateCountdown(element, deadline), 1000);
        }
    });
}

function updateCountdown(element, deadline) {
    const now = new Date().getTime();
    const deadlineTime = new Date(deadline).getTime();
    const timeLeft = deadlineTime - now;
    
    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        element.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else {
        element.innerHTML = 'Deadline passed';
        element.style.color = '#ef4444';
    }
}

// Image Modal
function setupImageModal() {
    const modal = document.getElementById('userImageModal');
    const modalImg = document.getElementById('userModalImage');
    const closeBtn = document.querySelector('.user-close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}

function openUserImageModal(src) {
    const modal = document.getElementById('userImageModal');
    const modalImg = document.getElementById('userModalImage');
    
    if (modal && modalImg) {
        modalImg.src = src;
        modal.style.display = 'block';
    }
}

// Chat Toggles
function setupChatToggles() {
    const chatToggles = document.querySelectorAll('.user-chat-toggle');
    
    chatToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const chatContainer = this.closest('.user-vendor-chat').querySelector('.user-chat-container');
            const icon = this.querySelector('i');
            
            if (chatContainer.style.display === 'none') {
                chatContainer.style.display = 'block';
                icon.className = 'fas fa-chevron-up';
            } else {
                chatContainer.style.display = 'none';
                icon.className = 'fas fa-chevron-down';
            }
        });
    });
    
    // Setup large chat modal functionality
    setupLargeChatModal();
}

// Large Chat Modal
function setupLargeChatModal() {
    const largeChatButtons = document.querySelectorAll('.user-chat-large');
    const largeChatModal = document.getElementById('largeChatModal');
    const closeLargeChat = document.getElementById('closeLargeChat');
    const largeChatTitle = document.getElementById('largeChatTitle');
    const largeChatMessages = document.getElementById('largeChatMessages');
    
    if (largeChatButtons && largeChatModal) {
        largeChatButtons.forEach(button => {
            button.addEventListener('click', function() {
                const vendorId = this.getAttribute('data-vendor-id');
                const vendorName = this.closest('.user-vendor-card').querySelector('.user-vendor-details h4').textContent;
                
                // Update modal title
                largeChatTitle.textContent = `Chat with ${vendorName}`;
                
                // Load messages for this vendor
                loadVendorMessages(vendorId, largeChatMessages);
                
                // Show modal
                largeChatModal.style.display = 'block';
            });
        });
    }
    
    // Close modal
    if (closeLargeChat) {
        closeLargeChat.addEventListener('click', () => {
            largeChatModal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    if (largeChatModal) {
        largeChatModal.addEventListener('click', (e) => {
            if (e.target === largeChatModal) {
                largeChatModal.style.display = 'none';
            }
        });
    }
}

// Load vendor messages
function loadVendorMessages(vendorId, messagesContainer) {
    // Get messages from the small chat container
    const vendorCard = document.querySelector(`[data-vendor-id="${vendorId}"]`);
    const smallChatMessages = vendorCard.querySelector('.user-chat-messages');
    
    if (smallChatMessages && messagesContainer) {
        // Clone messages to large modal
        messagesContainer.innerHTML = smallChatMessages.innerHTML;
    }
}

// Add Vendor Modal
function setupAddVendorModal() {
    const addVendorBtn = document.getElementById('addVendor');
    const modal = document.getElementById('addVendorModal');
    const closeBtn = document.getElementById('closeAddVendor');
    const cancelBtn = document.getElementById('cancelAddVendor');
    const form = document.getElementById('addVendorForm');
    
    if (addVendorBtn && modal) {
        addVendorBtn.addEventListener('click', () => {
            modal.style.display = 'block';
        });
    }
    
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    if (cancelBtn && modal) {
        cancelBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    if (form) {
        form.addEventListener('submit', handleAddVendor);
    }
    
    // Quote type radio buttons
    const quoteTypeRadios = document.querySelectorAll('input[name="quoteType"]');
    const quoteAmountGroup = document.getElementById('quoteAmountGroup');
    
    quoteTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'paid') {
                quoteAmountGroup.style.display = 'block';
            } else {
                quoteAmountGroup.style.display = 'none';
            }
        });
    });
}

function handleAddVendor(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const vendorData = {
        name: formData.get('vendorName'),
        phone: formData.get('vendorPhone'),
        email: formData.get('vendorEmail'),
        specialization: formData.get('vendorSpecialization'),
        quoteType: formData.get('quoteType'),
        quoteAmount: formData.get('quoteAmount'),
        appointmentDate: formData.get('appointmentDate'),
        appointmentTime: formData.get('appointmentTime'),
        platform: formData.get('vendorPlatform')
    };
    
    // Show success message
    showUserNotification('Vendor added successfully!', 'success');
    
    // Close modal
    const modal = document.getElementById('addVendorModal');
    if (modal) {
        modal.style.display = 'none';
    }
    
    // Reset form
    e.target.reset();
    
    // In real app, send to server
    console.log('Add Vendor:', vendorData);
}

// Final Approval Modal
function setupFinalApprovalModal() {
    const modal = document.getElementById('finalApprovalModal');
    const closeBtn = document.getElementById('closeFinalApproval');
    const cancelBtn = document.getElementById('cancelFinalApproval');
    const form = document.getElementById('finalApprovalForm');
    
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    if (cancelBtn && modal) {
        cancelBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    if (form) {
        form.addEventListener('submit', handleFinalApproval);
    }
}

function handleFinalApproval(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const approvalData = {
        estimatedAmount: formData.get('estimatedAmount'),
        projectDate: formData.get('projectDate'),
        projectTime: formData.get('projectTime'),
        paymentMode: formData.get('paymentMode'),
        additionalNotes: formData.get('additionalNotes')
    };
    
    // Show success message
    showUserNotification('Final approval request sent successfully!', 'success');
    
    // Close modal
    const modal = document.getElementById('finalApprovalModal');
    if (modal) {
        modal.style.display = 'none';
    }
    
    // Reset form
    e.target.reset();
    
    // In real app, send to server
    console.log('Final Approval Request:', approvalData);
}

// Job Complete Modal
function setupJobCompleteModal() {
    const modal = document.getElementById('jobCompleteModal');
    const closeBtn = document.getElementById('closeJobComplete');
    const cancelBtn = document.getElementById('cancelJobComplete');
    const form = document.getElementById('jobCompleteForm');
    
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    if (cancelBtn && modal) {
        cancelBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    if (form) {
        form.addEventListener('submit', handleJobComplete);
    }
    
    // Setup dropdown sections
    setupDropdownSections();
    // Setup file upload previews
    setupFileUploadPreviews();
}

function handleJobComplete(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const vendorId = e.target.closest('.user-modal').getAttribute('data-vendor-id');
    
         const jobCompleteData = {
         vendorId: vendorId,
         jobPictures: formData.getAll('jobPictures'),
         vendorBusinessName: formData.get('vendorBusinessName'),
         entityType: formData.get('entityType'),
         vendorAddress: formData.get('vendorAddress'),
         einSsn: formData.get('einSsn'),
         w9FormFile: formData.get('w9FormFile'),
         invoiceFile: formData.get('invoiceFile')
     };
    
    // Show success message
    showUserNotification('Job completion submitted successfully!', 'success');
    
    // Close modal
    const modal = document.getElementById('jobCompleteModal');
    if (modal) {
        modal.style.display = 'none';
    }
    
    // Reset form
    e.target.reset();
    
    // Clear file previews
    const previewContainer = document.getElementById('jobPicturesPreview');
    if (previewContainer) {
        previewContainer.innerHTML = '';
    }
    
    // Update UI (in real app, this would be based on server response)
    setTimeout(() => {
        updateVendorStatus(vendorId, 'job_completed');
    }, 2000);
    
    // In real app, send to server
    console.log('Job Complete:', jobCompleteData);
}

function setupFileUploadPreviews() {
    const jobPicturesInput = document.getElementById('jobPictures');
    const previewContainer = document.getElementById('jobPicturesPreview');
    
    if (jobPicturesInput && previewContainer) {
        jobPicturesInput.addEventListener('change', function(e) {
            previewContainer.innerHTML = '';
            
            const files = Array.from(e.target.files);
            files.forEach(file => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        img.alt = file.name;
                        previewContainer.appendChild(img);
                    };
                    reader.readAsDataURL(file);
                }
            });
        });
    }
}

// Vendor Action Buttons
function setupVendorActionButtons() {
    // Visit Approval Buttons
    const visitApprovalBtns = document.querySelectorAll('[id^="requestVisitApproval-"]');
    visitApprovalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const vendorId = this.getAttribute('data-vendor-id');
            handleVisitApprovalRequest(vendorId);
        });
    });
    
    // Final Approval Buttons
    const finalApprovalBtns = document.querySelectorAll('[id^="requestFinalApproval-"]');
    finalApprovalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const vendorId = this.getAttribute('data-vendor-id');
            handleFinalApprovalRequest(vendorId);
        });
    });
    
    // Job Complete Buttons
    const jobCompleteBtns = document.querySelectorAll('[id^="requestJobComplete-"]');
    jobCompleteBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const vendorId = this.getAttribute('data-vendor-id');
            handleJobCompleteRequest(vendorId);
        });
    });
}

function handleVisitApprovalRequest(vendorId) {
    // Show confirmation
    if (confirm('Are you sure you want to request visit approval for this vendor?')) {
        // Show success message
        showUserNotification('Visit approval request sent successfully!', 'success');
        
        // In real app, send to server
        console.log('Visit Approval Request for vendor:', vendorId);
        
        // Update UI (in real app, this would be based on server response)
        setTimeout(() => {
            updateVendorStatus(vendorId, 'visit_approved');
        }, 2000);
    }
}

function handleFinalApprovalRequest(vendorId) {
    // Open final approval modal
    const modal = document.getElementById('finalApprovalModal');
    if (modal) {
        modal.style.display = 'block';
        // Store vendor ID for form submission
        modal.setAttribute('data-vendor-id', vendorId);
    }
}

function handleJobCompleteRequest(vendorId) {
    // Open job complete modal
    const modal = document.getElementById('jobCompleteModal');
    if (modal) {
        modal.style.display = 'block';
        // Store vendor ID for form submission
        modal.setAttribute('data-vendor-id', vendorId);
    }
}

function updateVendorStatus(vendorId, newStatus) {
    // Hide all action buttons for this vendor
    const visitBtn = document.getElementById(`requestVisitApproval-${vendorId}`);
    const finalBtn = document.getElementById(`requestFinalApproval-${vendorId}`);
    const completeBtn = document.getElementById(`requestJobComplete-${vendorId}`);
    
    if (visitBtn) visitBtn.style.display = 'none';
    if (finalBtn) finalBtn.style.display = 'none';
    if (completeBtn) completeBtn.style.display = 'none';
    
    // Update status display
    const statusDisplay = document.getElementById(`vendorStatus-${vendorId}`);
    if (statusDisplay) {
        let statusText = '';
        let icon = '';
        
        switch(newStatus) {
            case 'visit_approved':
                statusText = 'Visit Approved';
                icon = 'fas fa-check-circle';
                break;
            case 'final_approved':
                statusText = 'Final Approved';
                icon = 'fas fa-star';
                break;
            case 'job_completed':
                statusText = 'Job Completed';
                icon = 'fas fa-trophy';
                break;
            case 'payment_received':
                statusText = 'Payment Received';
                icon = 'fas fa-dollar-sign';
                break;
        }
        
        statusDisplay.innerHTML = `
            <span class="user-status-success">
                <i class="${icon}"></i> ${statusText}
            </span>
        `;
    }
    
    // Show next button based on new status
    if (newStatus === 'visit_approved' && finalBtn) {
        finalBtn.style.display = 'block';
    } else if (newStatus === 'final_approved' && completeBtn) {
        completeBtn.style.display = 'block';
    }
}

// Progress Status
function setupProgressStatus() {
    const progressElement = document.getElementById('progressStatus');
    if (progressElement) {
        const status = getJobStatus();
        const progress = calculateProgress(status);
        progressElement.textContent = `${progress}% Complete`;
        
        // Add color based on progress
        if (progress >= 80) {
            progressElement.style.color = '#10b981';
        } else if (progress >= 50) {
            progressElement.style.color = '#3b82f6';
        } else {
            progressElement.style.color = '#f59e0b';
        }
    }
}

function getJobStatus() {
    // Get status from page
    const statusElement = document.querySelector('.user-status-badge');
    return statusElement ? statusElement.textContent.trim() : '';
}

function calculateProgress(status) {
    const statusMap = {
        'Visit Request Pending': 10,
        'Visit Approved': 30,
        'Final Visit Pending': 60,
        'Final Visit Approved': 80,
        'Work Completed': 90,
        'Payment Pending': 95,
        'Payment Approved': 100
    };
    
    return statusMap[status] || 0;
}

// Contact Buttons - Removed call functionality
function setupContactButtons() {
    // Call button functionality removed
    // Only remove vendor button remains
}

// Chat Message Sending
function setupChatMessages() {
    const sendButtons = document.querySelectorAll('.user-send-message');
    
    sendButtons.forEach(button => {
        button.addEventListener('click', function() {
            const vendorId = this.getAttribute('data-vendor-id');
            const input = document.querySelector(`.user-chat-message-input[data-vendor-id="${vendorId}"]`);
            const message = input.value.trim();
            
            if (message) {
                addChatMessage(vendorId, message, 'user');
                input.value = '';
            }
        });
    });
    
    // Enter key support
    const chatInputs = document.querySelectorAll('.user-chat-message-input');
    chatInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const vendorId = this.getAttribute('data-vendor-id');
                const message = this.value.trim();
                
                if (message) {
                    addChatMessage(vendorId, message, 'user');
                    this.value = '';
                }
            }
        });
    });
}

function addChatMessage(vendorId, message, sender) {
    const chatContainer = document.getElementById(`userChatMessages-${vendorId}`);
    if (!chatContainer) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `user-message ${sender}-message`;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.innerHTML = `
        <div class="user-message-content">
            <p>${message}</p>
            <span class="user-message-time">${timeString}</span>
        </div>
    `;
    
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    // In real app, send to server
    console.log('Chat message:', { vendorId, message, sender });
}

// Map View
function setupMapView() {
    const mapButton = document.getElementById('viewOnMap');
    if (mapButton) {
        mapButton.addEventListener('click', function() {
            // Get address from page
            const addressElement = document.querySelector('.user-detail-item .value');
            const address = addressElement ? addressElement.textContent : '';
            
            // In real app, open map with address
            const mapUrl = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
            window.open(mapUrl, '_blank');
            
            showUserNotification('Opening map...', 'info');
        });
    }
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    setupChatMessages();
    setupMapView();
});

// Dropdown Sections
function setupDropdownSections() {
    const dropdownHeaders = document.querySelectorAll('.user-dropdown-header');
    
    dropdownHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const content = document.getElementById(targetId);
            const icon = this.querySelector('.user-dropdown-icon');
            
            // Toggle active state
            this.classList.toggle('active');
            content.classList.toggle('active');
            
            // Update icon rotation
            if (this.classList.contains('active')) {
                icon.style.transform = 'rotate(180deg)';
                icon.style.color = 'var(--primary-medium)';
            } else {
                icon.style.transform = 'rotate(0deg)';
                icon.style.color = 'var(--text-secondary)';
            }
        });
    });
}

// Export functions for use in other files
window.userViewJob = {
    openUserImageModal,
    addChatMessage,
    showUserNotification
};
