// Notifications System
class NotificationManager {
    constructor() {
        this.notifications = [];
        this.unreadCount = 0;
        this.init();
    }

    init() {
        this.loadNotifications();
        this.initializeEventListeners();
        this.updateNotificationCount();
        this.renderNotifications();
        
        // Auto-refresh notifications every 30 seconds
        setInterval(() => {
            this.checkNewNotifications();
        }, 30000);
    }

    initializeEventListeners() {
        // Notification button click
        const notificationBtn = document.getElementById('notificationBtn');
        if (notificationBtn) {
            notificationBtn.addEventListener('click', () => {
                this.toggleNotificationsPanel();
            });
        }

        // Mark all as read
        const markAllReadBtn = document.getElementById('markAllRead');
        if (markAllReadBtn) {
            markAllReadBtn.addEventListener('click', () => {
                this.markAllAsRead();
            });
        }

        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            const panel = document.getElementById('notificationsPanel');
            const btn = document.getElementById('notificationBtn');
            
            if (panel && !panel.contains(e.target) && !btn.contains(e.target)) {
                this.hideNotificationsPanel();
            }
        });
    }

    loadNotifications() {
        // Load from localStorage or use sample data
        const savedNotifications = localStorage.getItem('notifications');
        if (savedNotifications) {
            this.notifications = JSON.parse(savedNotifications);
        } else {
            // Sample notifications
            this.notifications = [
                {
                    id: 1,
                    type: 'request',
                    title: 'New Visit Approval Request',
                    message: 'Ahmed Khan has requested visit approval for vendor John Smith',
                    time: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
                    read: false,
                    data: { requestId: 1, userId: 'ahmed.khan' }
                },
                {
                    id: 2,
                    type: 'vendor_added',
                    title: 'New Vendor Added',
                    message: 'Sarah Johnson has added a new vendor: Mike Wilson (UI/UX Design)',
                    time: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
                    read: false,
                    data: { jobId: 'JOB-002', vendorName: 'Mike Wilson' }
                },
                {
                    id: 3,
                    type: 'visit_approved',
                    title: 'Visit Approved',
                    message: 'Visit approval for Lisa Anderson has been approved by admin',
                    time: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
                    read: false,
                    data: { requestId: 4, userId: 'lisa.anderson' }
                },
                {
                    id: 4,
                    type: 'status_update',
                    title: 'Job Status Updated',
                    message: 'Job "Tech Solutions Website" status changed to "In Progress"',
                    time: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
                    read: false,
                    data: { jobId: 'JOB-001', status: 'In Progress' }
                },
                {
                    id: 5,
                    type: 'final_approved',
                    title: 'Final Approval Granted',
                    message: 'Final approval for Emily Davis has been granted',
                    time: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
                    read: false,
                    data: { requestId: 6, userId: 'emily.davis' }
                },
                {
                    id: 6,
                    type: 'job_completed',
                    title: 'Job Completed',
                    message: 'Job "Inventory Management System" has been completed successfully',
                    time: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
                    read: false,
                    data: { jobId: 'JOB-003', jobName: 'Inventory Management System' }
                },
                {
                    id: 7,
                    type: 'payment_received',
                    title: 'Payment Received',
                    message: 'Payment of $2,500 has been received for completed work',
                    time: new Date(Date.now() - 35 * 60 * 1000), // 35 minutes ago
                    read: false,
                    data: { amount: 2500, jobId: 'JOB-004' }
                },
                {
                    id: 8,
                    type: 'rejected',
                    title: 'Request Rejected',
                    message: 'Final approval request for Michael Clark has been rejected',
                    time: new Date(Date.now() - 40 * 60 * 1000), // 40 minutes ago
                    read: false,
                    data: { requestId: 5, userId: 'michael.clark' }
                },
                {
                    id: 9,
                    type: 'payment',
                    title: 'Payment Request',
                    message: 'David Brown has requested payment for completed work',
                    time: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
                    read: true,
                    data: { requestId: 3, userId: 'david.brown' }
                }
            ];
            this.saveNotifications();
        }
        
        this.updateUnreadCount();
    }

    saveNotifications() {
        localStorage.setItem('notifications', JSON.stringify(this.notifications));
    }

    updateUnreadCount() {
        this.unreadCount = this.notifications.filter(n => !n.read).length;
    }

    updateNotificationCount() {
        const countElement = document.getElementById('notificationCount');
        if (countElement) {
            countElement.textContent = this.unreadCount;
            countElement.style.display = this.unreadCount > 0 ? 'block' : 'none';
        }
    }

    renderNotifications() {
        const listElement = document.getElementById('notificationsList');
        if (!listElement) return;

        listElement.innerHTML = '';

        if (this.notifications.length === 0) {
            listElement.innerHTML = `
                <div class="notification-item">
                    <div class="notification-content">
                        <div class="notification-title">No notifications</div>
                        <div class="notification-message">You're all caught up!</div>
                    </div>
                </div>
            `;
            return;
        }

        // Show latest 10 notifications
        const recentNotifications = this.notifications
            .sort((a, b) => new Date(b.time) - new Date(a.time))
            .slice(0, 10);

        recentNotifications.forEach(notification => {
            const notificationElement = this.createNotificationElement(notification);
            listElement.appendChild(notificationElement);
        });
    }

    createNotificationElement(notification) {
        const element = document.createElement('div');
        element.className = `notification-item ${notification.read ? '' : 'unread'}`;
        element.dataset.notificationId = notification.id;

        const iconClass = this.getNotificationIcon(notification.type);
        const timeAgo = this.getTimeAgo(notification.time);

        element.innerHTML = `
            <div class="notification-icon ${notification.type}">
                <i class="fas ${iconClass}"></i>
            </div>
            <div class="notification-content">
                <div class="notification-title">${notification.title}</div>
                <div class="notification-message">${notification.message}</div>
                <div class="notification-time">${timeAgo}</div>
            </div>
            ${!notification.read ? '<div class="notification-unread"></div>' : ''}
        `;

        // Add click event
        element.addEventListener('click', () => {
            this.markAsRead(notification.id);
            this.handleNotificationClick(notification);
        });

        return element;
    }

    getNotificationIcon(type) {
        switch (type) {
            case 'request': return 'fa-clock';
            case 'approved': return 'fa-check-circle';
            case 'rejected': return 'fa-times-circle';
            case 'payment': return 'fa-dollar-sign';
            case 'job_completed': return 'fa-check-double';
            case 'vendor_added': return 'fa-user-plus';
            case 'status_update': return 'fa-sync-alt';
            case 'payment_received': return 'fa-money-bill-wave';
            case 'visit_approved': return 'fa-eye';
            case 'final_approved': return 'fa-star';
            default: return 'fa-bell';
        }
    }

    getTimeAgo(date) {
        const now = new Date();
        const diffInSeconds = Math.floor((now - new Date(date)) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return `${Math.floor(diffInSeconds / 86400)}d ago`;
    }

    toggleNotificationsPanel() {
        const panel = document.getElementById('notificationsPanel');
        if (panel) {
            panel.classList.toggle('show');
        }
    }

    hideNotificationsPanel() {
        const panel = document.getElementById('notificationsPanel');
        if (panel) {
            panel.classList.remove('show');
        }
    }

    markAsRead(notificationId) {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
            this.saveNotifications();
            this.updateUnreadCount();
            this.updateNotificationCount();
            this.renderNotifications();
        }
    }

    markAllAsRead() {
        this.notifications.forEach(notification => {
            notification.read = true;
        });
        this.saveNotifications();
        this.updateUnreadCount();
        this.updateNotificationCount();
        this.renderNotifications();
    }

    handleNotificationClick(notification) {
        // Navigate based on notification type
        if (notification.data) {
            if (notification.data.requestId) {
                window.location.href = 'requests.php';
            } else if (notification.data.jobId) {
                window.location.href = 'view-job.php?id=' + notification.data.jobId;
            } else {
                window.location.href = 'activity.php';
            }
        } else {
            window.location.href = 'activity.php';
        }
    }

    addNotification(notification) {
        const newNotification = {
            id: Date.now(),
            ...notification,
            time: new Date(),
            read: false
        };

        this.notifications.unshift(newNotification);
        this.saveNotifications();
        this.updateUnreadCount();
        this.updateNotificationCount();
        this.renderNotifications();

        // Show toast notification
        this.showToastNotification(newNotification);
    }

    showToastNotification(notification) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `
            <div class="toast-content">
                <div class="toast-icon ${notification.type}">
                    <i class="fas ${this.getNotificationIcon(notification.type)}"></i>
                </div>
                <div class="toast-text">
                    <div class="toast-title">${notification.title}</div>
                    <div class="toast-message">${notification.message}</div>
                </div>
                <button class="toast-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.body.appendChild(toast);

        // Show animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 5000);

        // Close button
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        });
    }

    checkNewNotifications() {
        // Simulate checking for new notifications
        // In real app, this would be an API call
        const shouldAddNotification = Math.random() < 0.3; // 30% chance

        if (shouldAddNotification) {
            const sampleNotifications = [
                {
                    type: 'request',
                    title: 'New Request Received',
                    message: 'A new vendor approval request has been submitted',
                    data: { requestId: Math.floor(Math.random() * 100) + 1 }
                },
                {
                    type: 'vendor_added',
                    title: 'New Vendor Added',
                    message: 'A new vendor has been added to a job',
                    data: { jobId: 'JOB-' + Math.floor(Math.random() * 100) + 1 }
                },
                {
                    type: 'status_update',
                    title: 'Job Status Updated',
                    message: 'A job status has been updated',
                    data: { jobId: 'JOB-' + Math.floor(Math.random() * 100) + 1 }
                },
                {
                    type: 'visit_approved',
                    title: 'Visit Approved',
                    message: 'A vendor visit has been approved',
                    data: { requestId: Math.floor(Math.random() * 100) + 1 }
                },
                {
                    type: 'final_approved',
                    title: 'Final Approval Granted',
                    message: 'Final approval has been granted for a vendor',
                    data: { requestId: Math.floor(Math.random() * 100) + 1 }
                },
                {
                    type: 'job_completed',
                    title: 'Job Completed',
                    message: 'A job has been completed successfully',
                    data: { jobId: 'JOB-' + Math.floor(Math.random() * 100) + 1 }
                },
                {
                    type: 'payment_received',
                    title: 'Payment Received',
                    message: 'Payment has been received for completed work',
                    data: { amount: Math.floor(Math.random() * 5000) + 500 }
                },
                {
                    type: 'approved',
                    title: 'Request Approved',
                    message: 'A vendor approval request has been approved',
                    data: { requestId: Math.floor(Math.random() * 100) + 1 }
                },
                {
                    type: 'payment',
                    title: 'Payment Request',
                    message: 'A payment request has been submitted',
                    data: { requestId: Math.floor(Math.random() * 100) + 1 }
                }
            ];

            const randomNotification = sampleNotifications[Math.floor(Math.random() * sampleNotifications.length)];
            this.addNotification(randomNotification);
        }
    }
}

// Initialize notifications when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.notificationManager = new NotificationManager();
});

// Export for use in other files
window.NotificationManager = NotificationManager;
