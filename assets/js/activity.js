// Activity Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeActivityPage();
});

// Pagination variables
let currentPage = 1;
const itemsPerPage = 10;
let allActivities = [];

function initializeActivityPage() {
    loadActivities();
    setupEventListeners();
    updateStats();
    setupPagination();
}

function setupEventListeners() {
    // Filter functionality
    const typeFilter = document.getElementById('typeFilter');
    const statusFilter = document.getElementById('statusFilter');
    const markAllReadBtn = document.getElementById('markAllRead');

    if (typeFilter) {
        typeFilter.addEventListener('change', filterActivities);
    }

    if (statusFilter) {
        statusFilter.addEventListener('change', filterActivities);
    }

    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', markAllAsRead);
    }
}

function loadActivities() {
    const activityList = document.getElementById('activityList');
    if (!activityList) return;

    // Get notifications from localStorage
    const savedNotifications = localStorage.getItem('notifications');
    let notifications = [];
    
    if (savedNotifications) {
        notifications = JSON.parse(savedNotifications);
    }

    // Sort by time (newest first)
    allActivities = notifications.sort((a, b) => new Date(b.time) - new Date(a.time));

    // Display first page
    displayCurrentPage();
}

function displayCurrentPage() {
    const activityList = document.getElementById('activityList');
    if (!activityList) return;

    // Clear current list
    activityList.innerHTML = '';

    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentActivities = allActivities.slice(startIndex, endIndex);

    if (currentActivities.length === 0) {
        activityList.innerHTML = `
            <div class="activity-item">
                <div class="activity-content">
                    <div class="activity-title">No activities found</div>
                    <div class="activity-message">There are no activities to display.</div>
                </div>
            </div>
        `;
        return;
    }

    // Display current page activities
    currentActivities.forEach(activity => {
        const activityElement = createActivityElement(activity);
        activityList.appendChild(activityElement);
    });

    // Update pagination controls
    updatePaginationControls();
}

function createActivityElement(activity) {
    const element = document.createElement('div');
    element.className = `activity-item ${activity.read ? '' : 'unread'}`;
    element.dataset.activityId = activity.id;

    const iconClass = getActivityIcon(activity.type);
    const timeAgo = getTimeAgo(activity.time);
    const typeLabel = getTypeLabel(activity.type);

    element.innerHTML = `
        <div class="activity-icon ${activity.type}">
            <i class="fas ${iconClass}"></i>
        </div>
        <div class="activity-content">
            <div class="activity-title">${activity.title}</div>
            <div class="activity-message">${activity.message}</div>
            <div class="activity-meta">
                <span class="activity-time">${timeAgo}</span>
                <span class="activity-type ${activity.type}">${typeLabel}</span>
            </div>
        </div>
    `;

    // Add click event
    element.addEventListener('click', () => {
        markAsRead(activity.id);
        // Remove modal functionality - just mark as read
    });

    return element;
}

function getActivityIcon(type) {
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

function getTypeLabel(type) {
    switch (type) {
        case 'request': return 'Request';
        case 'approved': return 'Approved';
        case 'rejected': return 'Rejected';
        case 'payment': return 'Payment';
        case 'job_completed': return 'Completed';
        case 'vendor_added': return 'Vendor Added';
        case 'status_update': return 'Status Update';
        case 'payment_received': return 'Payment Received';
        case 'visit_approved': return 'Visit Approved';
        case 'final_approved': return 'Final Approved';
        default: return 'Activity';
    }
}

function getTimeAgo(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(date)) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

function filterActivities() {
    const typeFilter = document.getElementById('typeFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    
    // Get all notifications
    const savedNotifications = localStorage.getItem('notifications');
    let notifications = [];
    
    if (savedNotifications) {
        notifications = JSON.parse(savedNotifications);
    }

    // Apply filters
    let filteredActivities = notifications.filter(activity => {
        let showActivity = true;

        // Type filter
        if (typeFilter && activity.type !== typeFilter) {
            showActivity = false;
        }

        // Status filter
        if (statusFilter === 'unread' && activity.read) {
            showActivity = false;
        } else if (statusFilter === 'read' && !activity.read) {
            showActivity = false;
        }

        return showActivity;
    });

    // Sort by time and update global activities
    allActivities = filteredActivities.sort((a, b) => new Date(b.time) - new Date(a.time));
    
    // Reset to first page
    currentPage = 1;
    
    // Display filtered activities
    displayCurrentPage();
}

function markAsRead(activityId) {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
        let notifications = JSON.parse(savedNotifications);
        const notification = notifications.find(n => n.id === activityId);
        
        if (notification) {
            notification.read = true;
            localStorage.setItem('notifications', JSON.stringify(notifications));
            
            // Update UI
            const activityElement = document.querySelector(`[data-activity-id="${activityId}"]`);
            if (activityElement) {
                activityElement.classList.remove('unread');
            }
            
            updateStats();
        }
    }
}

function markAllAsRead() {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
        let notifications = JSON.parse(savedNotifications);
        
        notifications.forEach(notification => {
            notification.read = true;
        });
        
        localStorage.setItem('notifications', JSON.stringify(notifications));
        
        // Update UI
        document.querySelectorAll('.activity-item.unread').forEach(item => {
            item.classList.remove('unread');
        });
        
        updateStats();
        
        // Show success message
        if (window.themeManager) {
            window.themeManager.showNotification('All activities marked as read', 'success');
        }
    }
}

