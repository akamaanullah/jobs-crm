// User Notifications JavaScript
class UserNotificationManager {
    constructor() {
        this.notifications = [];
        this.unreadCount = 0;
        this.init();
    }

    init() {
        this.loadNotifications();
        this.setupEventListeners();
        this.renderNotifications();
        this.updateNotificationCount();
    }

    setupEventListeners() {
        // Notification button click
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

        // Mark all as read
        const userMarkAllRead = document.getElementById('userMarkAllRead');
        if (userMarkAllRead) {
            userMarkAllRead.addEventListener('click', () => {
                this.markAllAsRead();
            });
        }
    }

    loadNotifications() {
        // Load from localStorage or use sample data
        const savedNotifications = localStorage.getItem('userNotifications');
        if (savedNotifications) {
            this.notifications = JSON.parse(savedNotifications);
        } else {
            // Sample notifications for user
            this.notifications = [
                {
                    id: 1,
                    type: 'vendor_approved',
                    title: 'Vendor Approved',
                    message: 'John Smith has been approved for your E-commerce project',
                    time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
                    read: false,
                    data: { jobId: 1, vendorId: 1 }
                },
                {
                    id: 2,
                    type: 'request_pending',
                    title: 'Request Pending',
                    message: 'Your vendor approval request is under review',
                    time: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
                    read: false,
                    data: { requestId: 1 }
                },
                {
                    id: 3,
                    type: 'vendor_added',
                    title: 'New Vendor Added',
                    message: 'Sarah Johnson has been added to your Mobile App project',
                    time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
                    read: true,
                    data: { jobId: 2, vendorId: 2 }
                },
                {
                    id: 4,
                    type: 'job_completed',
                    title: 'Job Completed',
                    message: 'Your Logo Design project has been completed successfully',
                    time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
                    read: true,
                    data: { jobId: 3 }
                },
                {
                    id: 5,
                    type: 'payment_received',
                    title: 'Payment Received',
                    message: 'Payment for Mobile App Development has been received',
                    time: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
                    read: true,
                    data: { jobId: 2 }
                }
            ];
            this.saveNotifications();
        }
        
        this.unreadCount = this.notifications.filter(n => !n.read).length;
    }

    saveNotifications() {
        localStorage.setItem('userNotifications', JSON.stringify(this.notifications));
    }

    renderNotifications() {
        const userNotificationsList = document.getElementById('userNotificationsList');
        if (!userNotificationsList) return;

        // Show only recent notifications (last 5)
        const recentNotifications = this.notifications.slice(0, 5);
        
        if (recentNotifications.length === 0) {
            userNotificationsList.innerHTML = `
                <div style="padding: 2rem; text-align: center; color: var(--text-secondary);">
                    <i class="fas fa-bell-slash" style="font-size: 2rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <p>No notifications yet</p>
                </div>
            `;
            return;
        }

        userNotificationsList.innerHTML = recentNotifications.map(notification => {
            const icon = this.getNotificationIcon(notification.type);
            const timeAgo = this.getTimeAgo(notification.time);
            const unreadClass = notification.read ? '' : 'unread';
            
            return `
                <div class="user-notification-item ${unreadClass}" data-id="${notification.id}">
                    <div class="user-notification-icon">
                        <i class="fas ${icon}"></i>
                    </div>
                    <div class="user-notification-content">
                        <h4>${notification.title}</h4>
                        <p>${notification.message}</p>
                        <span class="user-notification-time">${timeAgo}</span>
                    </div>
                    ${!notification.read ? '<div class="user-notification-unread"></div>' : ''}
                </div>
            `;
        }).join('');

        // Add click handlers
        userNotificationsList.querySelectorAll('.user-notification-item').forEach(item => {
            item.addEventListener('click', () => {
                const notificationId = parseInt(item.dataset.id);
                this.markAsRead(notificationId);
                this.handleNotificationClick(notificationId);
            });
        });
    }

    getNotificationIcon(type) {
        const icons = {
            'vendor_approved': 'fa-check-circle',
            'request_pending': 'fa-clock',
            'vendor_added': 'fa-user-plus',
            'job_completed': 'fa-check-double',
            'payment_received': 'fa-money-bill-wave',
            'status_update': 'fa-info-circle',
            'visit_approved': 'fa-eye',
            'final_approved': 'fa-thumbs-up'
        };
        return icons[type] || 'fa-bell';
    }

