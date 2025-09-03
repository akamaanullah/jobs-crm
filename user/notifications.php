<?php
$page_title = 'Notifications';
include 'includes/header.php';

// Sample notifications data (in real app, this would come from database)
$notifications = [
    [
        'id' => 1,
        'type' => 'request_approved',
        'title' => 'Visit Request Approved',
        'message' => 'Your visit request for AC Repair & Maintenance (JOB-001) has been approved by admin.',
        'jobId' => 'JOB-001',
        'jobTitle' => 'AC Repair & Maintenance',
        'timestamp' => '2024-12-15T10:30:00',
        'isRead' => false,
        'priority' => 'high',
        'adminName' => 'Admin Manager',
        'actionRequired' => false
    ],
    [
        'id' => 2,
        'type' => 'status_updated',
        'title' => 'Job Status Updated',
        'message' => 'Job status for Plumbing Services (JOB-002) has been updated to "Work In Progress".',
        'jobId' => 'JOB-002',
        'jobTitle' => 'Plumbing Services',
        'timestamp' => '2024-12-15T09:15:00',
        'isRead' => true,
        'priority' => 'medium',
        'adminName' => 'System Admin',
        'actionRequired' => false
    ],
    [
        'id' => 3,
        'type' => 'final_approval',
        'title' => 'Final Approval Granted',
        'message' => 'Final approval has been granted for Electrical Wiring Installation (JOB-003). You can now proceed with payment.',
        'jobId' => 'JOB-003',
        'jobTitle' => 'Electrical Wiring Installation',
        'timestamp' => '2024-12-14T16:45:00',
        'isRead' => false,
        'priority' => 'high',
        'adminName' => 'Admin Manager',
        'actionRequired' => true
    ],
    [
        'id' => 4,
        'type' => 'vendor_assigned',
        'title' => 'New Vendor Assigned',
        'message' => 'A new vendor "Hassan Raza" has been assigned to your job JOB-004 (Carpentry Work).',
        'jobId' => 'JOB-004',
        'jobTitle' => 'Carpentry Work',
        'timestamp' => '2024-12-14T14:20:00',
        'isRead' => true,
        'priority' => 'medium',
        'adminName' => 'Vendor Manager',
        'actionRequired' => false
    ],
    [
        'id' => 5,
        'type' => 'payment_approved',
        'title' => 'Payment Approved',
        'message' => 'Payment for Painting Services (JOB-005) has been approved. Job marked as completed.',
        'jobId' => 'JOB-005',
        'jobTitle' => 'Painting Services',
        'timestamp' => '2024-12-14T11:30:00',
        'isRead' => true,
        'priority' => 'low',
        'adminName' => 'Finance Admin',
        'actionRequired' => false
    ],
    [
        'id' => 6,
        'type' => 'deadline_reminder',
        'title' => 'Deadline Reminder',
        'message' => 'Reminder: Job JOB-006 (Roof Repair) deadline is approaching. Please ensure timely completion.',
        'jobId' => 'JOB-006',
        'jobTitle' => 'Roof Repair',
        'timestamp' => '2024-12-14T08:00:00',
        'isRead' => false,
        'priority' => 'medium',
        'adminName' => 'System Admin',
        'actionRequired' => true
    ],
    [
        'id' => 7,
        'type' => 'quality_check',
        'title' => 'Quality Check Scheduled',
        'message' => 'Quality check has been scheduled for Kitchen Renovation (JOB-007) on December 20th, 2024.',
        'jobId' => 'JOB-007',
        'jobTitle' => 'Kitchen Renovation',
        'timestamp' => '2024-12-13T17:15:00',
        'isRead' => true,
        'priority' => 'medium',
        'adminName' => 'Quality Manager',
        'actionRequired' => false
    ],
    [
        'id' => 8,
        'type' => 'system_update',
        'title' => 'System Maintenance Notice',
        'message' => 'System will be under maintenance on December 18th, 2024 from 2:00 AM to 4:00 AM.',
        'jobId' => null,
        'jobTitle' => null,
        'timestamp' => '2024-12-13T10:00:00',
        'isRead' => false,
        'priority' => 'low',
        'adminName' => 'System Admin',
        'actionRequired' => false
    ]
];

