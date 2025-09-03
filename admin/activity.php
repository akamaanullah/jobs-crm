<?php
$page_title = 'Activity & Notifications';
include 'includes/header.php';

// Get all notifications from localStorage (will be handled by JavaScript)
?>

<!-- Activity Content -->
<div class="dashboard-content">
    <!-- Page Header -->
    <div class="page-header">
        <div class="header-content">
            <h2>Activity & Notifications</h2>
            <p>View all system activities and notifications</p>
        </div>
        <div class="header-actions">
            <div class="filter-group">
                <select id="typeFilter" class="form-control">
                    <option value="">All Types</option>
                    <option value="request">Requests</option>
                    <option value="vendor_added">Vendor Added</option>
                    <option value="status_update">Status Updates</option>
                    <option value="visit_approved">Visit Approved</option>
                    <option value="final_approved">Final Approved</option>
                    <option value="job_completed">Job Completed</option>
                    <option value="payment_received">Payment Received</option>
                    <option value="payment">Payment Requests</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
                <select id="statusFilter" class="form-control">
                    <option value="">All Status</option>
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                </select>
                <button class="btn-primary" id="markAllRead">
                    <i class="fas fa-check-double"></i>
                    Mark All as Read
                </button>
            </div>
        </div>
    </div>

    <!-- Activity Stats -->
    <div class="activity-stats">
        <div class="stat-card">
            <div class="stat-icon">
                <i class="fas fa-bell"></i>
            </div>
            <div class="stat-content">
                <h3 id="totalNotifications">0</h3>
                <p>Total Notifications</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon unread">
                <i class="fas fa-exclamation-circle"></i>
            </div>
            <div class="stat-content">
                <h3 id="unreadCount">0</h3>
                <p>Unread</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon today">
                <i class="fas fa-calendar-day"></i>
            </div>
            <div class="stat-content">
                <h3 id="todayCount">0</h3>
                <p>Today</p>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon week">
                <i class="fas fa-calendar-week"></i>
            </div>
            <div class="stat-content">
                <h3 id="weekCount">0</h3>
                <p>This Week</p>
            </div>
        </div>
    </div>

    <!-- Activity List -->
    <div class="activity-container">
        <div class="activity-list" id="activityList">
            <!-- Activities will be loaded here by JavaScript -->
        </div>
    </div>
</div>

<?php include 'includes/footer.php'; ?>