    getTimeAgo(date) {
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 60) {
            return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
        } else if (hours < 24) {
            return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        } else {
            return `${days} day${days !== 1 ? 's' : ''} ago`;
        }
    }

    updateNotificationCount() {
        const userNotificationCount = document.getElementById('userNotificationCount');
        if (userNotificationCount) {
            if (this.unreadCount > 0) {
                userNotificationCount.style.display = 'block';
                userNotificationCount.textContent = this.unreadCount > 99 ? '99+' : this.unreadCount;
            } else {
                userNotificationCount.style.display = 'none';
            }
        }
    }

    markAsRead(notificationId) {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification && !notification.read) {
            notification.read = true;
            this.unreadCount--;
            this.saveNotifications();
            this.renderNotifications();
            this.updateNotificationCount();
        }
    }

    markAllAsRead() {
        this.notifications.forEach(notification => {
            notification.read = true;
        });
        this.unreadCount = 0;
        this.saveNotifications();
        this.renderNotifications();
        this.updateNotificationCount();
        
        // Show success message
        if (window.userDashboard) {
            window.userDashboard.showUserNotification('All notifications marked as read', 'success');
        }
    }

    handleNotificationClick(notificationId) {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (!notification) return;

        // Navigate based on notification type and data
        if (notification.data) {
            if (notification.data.jobId) {
                window.location.href = `view-job.php?id=${notification.data.jobId}`;
            } else if (notification.data.requestId) {
                // For user, this might go to a requests page or stay on current page
                console.log('Request notification clicked:', notification.data.requestId);
            }
        }
    }

    addNotification(notification) {
        notification.id = Date.now();
        notification.time = new Date();
        notification.read = false;
        
        this.notifications.unshift(notification);
        this.unreadCount++;
        
        // Keep only last 50 notifications
        if (this.notifications.length > 50) {
            this.notifications = this.notifications.slice(0, 50);
        }
        
        this.saveNotifications();
        this.renderNotifications();
        this.updateNotificationCount();
        
        // Show toast notification
        this.showToastNotification(notification);
    }

    showToastNotification(notification) {
        const toast = document.createElement('div');
        toast.className = 'user-toast-notification';
        toast.innerHTML = `
            <div class="user-toast-content">
                <div class="user-toast-icon">
                    <i class="fas ${this.getNotificationIcon(notification.type)}"></i>
                </div>
                <div class="user-toast-text">
                    <div class="user-toast-title">${notification.title}</div>
                    <div class="user-toast-message">${notification.message}</div>
                </div>
                <button class="user-toast-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Add styles
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: all 0.3s ease;
            max-width: 350px;
            border-left: 4px solid var(--primary-medium);
        `;

        document.body.appendChild(toast);

        // Show animation
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, 5000);

        // Close button
        const closeBtn = toast.querySelector('.user-toast-close');
        closeBtn.addEventListener('click', () => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 300);
        });
    }

    // Simulate new notifications (for demo purposes)
    simulateNewNotification() {
        const types = ['vendor_approved', 'request_pending', 'vendor_added', 'job_completed', 'payment_received'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        const notifications = {
            'vendor_approved': {
                title: 'Vendor Approved',
                message: 'A new vendor has been approved for your project'
            },
            'request_pending': {
                title: 'Request Pending',
                message: 'Your vendor approval request is under review'
            },
            'vendor_added': {
                title: 'New Vendor Added',
                message: 'A new vendor has been added to your project'
            },
            'job_completed': {
                title: 'Job Completed',
                message: 'One of your projects has been completed'
            },
            'payment_received': {
                title: 'Payment Received',
                message: 'Payment has been received for your project'
            }
        };

        this.addNotification({
            type: type,
            title: notifications[type].title,
            message: notifications[type].message,
            data: { jobId: Math.floor(Math.random() * 5) + 1 }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.userNotificationManager = new UserNotificationManager();
    
    // Simulate new notifications every 30 seconds (for demo)
    // setInterval(() => {
    //     if (Math.random() > 0.7) { // 30% chance
    //         window.userNotificationManager.simulateNewNotification();
    //     }
    // }, 30000);
});

// Export for use in other files
window.UserNotificationManager = UserNotificationManager;
