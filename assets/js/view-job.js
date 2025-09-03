document.addEventListener('DOMContentLoaded', function() {
    // Initialize countdown timer
    initializeCountdown();
    
    // Initialize chat functionality
    initializeChat();
    
    // Initialize image modal
    initializeImageModal();
    
    // Initialize other interactions
    initializeInteractions();
    
    function initializeCountdown() {
        const countdownElement = document.querySelector('.countdown');
        const slaStatusElement = document.getElementById('slaStatus');
        
        if (countdownElement && slaStatusElement) {
            const deadline = new Date(countdownElement.dataset.deadline);
            
            function updateCountdown() {
                const now = new Date();
                const timeDifference = deadline - now;
                
                if (timeDifference > 0) {
                    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
                    
                    countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
                    
                    // Update SLA status
                    if (days === 0 && hours < 24) {
                        slaStatusElement.textContent = 'Due Today';
                        slaStatusElement.className = 'sla-status-badge due-today';
                    } else if (days < 7) {
                        slaStatusElement.textContent = 'Due This Week';
                        slaStatusElement.className = 'sla-status-badge due-today';
                    } else {
                        slaStatusElement.textContent = 'Upcoming';
                        slaStatusElement.className = 'sla-status-badge upcoming';
                    }
                } else {
                    countdownElement.textContent = 'Overdue';
                    countdownElement.style.color = '#ef4444';
                    slaStatusElement.textContent = 'Overdue';
                    slaStatusElement.className = 'sla-status-badge overdue';
                }
            }
            
            // Update immediately and then every second
            updateCountdown();
            setInterval(updateCountdown, 1000);
        }
    }
    
    function initializeChat() {
        // Chat toggle functionality - make entire header clickable
        document.querySelectorAll('.chat-header').forEach(header => {
            header.addEventListener('click', function() {
                const chatContainer = this.closest('.vendor-chat').querySelector('.chat-container');
                const toggleIcon = this.querySelector('.chat-toggle');
                const isVisible = chatContainer.style.display !== 'none';
                
                if (isVisible) {
                    chatContainer.style.display = 'none';
                    toggleIcon.classList.remove('active');
                } else {
                    chatContainer.style.display = 'flex';
                    toggleIcon.classList.add('active');
                    // Scroll to bottom of chat
                    const chatMessages = chatContainer.querySelector('.chat-messages');
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                    
                    // Add a subtle animation effect
                    chatContainer.style.animation = 'slideDown 0.3s ease-out';
                }
            });
        });
        
        // Send message functionality
        document.querySelectorAll('.send-message').forEach(button => {
            button.addEventListener('click', function() {
                const vendorId = this.dataset.vendorId;
                const input = document.querySelector(`.chat-message-input[data-vendor-id="${vendorId}"]`);
                const message = input.value.trim();
                
                if (message) {
                    sendMessage(vendorId, message);
                    input.value = '';
                }
            });
        });
        
        // Enter key to send message
        document.querySelectorAll('.chat-message-input').forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const vendorId = this.dataset.vendorId;
                    const message = this.value.trim();
                    
                    if (message) {
                        sendMessage(vendorId, message);
                        this.value = '';
                    }
                }
            });
        });
        
        // Attachment functionality
        document.querySelectorAll('.attachment-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const vendorId = this.dataset.vendorId;
                const fileInput = document.querySelector(`.chat-file-input[data-vendor-id="${vendorId}"]`);
                fileInput.click();
            });
        });
        
        // File input change handler
        document.querySelectorAll('.chat-file-input').forEach(input => {
            input.addEventListener('change', function() {
                const vendorId = this.dataset.vendorId;
                const files = this.files;
                
                if (files.length > 0) {
                    handleFileAttachments(vendorId, files);
                    this.value = ''; // Reset input
                }
            });
        });
    }
    
    function sendMessage(vendorId, message) {
        const chatMessages = document.getElementById(`chatMessages-${vendorId}`);
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        // Create message element
        const messageElement = document.createElement('div');
        messageElement.className = 'message admin-message';
        messageElement.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
                <span class="message-time">${timeString}</span>
            </div>
        `;
        
        // Add message to chat
        chatMessages.appendChild(messageElement);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Show notification
        window.themeManager.showNotification('Message sent successfully!', 'success');
        
        // Simulate vendor response (in real app, this would come from WebSocket)
        setTimeout(() => {
            simulateVendorResponse(vendorId);
        }, 2000 + Math.random() * 3000);
    }
    
    function handleFileAttachments(vendorId, files) {
        const chatMessages = document.getElementById(`chatMessages-${vendorId}`);
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        Array.from(files).forEach(file => {
            // Create attachment message element
            const messageElement = document.createElement('div');
            messageElement.className = 'message admin-message';
            
            const fileSize = formatFileSize(file.size);
            const fileType = getFileType(file.type);
            const fileName = file.name;
            
            // Create file preview based on type
            let filePreview = '';
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = messageElement.querySelector('.attachment-preview img');
                    if (img) img.src = e.target.result;
                };
                reader.readAsDataURL(file);
                filePreview = `<div class="attachment-preview"><img src="" alt="${fileName}" style="max-width: 200px; max-height: 150px; border-radius: 8px;"></div>`;
            } else {
                filePreview = `<div class="attachment-preview"><i class="fas fa-file-${fileType}" style="font-size: 3rem; color: var(--primary-medium);"></i></div>`;
            }
            
            messageElement.innerHTML = `
                <div class="message-content">
                    <div class="attachment-message">
                        ${filePreview}
                        <div class="attachment-info">
                            <div class="attachment-name">${fileName}</div>
                            <div class="attachment-details">
                                <span class="attachment-type">${fileType.toUpperCase()}</span>
                                <span class="attachment-size">${fileSize}</span>
                            </div>
                        </div>
                    </div>
                    <span class="message-time">${timeString}</span>
                </div>
            `;
            
            // Add message to chat
            chatMessages.appendChild(messageElement);
            
            // Show notification
            window.themeManager.showNotification(`File "${fileName}" attached successfully!`, 'success');
        });
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    function getFileType(mimeType) {
        if (mimeType.startsWith('image/')) return 'image';
        if (mimeType.includes('pdf')) return 'pdf';
        if (mimeType.includes('word') || mimeType.includes('document')) return 'word';
        if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return 'excel';
        if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) return 'powerpoint';
        if (mimeType.includes('text/')) return 'text';
        return 'alt';
    }
    
    function simulateVendorResponse(vendorId) {
        const chatMessages = document.getElementById(`chatMessages-${vendorId}`);
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const responses = [
            'Thank you for the update!',
            'I\'ll work on that right away.',
            'Can you provide more details about this?',
            'I\'ve completed the requested changes.',
            'I need some clarification on this.',
            'The work is progressing well.',
            'I\'ll send you the files shortly.'
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const messageElement = document.createElement('div');
        messageElement.className = 'message vendor-message';
        messageElement.innerHTML = `
            <div class="message-content">
                <p>${randomResponse}</p>
                <span class="message-time">${timeString}</span>
            </div>
        `;
        
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Show typing indicator
        showTypingIndicator(vendorId);
    }
    
    function showTypingIndicator(vendorId) {
        const chatMessages = document.getElementById(`chatMessages-${vendorId}`);
        
        const typingElement = document.createElement('div');
        typingElement.className = 'message vendor-message typing-indicator';
        typingElement.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(typingElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Remove typing indicator after 2 seconds
        setTimeout(() => {
            if (typingElement.parentNode) {
                typingElement.remove();
            }
        }, 2000);
    }
    
    function initializeImageModal() {
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        const closeBtn = document.querySelector('.close');
        
        // Open modal
        window.openImageModal = function(imageSrc) {
            modalImage.src = imageSrc;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        };
        
        // Close modal
        if (closeBtn) {
            closeBtn.addEventListener('click', closeImageModal);
        }
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeImageModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeImageModal();
            }
        });
        
        function closeImageModal() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    function initializeInteractions() {
        // Edit job button
        const editJobBtn = document.getElementById('editJob');
        if (editJobBtn) {
            editJobBtn.addEventListener('click', function() {
                openEditJobModal();
            });
        }
        
        // Add vendor button
        const addVendorBtn = document.getElementById('addVendor');
        if (addVendorBtn) {
            addVendorBtn.addEventListener('click', function() {
                openAddVendorModal();
            });
        }
        
        // View on map button
        const viewOnMapBtn = document.getElementById('viewOnMap');
        if (viewOnMapBtn) {
            viewOnMapBtn.addEventListener('click', function() {
                window.themeManager.showNotification('Opening map view...', 'info');
                // In real app, open map modal or redirect to map page
                // openMapModal();
            });
        }
        
        // Vendor action buttons
        document.querySelectorAll('.vendor-actions .btn-icon').forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.title;
                const vendorCard = this.closest('.vendor-card');
                const vendorId = vendorCard.dataset.vendorId;
                
                if (action === 'View Profile') {
                    openVendorProfile(vendorId, vendorCard);
                } else if (action === 'Remove Vendor') {
                    if (confirm('Are you sure you want to remove this vendor from the job?')) {
                        window.themeManager.showNotification(`Removing vendor ${vendorId} from job...`, 'info');
                        // In real app, make API call to remove vendor
                        setTimeout(() => {
                            vendorCard.remove();
                            window.themeManager.showNotification('Vendor removed successfully!', 'success');
                        }, 1000);
                    }
                }
            });
        });
    }
    
    // Initialize vendor form functionality
    initializeVendorForm();
    
    function initializeVendorForm() {
        const modal = document.getElementById('addVendorModal');
        const form = document.getElementById('addVendorForm');
        const closeBtn = document.getElementById('closeAddVendor');
        const cancelBtn = document.getElementById('cancelAddVendor');
        const quoteTypeRadios = document.querySelectorAll('input[name="quoteType"]');
        const quoteAmountGroup = document.getElementById('quoteAmountGroup');
        const quoteAmountInput = document.getElementById('quoteAmount');
        
        // Open modal function
        window.openAddVendorModal = function() {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            setDefaultDate();
            window.themeManager.showNotification('Add vendor form opened', 'info');
        };
        
        // Close modal functions
        function closeAddVendorModal() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            form.reset();
            quoteAmountGroup.style.display = 'none';
            quoteAmountInput.removeAttribute('required');
        }
        
        // Close modal events
        if (closeBtn) {
            closeBtn.addEventListener('click', closeAddVendorModal);
        }
        
        if (cancelBtn) {
            cancelBtn.addEventListener('click', closeAddVendorModal);
        }
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeAddVendorModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeAddVendorModal();
            }
        });
        
        // Quote type radio button functionality
        quoteTypeRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'paid') {
                    quoteAmountGroup.style.display = 'block';
                    quoteAmountInput.setAttribute('required', 'required');
                } else {
                    quoteAmountGroup.style.display = 'none';
                    quoteAmountInput.removeAttribute('required');
                    quoteAmountInput.value = '';
                }
            });
        });
        
        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const vendorData = {
                name: formData.get('vendorName'),
                email: formData.get('vendorEmail'),
                phone: formData.get('vendorPhone'),
                specialization: formData.get('vendorSpecialization'),
                quoteType: formData.get('quoteType'),
                quoteAmount: formData.get('quoteAmount'),
                platform: formData.get('vendorPlatform'),
                appointmentDate: formData.get('appointmentDate'),
                appointmentTime: formData.get('appointmentTime')
            };
            
            // Validate form
            if (!validateVendorForm(vendorData)) {
                return;
            }
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding Vendor...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Add vendor to the page (in real app, this would be an API call)
                addVendorToPage(vendorData);
                
                // Reset form and close modal
                closeAddVendorModal();
                
                // Show success message
                window.themeManager.showNotification('Vendor added successfully!', 'success');
                
                // Add notification for new vendor
                if (window.notificationManager) {
                    window.notificationManager.addNotification({
                        type: 'vendor_added',
                        title: 'New Vendor Added',
                        message: `New vendor "${vendorData.name}" has been added to the job`,
                        data: { 
                            jobId: window.currentJobId || 'JOB-001',
                            vendorName: vendorData.name,
                            specialization: vendorData.specialization
                        }
                    });
                }
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
        
        // Set default date to tomorrow
        function setDefaultDate() {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const dateString = tomorrow.toISOString().split('T')[0];
            document.getElementById('appointmentDate').value = dateString;
        }
    }
    
    function validateVendorForm(data) {
        // Basic validation
        if (!data.name || !data.email || !data.phone || !data.specialization) {
            window.themeManager.showNotification('Please fill in all required fields', 'error');
            return false;
        }
        
        if (data.quoteType === 'paid' && (!data.quoteAmount || parseFloat(data.quoteAmount) <= 0)) {
            window.themeManager.showNotification('Please enter a valid quote amount', 'error');
            return false;
        }
        
        if (!data.appointmentDate || !data.appointmentTime) {
            window.themeManager.showNotification('Please select appointment date and time', 'error');
            return false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            window.themeManager.showNotification('Please enter a valid email address', 'error');
            return false;
        }
        
        // Phone validation
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(data.phone.replace(/[\s\-\(\)]/g, ''))) {
            window.themeManager.showNotification('Please enter a valid phone number', 'error');
            return false;
        }
        
        return true;
    }
    
    // Function to update vendor status and trigger notification
    function updateVendorStatus(vendorId, newStatus, vendorName) {
        const vendorCard = document.querySelector(`[data-vendor-id="${vendorId}"]`);
        if (vendorCard) {
            const statusElement = vendorCard.querySelector('.vendor-status');
            statusElement.textContent = newStatus;
            statusElement.className = `vendor-status ${newStatus.toLowerCase()}`;
            
            // Add notification for status update
            if (window.notificationManager) {
                let notificationType = 'status_update';
                let notificationTitle = 'Vendor Status Updated';
                let notificationMessage = `Vendor "${vendorName}" status updated to "${newStatus}"`;
                
                // Specific notification types for different statuses
                switch(newStatus.toLowerCase()) {
                    case 'visit_approved':
                        notificationType = 'visit_approved';
                        notificationTitle = 'Visit Approved';
                        notificationMessage = `Visit approval granted for vendor "${vendorName}"`;
                        break;
                    case 'final_approved':
                        notificationType = 'final_approved';
                        notificationTitle = 'Final Approval Granted';
                        notificationMessage = `Final approval granted for vendor "${vendorName}"`;
                        break;
                    case 'job_completed':
                        notificationType = 'job_completed';
                        notificationTitle = 'Job Completed';
                        notificationMessage = `Job completed by vendor "${vendorName}"`;
                        break;
                    case 'payment_received':
                        notificationType = 'payment_received';
                        notificationTitle = 'Payment Received';
                        notificationMessage = `Payment received for work by vendor "${vendorName}"`;
                        break;
                }
                
                window.notificationManager.addNotification({
                    type: notificationType,
                    title: notificationTitle,
                    message: notificationMessage,
                    data: { 
                        vendorId: vendorId,
                        vendorName: vendorName,
                        status: newStatus
                    }
                });
            }
        }
    }

    function addVendorToPage(vendorData) {
        // Generate a new vendor ID
        const newVendorId = Date.now();
        
        // Create vendor card HTML
        const vendorCard = document.createElement('div');
        vendorCard.className = 'vendor-card';
        vendorCard.dataset.vendorId = newVendorId;
        
        // Get vendor initials for avatar
        const initials = vendorData.name.split(' ').map(n => n[0]).join('').toUpperCase();
        
        vendorCard.innerHTML = `
            <div class="vendor-header">
                <div class="vendor-info">
                    <div class="vendor-avatar">
                        <div style="width: 100%; height: 100%; background: linear-gradient(135deg, var(--primary-medium), var(--primary-dark)); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 1.2rem;">
                            ${initials}
                        </div>
                    </div>
                    <div class="vendor-details">
                        <h4>${vendorData.name}</h4>
                        <p class="vendor-specialization">${vendorData.specialization}</p>
                        <span class="vendor-status pending">Pending</span>
                    </div>
                </div>
                <div class="vendor-actions">
                    <button class="btn-icon" title="View Profile">
                        <i class="fas fa-user"></i>
                    </button>
                    <button class="btn-icon" title="Remove Vendor">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>

            <div class="vendor-contact">
                <div class="contact-item">
                    <i class="fas fa-envelope"></i>
                    <span>${vendorData.email}</span>
                </div>
                <div class="contact-item">
                    <i class="fas fa-phone"></i>
                    <span>${vendorData.phone}</span>
                </div>
                <div class="contact-item">
                    <i class="fas fa-calendar"></i>
                    <span>Appointment: ${formatAppointmentDate(vendorData.appointmentDate, vendorData.appointmentTime)}</span>
                </div>
                ${vendorData.platform ? `
                <div class="contact-item">
                    <i class="fas fa-globe"></i>
                    <span>Platform: ${vendorData.platform}</span>
                </div>
                ` : ''}
                <div class="contact-item">
                    <i class="fas fa-dollar-sign"></i>
                    <span>Quote: ${vendorData.quoteType === 'paid' ? '$' + vendorData.quoteAmount : 'Free'}</span>
                </div>
            </div>

            <div class="vendor-chat">
                <div class="chat-header">
                    <h5>Chat with ${vendorData.name}</h5>
                    <button class="btn-icon chat-toggle" title="Toggle Chat">
                        <i class="fas fa-chevron-down"></i>
                    </button>
                </div>
                
                <div class="chat-container" style="display: none;">
                    <div class="chat-messages" id="chatMessages-${newVendorId}">
                        <!-- Welcome message -->
                        <div class="message admin-message">
                            <div class="message-content">
                                <p>Welcome ${vendorData.name}! We're excited to work with you on this project.</p>
                                <span class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="chat-input">
                        <div class="input-group">
                            <input type="text" class="chat-message-input" placeholder="Type your message..." data-vendor-id="${newVendorId}">
                            <button class="btn-icon send-message" data-vendor-id="${newVendorId}">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add to vendors grid
        const vendorsGrid = document.querySelector('.vendors-grid');
        vendorsGrid.appendChild(vendorCard);
        
        // Update vendor count
        const vendorCount = document.querySelector('.vendor-count');
        const currentCount = parseInt(vendorCount.textContent);
        vendorCount.textContent = `${currentCount + 1} vendors assigned`;
        
        // Reinitialize chat functionality for new vendor
        initializeChat();
        
        // Add smooth animation
        vendorCard.style.opacity = '0';
        vendorCard.style.transform = 'translateY(20px)';
        setTimeout(() => {
            vendorCard.style.transition = 'all 0.5s ease';
            vendorCard.style.opacity = '1';
            vendorCard.style.transform = 'translateY(0)';
        }, 100);
    }
    
    function formatAppointmentDate(date, time) {
        const appointmentDate = new Date(`${date}T${time}`);
        return appointmentDate.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        }) + ' at ' + appointmentDate.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }
    
    // Initialize vendor profile modal
    initializeVendorProfileModal();
    
    // Initialize edit job modal
    initializeEditJobModal();
    
    function initializeVendorProfileModal() {
        const modal = document.getElementById('viewVendorModal');
        const closeBtn = document.getElementById('closeViewVendor');
        const editBtn = document.getElementById('editVendorProfile');
        const contactBtn = document.getElementById('contactVendor');
        
        // Close modal function
        function closeVendorProfileModal() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        
        // Close modal events
        if (closeBtn) {
            closeBtn.addEventListener('click', closeVendorProfileModal);
        }
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeVendorProfileModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeVendorProfileModal();
            }
        });
        
        // Edit profile button
        if (editBtn) {
            editBtn.addEventListener('click', function() {
                window.themeManager.showNotification('Edit profile functionality coming soon!', 'info');
                // In real app, open edit form
            });
        }
        
        // Contact vendor button
        if (contactBtn) {
            contactBtn.addEventListener('click', function() {
                closeVendorProfileModal();
                // Scroll to vendor's chat section
                const vendorId = modal.dataset.currentVendorId;
                const vendorCard = document.querySelector(`[data-vendor-id="${vendorId}"]`);
                if (vendorCard) {
                    vendorCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Open chat if closed
                    const chatContainer = vendorCard.querySelector('.chat-container');
                    const chatToggle = vendorCard.querySelector('.chat-toggle');
                    if (chatContainer.style.display === 'none') {
                        chatContainer.style.display = 'flex';
                        chatToggle.classList.add('active');
                    }
                    window.themeManager.showNotification('Chat opened for vendor', 'success');
                }
            });
        }
    }
    
    function openVendorProfile(vendorId, vendorCard) {
        // Get vendor data from the card
        const vendorName = vendorCard.querySelector('.vendor-details h4').textContent;
        const vendorSpecialization = vendorCard.querySelector('.vendor-specialization').textContent;
        const vendorStatus = vendorCard.querySelector('.vendor-status').textContent;
        const vendorEmail = vendorCard.querySelector('.contact-item:nth-child(1) span').textContent;
        const vendorPhone = vendorCard.querySelector('.contact-item:nth-child(2) span').textContent;
        
        // Get additional data from contact items
        const contactItems = vendorCard.querySelectorAll('.contact-item');
        let appointmentInfo = '';
        let platformInfo = '';
        let quoteInfo = '';
        
        contactItems.forEach(item => {
            const icon = item.querySelector('i');
            const text = item.querySelector('span').textContent;
            
            if (icon.classList.contains('fa-calendar')) {
                appointmentInfo = text;
            } else if (icon.classList.contains('fa-globe')) {
                platformInfo = text;
            } else if (icon.classList.contains('fa-dollar-sign')) {
                quoteInfo = text;
            }
        });
        
        // Extract quote type and amount
        const quoteType = quoteInfo.includes('Free') ? 'Free Quote' : 'Paid Quote';
        const quoteAmount = quoteInfo.includes('Free') ? null : quoteInfo.replace('Quote: $', '');
        
        // Get vendor initials for avatar
        const initials = vendorName.split(' ').map(n => n[0]).join('').toUpperCase();
        
        // Populate modal with vendor data
        document.getElementById('modalVendorName').textContent = vendorName;
        document.getElementById('modalVendorSpecialization').textContent = vendorSpecialization;
        document.getElementById('modalVendorStatus').textContent = vendorStatus;
        document.getElementById('modalVendorStatus').className = `vendor-status ${vendorStatus.toLowerCase()}`;
        document.getElementById('modalVendorEmail').textContent = vendorEmail;
        document.getElementById('modalVendorPhone').textContent = vendorPhone;
        document.getElementById('modalVendorAppointment').textContent = appointmentInfo;
        document.getElementById('modalVendorQuoteType').textContent = quoteType;
        
        // Set avatar
        const avatarElement = document.getElementById('modalVendorAvatar');
        avatarElement.innerHTML = initials;
        
        // Show/hide platform if available
        if (platformInfo) {
            document.getElementById('modalVendorPlatform').textContent = platformInfo.replace('Platform: ', '');
            document.getElementById('modalVendorPlatformRow').style.display = 'flex';
        } else {
            document.getElementById('modalVendorPlatformRow').style.display = 'none';
        }
        
        // Show/hide quote amount if available
        if (quoteAmount) {
            document.getElementById('modalVendorQuoteAmount').textContent = `$${quoteAmount}`;
            document.getElementById('modalVendorQuoteAmountRow').style.display = 'flex';
        } else {
            document.getElementById('modalVendorQuoteAmountRow').style.display = 'none';
        }
        
        // Load chat attachments
        loadChatAttachments(vendorId);
        
        // Store current vendor ID for contact button
        document.getElementById('viewVendorModal').dataset.currentVendorId = vendorId;
        
        // Show modal
        document.getElementById('viewVendorModal').style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        window.themeManager.showNotification(`Viewing profile for ${vendorName}`, 'info');
    }
    
    function loadChatAttachments(vendorId) {
        const attachmentsContainer = document.getElementById('modalVendorAttachments');
        
        // Simulate loading attachments from chat
        // In real app, this would fetch attachments from the chat messages
        const attachments = generateSampleAttachments(vendorId);
        
        if (attachments.length === 0) {
            attachmentsContainer.innerHTML = `
                <div class="vendor-no-attachments">
                    <i class="fas fa-inbox"></i>
                    <p>No attachments found in chat</p>
                </div>
            `;
        } else {
            attachmentsContainer.innerHTML = `
                <div class="vendor-attachments-grid">
                    ${attachments.map(attachment => `
                        <div class="vendor-attachment-item" onclick="openAttachment('${attachment.url}', '${attachment.name}')">
                            ${attachment.type === 'image' ? 
                                `<img src="${attachment.url}" alt="${attachment.name}">` :
                                `<div style="width: 100%; height: 140px; background: linear-gradient(135deg, var(--primary-light), var(--primary-medium)); display: flex; align-items: center; justify-content: center; color: white;">
                                    <i class="fas fa-file-${getFileIcon(attachment.type)}" style="font-size: 2.5rem;"></i>
                                </div>`
                            }
                            <div class="vendor-attachment-info">
                                <div class="vendor-attachment-name">${attachment.name}</div>
                                <div class="vendor-attachment-size">${attachment.size}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }
    
    function generateSampleAttachments(vendorId) {
        // Generate sample attachments based on vendor ID
        // In real app, this would come from actual chat messages
        const sampleAttachments = [
            {
                name: 'project-specs.pdf',
                type: 'pdf',
                size: '2.4 MB',
                url: '#'
            },
            {
                name: 'design-mockup.png',
                type: 'image',
                size: '1.8 MB',
                url: '../assets/images/sample-attachment.jpg'
            },
            {
                name: 'requirements.docx',
                type: 'document',
                size: '856 KB',
                url: '#'
            }
        ];
        
        // Randomly show some attachments (simulating real data)
        return Math.random() > 0.3 ? sampleAttachments.slice(0, Math.floor(Math.random() * 3) + 1) : [];
    }
    
    function getFileIcon(type) {
        const iconMap = {
            'pdf': 'pdf',
            'document': 'word',
            'spreadsheet': 'excel',
            'presentation': 'powerpoint',
            'image': 'image',
            'video': 'video',
            'audio': 'audio',
            'archive': 'archive'
        };
        return iconMap[type] || 'alt';
    }
    
    // Global function for opening attachments
    window.openAttachment = function(url, name) {
        if (url === '#') {
            window.themeManager.showNotification('Attachment preview not available', 'info');
        } else {
            window.openImageModal(url);
        }
    };
    
    function initializeEditJobModal() {
        const modal = document.getElementById('editJobModal');
        const form = document.getElementById('editJobForm');
        const closeBtn = document.getElementById('closeEditJob');
        const cancelBtn = document.getElementById('cancelEditJob');
        const fileInput = document.getElementById('editJobPictures');
        const fileUploadArea = document.getElementById('editFileUploadArea');
        const imagePreview = document.getElementById('editImagePreview');
        
        // Close modal function
        function closeEditJobModal() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        
        // Close modal events
        if (closeBtn) {
            closeBtn.addEventListener('click', closeEditJobModal);
        }
        
        if (cancelBtn) {
            cancelBtn.addEventListener('click', closeEditJobModal);
        }
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeEditJobModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeEditJobModal();
            }
        });
        
        // File upload functionality
        if (fileInput) {
            fileInput.addEventListener('change', function() {
                handleEditFileUpload(this.files, imagePreview);
            });
        }
        
        // Drag and drop functionality
        if (fileUploadArea) {
            fileUploadArea.addEventListener('dragover', function(e) {
                e.preventDefault();
                this.style.borderColor = 'var(--primary-medium)';
                this.style.background = 'rgba(59, 130, 246, 0.1)';
            });
            
            fileUploadArea.addEventListener('dragleave', function(e) {
                e.preventDefault();
                this.style.borderColor = 'var(--input-border)';
                this.style.background = 'var(--input-bg)';
            });
            
            fileUploadArea.addEventListener('drop', function(e) {
                e.preventDefault();
                this.style.borderColor = 'var(--input-border)';
                this.style.background = 'var(--input-bg)';
                
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    fileInput.files = files;
                    handleEditFileUpload(files, imagePreview);
                }
            });
            
            fileUploadArea.addEventListener('click', function() {
                fileInput.click();
            });
        }
        
        // Form submission
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                handleEditJobSubmission();
            });
        }
    }
    
    function openEditJobModal() {
        // Populate form with current job data
        populateEditJobForm();
        
        // Show modal
        document.getElementById('editJobModal').style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        window.themeManager.showNotification('Edit job form opened', 'info');
    }
    
    function populateEditJobForm() {
        // Get current job data from the page
        const jobData = {
            storeName: 'Tech Solutions Inc.',
            jobType: 'Website Development',
            address: '123 Business Street, Tech City, TC 12345',
            jobDetail: 'Develop a modern e-commerce website with payment integration, user management, and admin panel.',
            jobSLA: '2024-12-31T18:00',
            additionalNotes: 'Priority project with strict deadline. Client prefers modern design with mobile responsiveness.'
        };
        
        // Populate form fields
        document.getElementById('editStoreName').value = jobData.storeName;
        document.getElementById('editJobType').value = jobData.jobType;
        document.getElementById('editAddress').value = jobData.address;
        document.getElementById('editJobDetail').value = jobData.jobDetail;
        document.getElementById('editJobSLA').value = jobData.jobSLA;
        document.getElementById('editAdditionalNotes').value = jobData.additionalNotes;
        
        // Load existing images (if any)
        loadExistingJobImages();
    }
    
    function loadExistingJobImages() {
        const imagePreview = document.getElementById('editImagePreview');
        const existingImages = [
            '../assets/images/jobs/job1.jpg',
            '../assets/images/jobs/job2.jpg'
        ];
        
        if (existingImages.length > 0) {
            imagePreview.innerHTML = existingImages.map((src, index) => `
                <div class="image-preview-item">
                    <img src="${src}" alt="Job Image ${index + 1}">
                    <button class="remove-image" onclick="removeEditImage(${index})">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `).join('');
        } else {
            imagePreview.innerHTML = '';
        }
    }
    
    function handleEditFileUpload(files, imagePreview) {
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const imageItem = document.createElement('div');
                    imageItem.className = 'image-preview-item';
                    imageItem.innerHTML = `
                        <img src="${e.target.result}" alt="Preview">
                        <button class="remove-image" onclick="this.parentElement.remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    `;
                    imagePreview.appendChild(imageItem);
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    function handleEditJobSubmission() {
        const form = document.getElementById('editJobForm');
        const formData = new FormData(form);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Close modal
            document.getElementById('editJobModal').style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Show success notification
            window.themeManager.showNotification('Job updated successfully!', 'success');
            
            // Update page content (in real app, this would refresh the data)
            updateJobDisplay();
        }, 2000);
    }
    
    function updateJobDisplay() {
        // Update job details on the page
        const newData = {
            storeName: document.getElementById('editStoreName').value,
            jobType: document.getElementById('editJobType').value,
            address: document.getElementById('editAddress').value,
            jobDetail: document.getElementById('editJobDetail').value,
            jobSLA: document.getElementById('editJobSLA').value,
            additionalNotes: document.getElementById('editAdditionalNotes').value
        };
        
        // Update page elements (simplified for demo)
        const jobTitle = document.querySelector('.header-content h2');
        if (jobTitle) {
            jobTitle.textContent = newData.storeName;
        }
        
        // Update other elements as needed
        window.themeManager.showNotification('Page updated with new job details', 'info');
    }
    
    // Global function for removing edit images
    window.removeEditImage = function(index) {
        // In real app, this would remove the image from server
        window.themeManager.showNotification('Image removed from job', 'info');
    };
    
    // Add typing indicator styles
    const style = document.createElement('style');
    style.textContent = `
        .typing-indicator .message-content {
            background: var(--input-bg);
            padding: 8px 16px;
        }
        
        .typing-dots {
            display: flex;
            gap: 4px;
            align-items: center;
        }
        
        .typing-dots span {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: var(--text-secondary);
            animation: typing 1.4s infinite ease-in-out;
        }
        
        .typing-dots span:nth-child(1) {
            animation-delay: -0.32s;
        }
        
        .typing-dots span:nth-child(2) {
            animation-delay: -0.16s;
        }
        
        @keyframes typing {
            0%, 80%, 100% {
                transform: scale(0.8);
                opacity: 0.5;
            }
            40% {
                transform: scale(1);
                opacity: 1;
            }
        }
        
        /* Responsive adjustments for view job page */
        @media (max-width: 1200px) {
            .vendors-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        
        @media (max-width: 768px) {
            .page-header {
                flex-direction: column;
                gap: 20px;
                align-items: flex-start;
            }
            
            .header-actions {
                width: 100%;
                justify-content: flex-start;
            }
            
            .job-details-grid {
                grid-template-columns: 1fr;
            }
            
            .vendors-grid {
                grid-template-columns: 1fr;
                gap: 15px;
            }
            
            .detail-item {
                flex-direction: column;
                align-items: flex-start;
                gap: 5px;
            }
            
            .detail-item .value {
                text-align: left;
            }
            
            .vendor-header {
                flex-direction: column;
                gap: 15px;
                align-items: flex-start;
            }
            
            .vendor-info {
                width: 100%;
            }
            
            .vendor-actions {
                align-self: flex-end;
                width: 100%;
                justify-content: flex-end;
            }
            
            .chat-header {
                flex-direction: column;
                gap: 10px;
                align-items: flex-start;
            }
            
            .chat-header h5 {
                width: 100%;
            }
            
                         .chat-messages {
                 max-height: 160px;
             }
             
             .chat-input {
                 padding: 10px 12px;
             }
             
             .chat-input {
                 padding: 12px 15px;
             }
            
            .message-content {
                max-width: 90%;
            }
            
            .vendor-card {
                max-height: 500px;
            }
        }
        
                 @media (max-width: 480px) {
             .vendors-grid {
                 grid-template-columns: 1fr;
                 gap: 12px;
             }
             
             .vendor-card {
                 max-height: 450px;
             }
             
             .chat-messages {
                 max-height: 180px;
             }
             
             /* Vendor Form Modal Responsive */
             .vendor-form-modal {
                 width: 95%;
                 margin: 10px auto;
             }
             
             .vendor-form {
                 padding: 20px;
             }
             
             .modal-header {
                 padding: 20px;
             }
             
             .modal-header h3 {
                 font-size: 1.2rem;
             }
             
             .radio-group {
                 flex-direction: column;
                 gap: 10px;
             }
             
             .form-row {
                 grid-template-columns: 1fr;
             }
             
             .form-actions {
                 flex-direction: column;
                 gap: 10px;
             }
             
             .form-actions button {
                 width: 100%;
             }
             
             /* Vendor Profile Modal Responsive */
             .vendor-profile-modal {
                 width: 95%;
                 margin: 10px auto;
             }
             
             .vendor-profile-content {
                 padding: 20px;
             }
             
             .vendor-profile-header {
                 flex-direction: column;
                 text-align: center;
                 gap: 15px;
                 padding: 20px;
             }
             
             .vendor-profile-avatar {
                 width: 70px;
                 height: 70px;
                 font-size: 1.3rem;
             }
             
             .vendor-profile-info h4 {
                 font-size: 1.2rem;
             }
             
             .vendor-profile-section .section-title {
                 padding: 15px 20px;
                 font-size: 1rem;
             }
             
             .vendor-attachments-grid {
                 grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
                 gap: 10px;
             }
             
             .vendor-profile-actions {
                 flex-direction: column;
                 gap: 10px;
                 padding: 20px;
             }
             
             .vendor-profile-actions button {
                 width: 100%;
             }
             
             .vendor-detail-row {
                 padding: 12px 20px;
                 gap: 15px;
             }
             
             .vendor-detail-row i {
                 width: 20px;
                 font-size: 1rem;
             }
             
             .vendor-attachments-container {
                 padding: 20px;
             }
             
             .vendor-no-attachments {
                 padding: 30px 15px;
             }
             
             .vendor-no-attachments i {
                 font-size: 2.5rem;
             }
         }
    `;
    document.head.appendChild(style);
});