function updateStats() {
    const savedNotifications = localStorage.getItem('notifications');
    let notifications = [];
    
    if (savedNotifications) {
        notifications = JSON.parse(savedNotifications);
    }

    const totalNotifications = notifications.length;
    const unreadCount = notifications.filter(n => !n.read).length;
    
    // Calculate today's count
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = notifications.filter(n => new Date(n.time) >= today).length;
    
    // Calculate this week's count
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekCount = notifications.filter(n => new Date(n.time) >= weekAgo).length;

    // Update stats
    document.getElementById('totalNotifications').textContent = totalNotifications;
    document.getElementById('unreadCount').textContent = unreadCount;
    document.getElementById('todayCount').textContent = todayCount;
    document.getElementById('weekCount').textContent = weekCount;
}

// Pagination functions
function setupPagination() {
    // Add pagination container to the page
    const activityContainer = document.querySelector('.activity-container');
    if (activityContainer) {
        const paginationContainer = document.createElement('div');
        paginationContainer.className = 'pagination-container';
        paginationContainer.id = 'paginationContainer';
        activityContainer.appendChild(paginationContainer);
    }
}

function updatePaginationControls() {
    const paginationContainer = document.getElementById('paginationContainer');
    if (!paginationContainer) return;

    const totalPages = Math.ceil(allActivities.length / itemsPerPage);
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }

    let paginationHTML = `
        <div class="pagination-info">
            <span>Showing ${(currentPage - 1) * itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, allActivities.length)} of ${allActivities.length} activities</span>
        </div>
        <div class="pagination-controls">
    `;

    // Previous button
    paginationHTML += `
        <button class="pagination-btn ${currentPage === 1 ? 'disabled' : ''}" 
                onclick="changePage(${currentPage - 1})" 
                ${currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i>
            Previous
        </button>
    `;

    // Page numbers
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // First page
    if (startPage > 1) {
        paginationHTML += `<button class="pagination-btn" onclick="changePage(1)">1</button>`;
        if (startPage > 2) {
            paginationHTML += `<span class="pagination-ellipsis">...</span>`;
        }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">
                ${i}
            </button>
        `;
    }

    // Last page
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationHTML += `<span class="pagination-ellipsis">...</span>`;
        }
        paginationHTML += `<button class="pagination-btn" onclick="changePage(${totalPages})">${totalPages}</button>`;
    }

    // Next button
    paginationHTML += `
        <button class="pagination-btn ${currentPage === totalPages ? 'disabled' : ''}" 
                onclick="changePage(${currentPage + 1})" 
                ${currentPage === totalPages ? 'disabled' : ''}>
            Next
            <i class="fas fa-chevron-right"></i>
        </button>
    `;

    paginationHTML += '</div>';
    paginationContainer.innerHTML = paginationHTML;
}

function changePage(page) {
    const totalPages = Math.ceil(allActivities.length / itemsPerPage);
    
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    displayCurrentPage();
    
    // Scroll to top of activity list
    const activityList = document.getElementById('activityList');
    if (activityList) {
        activityList.scrollTop = 0;
    }
}

// Remove old loadMoreActivities function
function loadMoreActivities() {
    // Function removed - replaced with pagination
}
