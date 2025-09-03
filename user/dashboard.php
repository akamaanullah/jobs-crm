<?php
$page_title = 'Dashboard';
include 'includes/header.php';
?>

<!-- Dashboard Content -->
<div class="user-dashboard-content">
    <!-- Welcome Section -->
    <div class="welcome-section">
        <div class="welcome-content">
            <h2>Welcome back, <span class="user-name">Ahmed Khan</span>!</h2>
            <p>Here's what's happening with your jobs today</p>
        </div>
        <div class="welcome-actions">
            <button class="btn-primary" onclick="logout()">
                <i class="fas fa-sign-out-alt"></i>
                Logout
            </button>
        </div>
    </div>

    <!-- User Stats -->
    <div class="user-stats-grid">
        <div class="user-stat-card">
            <div class="user-stat-icon">
                <i class="fas fa-briefcase"></i>
            </div>
            <div class="user-stat-info">
                <h3>My Jobs</h3>
                <p class="user-stat-number">8</p>
                <span class="user-stat-change positive">+2 this week</span>
            </div>
        </div>

        <div class="user-stat-card">
            <div class="user-stat-icon">
                <i class="fas fa-users"></i>
            </div>
            <div class="user-stat-info">
                <h3>My Vendors</h3>
                <p class="user-stat-number">12</p>
                <span class="user-stat-change positive">+3 this month</span>
            </div>
        </div>

        <div class="user-stat-card">
            <div class="user-stat-icon">
                <i class="fas fa-clock"></i>
            </div>
            <div class="user-stat-info">
                <h3>Pending Requests</h3>
                <p class="user-stat-number">3</p>
                <span class="user-stat-change neutral">Awaiting approval</span>
            </div>
        </div>

        <div class="user-stat-card">
            <div class="user-stat-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <div class="user-stat-info">
                <h3>Completed Jobs</h3>
                <p class="user-stat-number">5</p>
                <span class="user-stat-change positive">+1 this month</span>
            </div>
        </div>
    </div>

    <!-- Recent Activity & Quick Actions -->
    <div class="user-dashboard-grid">
        <!-- Recent Jobs -->
        <div class="user-dashboard-card">
            <div class="user-card-header">
                <h3>My Recent Jobs</h3>
                <a href="jobs.php" class="user-view-all">View All</a>
            </div>
            <div class="user-card-content">
                <div class="user-job-list">
                    <div class="user-job-item">
                        <div class="user-job-info">
                            <h4>E-commerce Website</h4>
                            <p>Status: <span class="user-job-status in-progress">In Progress</span></p>
                            <p class="user-job-vendors">Vendors: 3 assigned</p>
                        </div>
                        <div class="user-job-actions">
                            <button class="user-btn-icon" title="View Details" onclick="window.location.href='view-job.php?id=1'">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    </div>

                    <div class="user-job-item">
                        <div class="user-job-info">
                            <h4>Mobile App Development</h4>
                            <p>Status: <span class="user-job-status pending">Pending Approval</span></p>
                            <p class="user-job-vendors">Vendors: 2 assigned</p>
                        </div>
                        <div class="user-job-actions">
                            <button class="user-btn-icon" title="View Details" onclick="window.location.href='view-job.php?id=2'">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    </div>

                    <div class="user-job-item">
                        <div class="user-job-info">
                            <h4>Logo Design</h4>
                            <p>Status: <span class="user-job-status completed">Completed</span></p>
                            <p class="user-job-vendors">Vendors: 1 assigned</p>
                        </div>
                        <div class="user-job-actions">
                            <button class="user-btn-icon" title="View Details" onclick="window.location.href='view-job.php?id=3'">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent Notifications -->
        <div class="user-dashboard-card">
            <div class="user-card-header">
                <h3>Recent Notifications</h3>
                <a href="notifications.php" class="user-view-all">View All</a>
            </div>
            <div class="user-card-content">
                <div class="user-notification-list">
                    <div class="user-notification-item">
                        <div class="user-notification-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="user-notification-content">
                            <h4>Vendor Approved</h4>
                            <p>John Smith has been approved for your E-commerce project</p>
                            <span class="user-notification-time">2 hours ago</span>
                        </div>
                    </div>

                    <div class="user-notification-item">
                        <div class="user-notification-icon">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="user-notification-content">
                            <h4>Request Pending</h4>
                            <p>Your vendor approval request is under review</p>
                            <span class="user-notification-time">1 day ago</span>
                        </div>
                    </div>

                    <div class="user-notification-item">
                        <div class="user-notification-icon">
                            <i class="fas fa-user-plus"></i>
                        </div>
                        <div class="user-notification-content">
                            <h4>New Vendor Added</h4>
                            <p>Sarah Johnson has been added to your Mobile App project</p>
                            <span class="user-notification-time">2 days ago</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Quick Actions -->
    <div class="user-quick-actions">
        <div class="user-quick-actions-header">
            <h3>Quick Actions</h3>
        </div>
        <div class="user-quick-actions-grid">
            <div class="user-quick-action-card" onclick="window.location.href='jobs.php'">
                <div class="user-quick-action-icon">
                    <i class="fas fa-briefcase"></i>
                </div>
                <h4>View My Jobs</h4>
                <p>Check all your assigned jobs and their status</p>
            </div>

            <div class="user-quick-action-card" onclick="window.location.href='vendors.php'">
                <div class="user-quick-action-icon">
                    <i class="fas fa-users"></i>
                </div>
                <h4>My Vendors</h4>
                <p>View all vendors assigned to your jobs</p>
            </div>

            <div class="user-quick-action-card" onclick="window.location.href='notifications.php'">
                <div class="user-quick-action-icon">
                    <i class="fas fa-bell"></i>
                </div>
                <h4>Notifications</h4>
                <p>Check all your recent notifications</p>
            </div>

            <div class="user-quick-action-card" onclick="window.location.href='settings.php'">
                <div class="user-quick-action-icon">
                    <i class="fas fa-cog"></i>
                </div>
                <h4>Settings</h4>
                <p>Manage your account settings</p>
            </div>
        </div>
    </div>
</div>

<?php include 'includes/footer.php'; ?>
