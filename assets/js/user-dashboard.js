// User Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing user dashboard...');
    initializeUserDashboard();
});

function initializeUserDashboard() {
    setupUserEventListeners();
    initializeUserAnimations();
    loadUserStats();
}

function setupUserEventListeners() {
    // Sidebar toggle
    const userSidebarToggle = document.getElementById('userSidebarToggle');
    const userSidebar = document.querySelector('.user-sidebar');
    const userSidebarOverlay = document.getElementById('userSidebarOverlay');
    
    console.log('Setting up sidebar toggle:', userSidebarToggle, userSidebar); // Debug log
    
    if (userSidebarToggle && userSidebar) {
        userSidebarToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Sidebar toggle clicked'); // Debug log
            
            const isVisible = userSidebar.classList.contains('show');
            console.log('Sidebar currently visible:', isVisible);
            
            if (isVisible) {
                userSidebar.classList.remove('show');
                if (userSidebarOverlay && window.innerWidth > 1024) {
                    userSidebarOverlay.classList.remove('show');
                }
            } else {
                userSidebar.classList.add('show');
                if (userSidebarOverlay && window.innerWidth > 1024) {
                    userSidebarOverlay.classList.add('show');
                }
            }
            
            console.log('Sidebar show class after toggle:', userSidebar.classList.contains('show'));
        });
    } else {
        console.error('Sidebar toggle elements not found:', { userSidebarToggle, userSidebar });
    }
    
    // Close sidebar when clicking overlay (desktop only)
    if (userSidebarOverlay) {
        userSidebarOverlay.addEventListener('click', () => {
            console.log('Overlay clicked, closing sidebar');
            userSidebar.classList.remove('show');
            userSidebarOverlay.classList.remove('show');
        });
    }
    
    // Close sidebar button
    const userSidebarClose = document.getElementById('userSidebarClose');
    if (userSidebarClose) {
        userSidebarClose.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Close button clicked');
            userSidebar.classList.remove('show');
            if (userSidebarOverlay && window.innerWidth > 1024) {
                userSidebarOverlay.classList.remove('show');
            }
        });
    }
    
    // Close sidebar when clicking outside (mobile)
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024 && userSidebar && userSidebar.classList.contains('show')) {
            if (!userSidebar.contains(e.target) && !userSidebarToggle.contains(e.target)) {
                console.log('Clicked outside, closing sidebar');
                userSidebar.classList.remove('show');
            }
        }
    });

    // User dropdown toggle
    const userDropdownToggle = document.getElementById('userDropdownToggle');
    const userDropdownMenu = document.getElementById('userDropdownMenu');
    
    if (userDropdownToggle && userDropdownMenu) {
        userDropdownToggle.addEventListener('click', () => {
            userDropdownMenu.classList.toggle('show');
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (userDropdownMenu && !userDropdownToggle.contains(e.target) && !userDropdownMenu.contains(e.target)) {
            userDropdownMenu.classList.remove('show');
        }
    });

    // User notification button
    const userNotificationBtn = document.getElementById('userNotificationBtn');
    const userNotificationsPanel = document.getElementById('userNotificationsPanel');
    
    if (userNotificationBtn && userNotificationsPanel) {
        userNotificationBtn.addEventListener('click', () => {
            userNotificationsPanel.classList.toggle('show');
        });
    }

    // Close notifications panel when clicking outside
    document.addEventListener('click', (e) => {
        if (userNotificationsPanel && !userNotificationBtn.contains(e.target) && !userNotificationsPanel.contains(e.target)) {
            userNotificationsPanel.classList.remove('show');
        }
    });

    // User mark all read
    const userMarkAllRead = document.getElementById('userMarkAllRead');
    if (userMarkAllRead) {
        userMarkAllRead.addEventListener('click', () => {
            markAllUserNotificationsAsRead();
        });
    }

    // Quick action cards
    const userQuickActionCards = document.querySelectorAll('.user-quick-action-card');
    userQuickActionCards.forEach(card => {
        card.addEventListener('click', function() {
            const href = this.getAttribute('onclick');
            if (href) {
                // Extract URL from onclick attribute
                const url = href.match(/window\.location\.href='([^']+)'/);
                if (url && url[1]) {
                    window.location.href = url[1];
                }
            }
        });
    });
}

function initializeUserAnimations() {
    // Animate stats cards on load
    const userStatCards = document.querySelectorAll('.user-stat-card');
    userStatCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, index * 100);
    });

    // Animate dashboard cards
    const userDashboardCards = document.querySelectorAll('.user-dashboard-card');
    userDashboardCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateX(-20px)';
            card.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
            }, 100);
        }, (index + 4) * 100);
    });

    // Animate quick action cards
    const userQuickActionCards = document.querySelectorAll('.user-quick-action-card');
    userQuickActionCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            card.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 100);
        }, (index + 6) * 100);
    });
}

function loadUserStats() {
    // Simulate loading user stats
    // In real app, this would be an API call
    const userStatNumbers = document.querySelectorAll('.user-stat-number');
    
    userStatNumbers.forEach((stat, index) => {
        const finalValue = stat.textContent;
        const startValue = 0;
        const duration = 1000;
        const increment = finalValue / (duration / 16);
        let currentValue = 0;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(currentValue);
        }, 16);
    });
}

function markAllUserNotificationsAsRead() {
    // Simulate marking all notifications as read
    const userNotificationCount = document.getElementById('userNotificationCount');
    if (userNotificationCount) {
        userNotificationCount.style.display = 'none';
        userNotificationCount.textContent = '0';
    }

    // Show success message
    if (window.themeManager) {
        window.themeManager.showNotification('All notifications marked as read', 'success');
    } else {
        showUserNotification('All notifications marked as read', 'success');
    }
}

function showUserNotification(message, type = 'info') {
    // Create a simple notification if themeManager is not available
    const notification = document.createElement('div');
    notification.className = `user-toast-notification ${type}`;
    notification.innerHTML = `
        <div class="user-toast-content">
            <div class="user-toast-icon">
                <i class="fas ${getUserNotificationIcon(type)}"></i>
            </div>
            <div class="user-toast-text">
                <div class="user-toast-message">${message}</div>
            </div>
            <button class="user-toast-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
    `;

    document.body.appendChild(notification);

    // Show animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);

    // Close button
    const closeBtn = notification.querySelector('.user-toast-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
}

function getUserNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// User dashboard specific functions
function updateUserJobStatus(jobId, newStatus) {
    // Simulate updating job status
    const jobItem = document.querySelector(`[data-job-id="${jobId}"]`);
    if (jobItem) {
        const statusElement = jobItem.querySelector('.user-job-status');
        if (statusElement) {
            statusElement.textContent = newStatus;
            statusElement.className = `user-job-status ${newStatus.toLowerCase().replace(' ', '-')}`;
        }
    }
}

function refreshUserDashboard() {
    // Simulate refreshing dashboard data
    loadUserStats();
    
    // Show refresh notification
    showUserNotification('Dashboard refreshed successfully', 'success');
}

// Logout function
function logout() {
    // Show confirmation dialog
    if (confirm('Are you sure you want to logout?')) {
        // Clear any stored data
        localStorage.removeItem('userNotifications');
        
        // Show logout notification
        showUserNotification('Logging out...', 'info');
        
        // Redirect to login page after a short delay
        setTimeout(() => {
            window.location.href = '../login.php';
        }, 1000);
    }
}

// Export functions for use in other files
window.userDashboard = {
    updateUserJobStatus,
    refreshUserDashboard,
    showUserNotification,
    logout
};
