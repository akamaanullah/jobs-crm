// User Vendors JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeUserVendors();
});

function initializeUserVendors() {
    setupAddVendorModal();
    setupSearchFunctionality();
    setupVendorActions();
    setupQuoteTypeToggle();
}

// Add Vendor Modal
function setupAddVendorModal() {
    const addVendorBtn = document.getElementById('addNewVendor');
    const addFirstVendorBtn = document.getElementById('addFirstVendor');
    const modal = document.getElementById('addVendorModal');
    const closeBtn = document.getElementById('closeAddVendor');
    const cancelBtn = document.getElementById('cancelAddVendor');
    const form = document.getElementById('addVendorForm');

    // Open modal
    if (addVendorBtn) {
        addVendorBtn.addEventListener('click', () => {
            modal.style.display = 'block';
        });
    }

    if (addFirstVendorBtn) {
        addFirstVendorBtn.addEventListener('click', () => {
            modal.style.display = 'block';
        });
    }

    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Form submission
    if (form) {
        form.addEventListener('submit', handleAddVendor);
    }
}

// Handle Add Vendor Form
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

    // Validate form data
    if (!validateVendorData(vendorData)) {
        return;
    }

    // Here you would typically send data to server
    console.log('Adding vendor:', vendorData);
    
    // Show success message
    showNotification('Vendor added successfully!', 'success');
    
    // Close modal and reset form
    document.getElementById('addVendorModal').style.display = 'none';
    e.target.reset();
    
    // Reload page to show new vendor (in real app, you'd update the list dynamically)
    setTimeout(() => {
        location.reload();
    }, 1000);
}

// Validate Vendor Data
function validateVendorData(data) {
    if (!data.name || !data.phone || !data.email || !data.specialization) {
        showNotification('Please fill in all required fields.', 'error');
        return false;
    }

    if (data.quoteType === 'paid' && (!data.quoteAmount || data.quoteAmount <= 0)) {
        showNotification('Please enter a valid quote amount for paid quotes.', 'error');
        return false;
    }

    if (!data.appointmentDate || !data.appointmentTime) {
        showNotification('Please select appointment date and time.', 'error');
        return false;
    }

    return true;
}

// Quote Type Toggle
function setupQuoteTypeToggle() {
    const quoteTypeRadios = document.querySelectorAll('input[name="quoteType"]');
    const quoteAmountGroup = document.getElementById('quoteAmountGroup');
    const quoteAmountInput = document.getElementById('quoteAmount');

    quoteTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'paid') {
                quoteAmountGroup.style.display = 'block';
                quoteAmountInput.required = true;
            } else {
                quoteAmountGroup.style.display = 'none';
                quoteAmountInput.required = false;
                quoteAmountInput.value = '';
            }
        });
    });
}

// Search Functionality
function setupSearchFunctionality() {
    const searchInput = document.getElementById('vendorSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            
            if (query.length > 0) {
                // Add search parameter to URL
                const url = new URL(window.location);
                url.searchParams.set('search', query);
                window.history.pushState({}, '', url);
            } else {
                // Remove search parameter from URL
                const url = new URL(window.location);
                url.searchParams.delete('search');
                window.history.pushState({}, '', url);
            }
        });

        // Handle Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = this.value.trim();
                if (query) {
                    window.location.href = `?search=${encodeURIComponent(query)}`;
                }
            }
        });
    }
}

// Vendor Actions
function setupVendorActions() {
    // This will be called for any vendor action buttons
    console.log('Vendor actions setup complete');
}

// View Vendor Details
function viewVendorDetails(vendorId) {
    // In real app, this would open a detailed view modal
    console.log('Viewing vendor details for ID:', vendorId);
    showNotification('Vendor details feature coming soon!', 'info');
}

// Edit Vendor
function editVendor(vendorId) {
    // In real app, this would open an edit modal
    console.log('Editing vendor with ID:', vendorId);
    showNotification('Edit vendor feature coming soon!', 'info');
}

// Remove Vendor
function removeVendor(vendorId) {
    if (confirm('Are you sure you want to remove this vendor? This action cannot be undone.')) {
        // In real app, this would send a delete request to server
        console.log('Removing vendor with ID:', vendorId);
        showNotification('Vendor removed successfully!', 'success');
        
        // Remove from DOM (in real app, you'd wait for server confirmation)
        const vendorCard = document.querySelector(`[data-vendor-id="${vendorId}"]`);
        if (vendorCard) {
            vendorCard.remove();
        }
    }
}

// Show Notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `user-notification user-notification-${type}`;
    notification.innerHTML = `
        <div class="user-notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="user-notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Auto hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);

    // Close button functionality
    const closeBtn = notification.querySelector('.user-notification-close');
    closeBtn.addEventListener('click', () => {
        hideNotification(notification);
    });
}

// Hide Notification
function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Get Notification Icon
function getNotificationIcon(type) {
    switch (type) {
        case 'success':
            return 'check-circle';
        case 'error':
            return 'exclamation-circle';
        case 'warning':
            return 'exclamation-triangle';
        default:
            return 'info-circle';
    }
}

// Export functions for global use
window.viewVendorDetails = viewVendorDetails;
window.editVendor = editVendor;
window.removeVendor = removeVendor;