// Filter notifications
$filterType = isset($_GET['type']) ? $_GET['type'] : 'all';
$filterPriority = isset($_GET['priority']) ? $_GET['priority'] : 'all';
$filterRead = isset($_GET['read']) ? $_GET['read'] : 'all';

$filteredNotifications = $notifications;

// Filter by type
if ($filterType !== 'all') {
    $filteredNotifications = array_filter($filteredNotifications, function($notification) use ($filterType) {
        return $notification['type'] === $filterType;
    });
}

// Filter by priority
if ($filterPriority !== 'all') {
    $filteredNotifications = array_filter($filteredNotifications, function($notification) use ($filterPriority) {
        return $notification['priority'] === $filterPriority;
    });
}

// Filter by read status
if ($filterRead !== 'all') {
    $filteredNotifications = array_filter($filteredNotifications, function($notification) use ($filterRead) {
        $isRead = $filterRead === 'read';
        return $notification['isRead'] === $isRead;
    });
}

// Get counts for filters
$totalCount = count($notifications);
$unreadCount = count(array_filter($notifications, function($n) { return !$n['isRead']; }));
$highPriorityCount = count(array_filter($notifications, function($n) { return $n['priority'] === 'high'; }));
?>

<!-- Notifications Content -->
<div class="user-notifications-content">
    <!-- Page Header -->
    <div class="user-page-header">
        <div class="user-page-header-left">
            <h1>Notifications</h1>
            <p>Stay updated with all important updates and approvals</p>
        </div>
        <div class="user-page-header-actions">
            <button class="user-btn-secondary" id="markAllRead">
                <i class="fas fa-check-double"></i>
                Mark All as Read
            </button>
            <button class="user-btn-primary" id="refreshNotifications">
                <i class="fas fa-sync-alt"></i>
                Refresh
            </button>
        </div>
    </div>

    <!-- Notification Stats -->
    <div class="user-notification-stats">
        <div class="user-stat-card">
            <div class="user-stat-icon total">
                <i class="fas fa-bell"></i>
            </div>
            <div class="user-stat-content">
                <span class="user-stat-number"><?php echo $totalCount; ?></span>
                <span class="user-stat-label">Total Notifications</span>
            </div>
        </div>
        <div class="user-stat-card">
            <div class="user-stat-icon unread">
                <i class="fas fa-envelope"></i>
            </div>
            <div class="user-stat-content">
                <span class="user-stat-number"><?php echo $unreadCount; ?></span>
                <span class="user-stat-label">Unread</span>
            </div>
        </div>
        <div class="user-stat-card">
            <div class="user-stat-icon high-priority">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <div class="user-stat-content">
                <span class="user-stat-number"><?php echo $highPriorityCount; ?></span>
                <span class="user-stat-label">High Priority</span>
            </div>
        </div>
    </div>

    <!-- Filters -->
    <div class="user-notification-filters">
        <div class="user-filter-group">
            <label>Type:</label>
            <select id="typeFilter" onchange="filterNotifications()">
                <option value="all">All Types</option>
                <option value="request_approved" <?php echo $filterType === 'request_approved' ? 'selected' : ''; ?>>Request Approved</option>
                <option value="status_updated" <?php echo $filterType === 'status_updated' ? 'selected' : ''; ?>>Status Updated</option>
                <option value="final_approval" <?php echo $filterType === 'final_approval' ? 'selected' : ''; ?>>Final Approval</option>
                <option value="vendor_assigned" <?php echo $filterType === 'vendor_assigned' ? 'selected' : ''; ?>>Vendor Assigned</option>
                <option value="payment_approved" <?php echo $filterType === 'payment_approved' ? 'selected' : ''; ?>>Payment Approved</option>
                <option value="deadline_reminder" <?php echo $filterType === 'deadline_reminder' ? 'selected' : ''; ?>>Deadline Reminder</option>
                <option value="quality_check" <?php echo $filterType === 'quality_check' ? 'selected' : ''; ?>>Quality Check</option>
                <option value="system_update" <?php echo $filterType === 'system_update' ? 'selected' : ''; ?>>System Update</option>
            </select>
        </div>
        
        <div class="user-filter-group">
            <label>Priority:</label>
            <select id="priorityFilter" onchange="filterNotifications()">
                <option value="all">All Priorities</option>
                <option value="high" <?php echo $filterPriority === 'high' ? 'selected' : ''; ?>>High</option>
                <option value="medium" <?php echo $filterPriority === 'medium' ? 'selected' : ''; ?>>Medium</option>
                <option value="low" <?php echo $filterPriority === 'low' ? 'selected' : ''; ?>>Low</option>
            </select>
        </div>
        
        <div class="user-filter-group">
            <label>Status:</label>
            <select id="readFilter" onchange="filterNotifications()">
                <option value="all">All</option>
                <option value="unread" <?php echo $filterRead === 'unread' ? 'selected' : ''; ?>>Unread</option>
                <option value="read" <?php echo $filterRead === 'read' ? 'selected' : ''; ?>>Read</option>
            </select>
        </div>
    </div>

    <!-- Notifications List -->
    <div class="user-notifications-list">
        <?php if (empty($filteredNotifications)): ?>
            <div class="user-no-notifications">
                <i class="fas fa-bell-slash"></i>
                <h3>No notifications found</h3>
                <p>Try adjusting your filters to see more notifications.</p>
            </div>
        <?php else: ?>
            <?php foreach ($filteredNotifications as $notification): ?>
                <div class="user-notification-item <?php echo $notification['isRead'] ? 'read' : 'unread'; ?> priority-<?php echo $notification['priority']; ?>" 
                     data-notification-id="<?php echo $notification['id']; ?>">
                    
                    <!-- Notification Icon -->
                    <div class="user-notification-icon">
                        <?php
                        $iconClass = 'fas fa-bell';
                        switch($notification['type']) {
                            case 'request_approved':
                                $iconClass = 'fas fa-check-circle';
                                break;
                            case 'status_updated':
                                $iconClass = 'fas fa-sync-alt';
                                break;
                            case 'final_approval':
                                $iconClass = 'fas fa-star';
                                break;
                            case 'vendor_assigned':
                                $iconClass = 'fas fa-user-plus';
                                break;
                            case 'payment_approved':
                                $iconClass = 'fas fa-dollar-sign';
                                break;
                            case 'deadline_reminder':
                                $iconClass = 'fas fa-clock';
                                break;
                            case 'quality_check':
                                $iconClass = 'fas fa-search';
                                break;
                            case 'system_update':
                                $iconClass = 'fas fa-cog';
                                break;
                        }
                        ?>
                        <i class="<?php echo $iconClass; ?>"></i>
                    </div>

                    <!-- Notification Content -->
                    <div class="user-notification-content">
                        <div class="user-notification-header">
                            <h4 class="user-notification-title"><?php echo $notification['title']; ?></h4>
                            <div class="user-notification-meta">
                                <span class="user-notification-time"><?php echo date('M d, Y g:i A', strtotime($notification['timestamp'])); ?></span>
                                <span class="user-notification-admin">by <?php echo $notification['adminName']; ?></span>
                            </div>
                        </div>
                        
                        <p class="user-notification-message"><?php echo $notification['message']; ?></p>
                        
                        <?php if ($notification['jobId']): ?>
                            <div class="user-notification-job">
                                <span class="user-job-badge">
                                    <i class="fas fa-briefcase"></i>
                                    <?php echo $notification['jobId']; ?> - <?php echo $notification['jobTitle']; ?>
                                </span>
                            </div>
                        <?php endif; ?>
                        
                        <?php if ($notification['actionRequired']): ?>
                            <div class="user-action-required">
                                <i class="fas fa-exclamation-circle"></i>
                                <span>Action Required</span>
                            </div>
                        <?php endif; ?>
                    </div>

                    <!-- Notification Actions -->
                    <div class="user-notification-actions">
                        <?php if (!$notification['isRead']): ?>
                            <button class="user-btn-icon" title="Mark as Read" onclick="markAsRead(<?php echo $notification['id']; ?>)">
                                <i class="fas fa-check"></i>
                            </button>
                        <?php endif; ?>
                        
                        <?php if ($notification['jobId']): ?>
                            <button class="user-btn-icon" title="View Job" onclick="viewJob('<?php echo $notification['jobId']; ?>')">
                                <i class="fas fa-eye"></i>
                            </button>
                        <?php endif; ?>
                        
                        <button class="user-btn-icon" title="Delete" onclick="deleteNotification(<?php echo $notification['id']; ?>)">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            <?php endforeach; ?>
        <?php endif; ?>
    </div>
