<?php
// Get current page for active navigation
$current_page = basename($_SERVER['PHP_SELF']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($page_title) ? $page_title . ' - ' : ''; ?>Jobs CRM - User</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/user-dashboard.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body class="user-dashboard-body">
    <!-- Sidebar Overlay for Mobile -->
    <div class="user-sidebar-overlay" id="userSidebarOverlay"></div>
    
    <!-- User Sidebar -->
    <aside class="user-sidebar">
        <div class="user-sidebar-header">
            <div class="user-logo">
                <i class="fas fa-user-circle"></i>
                <h2>User Panel</h2>
            </div>
            <button class="user-sidebar-close" id="userSidebarClose">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <nav class="user-sidebar-nav">
            <ul>
                <li class="user-nav-item <?php echo $current_page === 'dashboard.php' ? 'active' : ''; ?>">
                    <a href="dashboard.php" class="user-nav-link">
                        <i class="fas fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </a>
                </li>
                <li class="user-nav-item <?php echo $current_page === 'jobs.php' ? 'active' : ''; ?>">
                    <a href="jobs.php" class="user-nav-link">
                        <i class="fas fa-briefcase"></i>
                        <span>My Jobs</span>
                    </a>
                </li>
                <li class="user-nav-item <?php echo $current_page === 'vendors.php' ? 'active' : ''; ?>">
                    <a href="vendors.php" class="user-nav-link">
                        <i class="fas fa-users"></i>
                        <span>My Vendors</span>
                    </a>
                </li>
                <li class="user-nav-item <?php echo $current_page === 'notifications.php' ? 'active' : ''; ?>">
                    <a href="notifications.php" class="user-nav-link">
                        <i class="fas fa-bell"></i>
                        <span>Notifications</span>
                    </a>
                </li>
                <li class="user-nav-item <?php echo $current_page === 'settings.php' ? 'active' : ''; ?>">
                    <a href="settings.php" class="user-nav-link">
                        <i class="fas fa-cog"></i>
                        <span>Settings</span>
                    </a>
                </li>
            </ul>
        </nav>
    </aside>

    <!-- Main Content -->
    <main class="user-main-content">
        <!-- Top Header -->
        <header class="user-top-header">
            <div class="user-header-left">
                <button class="user-sidebar-toggle" id="userSidebarToggle">
                    <i class="fas fa-bars"></i>
                </button>
                <h1><?php echo isset($page_title) ? $page_title : 'Dashboard'; ?></h1>
            </div>
            
            <div class="user-header-actions">
                <!-- User Notifications Dropdown -->
                <div class="user-notifications-dropdown">
                    <button class="user-notification-btn" id="userNotificationBtn">
                        <i class="fas fa-bell"></i>
                        <span class="user-notification-count" id="userNotificationCount">0</span>
                    </button>
                    <div class="user-notifications-panel" id="userNotificationsPanel">
                        <div class="user-notifications-header">
                            <h4>Notifications</h4>
                            <button class="user-mark-all-read" id="userMarkAllRead">
                                <i class="fas fa-check-double"></i>
                                Mark all read
                            </button>
                        </div>
                        <div class="user-notifications-list" id="userNotificationsList">
                            <!-- Notifications will be loaded here -->
                        </div>
                        <div class="user-notifications-footer">
                            <a href="notifications.php" class="user-view-all-notifications">
                                View all notifications
                            </a>
                        </div>
                    </div>
                </div>
                
                <!-- User Menu -->
                <div class="user-menu">
                    <div class="user-info">
                        <img src="../assets/images/user-avatar.jpg" alt="User Avatar" class="user-avatar">
                        <div class="user-details">
                            <span class="user-name">Ahmed Khan</span>
                            <span class="user-role">User</span>
                        </div>
                    </div>
                    <div class="user-dropdown">
                        <button class="user-dropdown-toggle" id="userDropdownToggle">
                            <i class="fas fa-chevron-down"></i>
                        </button>
                        <div class="user-dropdown-menu" id="userDropdownMenu">
                            <a href="settings.php" class="user-dropdown-item">
                                <i class="fas fa-cog"></i>
                                Settings
                            </a>
                            <a href="profile.php" class="user-dropdown-item">
                                <i class="fas fa-user"></i>
                                Profile
                            </a>
                            <div class="user-dropdown-divider"></div>
                            <a href="../logout.php" class="user-dropdown-item">
                                <i class="fas fa-sign-out-alt"></i>
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Page Content -->
        <div class="user-page-content">