</div>

<script>
// Filter notifications
function filterNotifications() {
    const typeFilter = document.getElementById('typeFilter').value;
    const priorityFilter = document.getElementById('priorityFilter').value;
    const readFilter = document.getElementById('readFilter').value;
    
    const url = new URL(window.location);
    url.searchParams.set('type', typeFilter);
    url.searchParams.set('priority', priorityFilter);
    url.searchParams.set('read', readFilter);
    
    window.location.href = url.toString();
}

// Mark notification as read
function markAsRead(notificationId) {
    // In real app, this would send a request to server
    console.log('Marking notification as read:', notificationId);
    
    const notificationItem = document.querySelector(`[data-notification-id="${notificationId}"]`);
    if (notificationItem) {
        notificationItem.classList.remove('unread');
        notificationItem.classList.add('read');
        
        // Update unread count
        const unreadCount = document.querySelector('.user-stat-card:nth-child(2) .user-stat-number');
        if (unreadCount) {
            const currentCount = parseInt(unreadCount.textContent);
            unreadCount.textContent = Math.max(0, currentCount - 1);
        }
    }
}

// View job
function viewJob(jobId) {
    // In real app, this would redirect to job page
    console.log('Viewing job:', jobId);
    window.location.href = `view-job.php?id=${jobId}`;
}

// Delete notification
function deleteNotification(notificationId) {
    if (confirm('Are you sure you want to delete this notification?')) {
        // In real app, this would send a request to server
        console.log('Deleting notification:', notificationId);
        
        const notificationItem = document.querySelector(`[data-notification-id="${notificationId}"]`);
        if (notificationItem) {
            notificationItem.remove();
            
            // Update total count
            const totalCount = document.querySelector('.user-stat-card:nth-child(1) .user-stat-number');
            if (totalCount) {
                const currentCount = parseInt(totalCount.textContent);
                totalCount.textContent = Math.max(0, currentCount - 1);
            }
        }
    }
}

// Mark all as read
document.getElementById('markAllRead').addEventListener('click', function() {
    const unreadNotifications = document.querySelectorAll('.user-notification-item.unread');
    
    unreadNotifications.forEach(notification => {
        const notificationId = notification.getAttribute('data-notification-id');
        markAsRead(notificationId);
    });
    
    // Update unread count to 0
    const unreadCount = document.querySelector('.user-stat-card:nth-child(2) .user-stat-number');
    if (unreadCount) {
        unreadCount.textContent = '0';
    }
});

// Refresh notifications
document.getElementById('refreshNotifications').addEventListener('click', function() {
    location.reload();
});
</script>

<?php include 'includes/footer.php'; ?>
