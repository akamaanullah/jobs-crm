<?php
// Get current page for active navigation
$current_page = basename($_SERVER['PHP_SELF']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($page_title) ? $page_title . ' - ' : ''; ?>Jobs CRM</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/dashboard.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">

</head>
<body class="dashboard-body">
    <!-- Sidebar -->
    <aside class="sidebar">
        <div class="sidebar-header">
            <div class="logo">
                <i class="fas fa-briefcase"></i>
                <h2>Jobs CRM</h2>
            </div>
        </div>
        
        <nav class="sidebar-nav">
            <ul>
                <li class="nav-item <?php echo $current_page === 'dashboard.php' ? 'active' : ''; ?>">
                    <a href="dashboard.php" class="nav-link">
                        <i class="fas fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </a>
                </li>
                <li class="nav-item <?php echo $current_page === 'add-job.php' ? 'active' : ''; ?>">
                    <a href="add-job.php" class="nav-link">
                        <i class="fas fa-plus-circle"></i>
                        <span>Add Job</span>
                    </a>
                </li>
                <li class="nav-item <?php echo $current_page === 'manage-jobs.php' ? 'active' : ''; ?>">
                    <a href="manage-jobs.php" class="nav-link">
                        <i class="fas fa-tasks"></i>
                        <span>Manage Jobs</span>
                    </a>
                </li>
                <li class="nav-item <?php echo $current_page === 'vendors.php' ? 'active' : ''; ?>">
                    <a href="vendors.php" class="nav-link">
                        <i class="fas fa-users"></i>
                        <span>Vendors</span>
                    </a>
                </li>
                <li class="nav-item <?php echo $current_page === 'reports.php' ? 'active' : ''; ?>">
                    <a href="reports.php" class="nav-link">
                        <i class="fas fa-chart-bar"></i>
                        <span>Reports</span>
                    </a>
                                <a href="requests.php" class="nav-link">
                <i class="fas fa-clipboard-list"></i>
                <span>Requests</span>
            </a>
            <a href="activity.php" class="nav-link">
                <i class="fas fa-bell"></i>
                <span>Activity</span>
            </a>
                </li>
                <li class="nav-item <?php echo $current_page === 'settings.php' ? 'active' : ''; ?>">
                    <a href="settings.php" class="nav-link">
                        <i class="fas fa-cog"></i>
                        <span>Settings</span>
                    </a>
                </li>
            </ul>
        </nav>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
        <!-- Top Header -->
        <header class="top-header">
            <div class="header-left">
                <button class="sidebar-toggle" id="sidebarToggle">
                    <i class="fas fa-bars"></i>
                </button>
                <h1><?php echo isset($page_title) ? $page_title : 'Dashboard'; ?></h1>
            </div>
            
            <div class="header-actions">
                <!-- Notifications Dropdown -->
                <div class="notifications-dropdown">
                    <button class="notification-btn" id="notificationBtn">
                        <i class="fas fa-bell"></i>
                        <span class="notification-count" id="notificationCount">0</span>
                    </button>
                    <div class="notifications-panel" id="notificationsPanel">
                        <div class="notifications-header">
                            <h4>Notifications</h4>
                            <button class="mark-all-read" id="markAllRead">
                                <i class="fas fa-check-double"></i>
                                Mark all read
                            </button>
                        </div>
                        <div class="notifications-list" id="notificationsList">
                            <!-- Notifications will be loaded here -->
                        </div>
                                            <div class="notifications-footer">
                        <a href="activity.php" class="view-all-notifications">
                            View all notifications
                        </a>
                    </div>
                    </div>
                </div>
                
                <!-- User Menu -->
                <div class="user-menu">
                    <div class="user-info">
                        <img src="../assets/images/avatar.png" alt="Admin" class="user-avatar">
                        <span class="user-name">Admin</span>
                    </div>
                    <div class="dropdown-menu">
                        <a href="profile.php"><i class="fas fa-user"></i> Profile</a>
                        <a href="settings.php"><i class="fas fa-cog"></i> Settings</a>
                        <a href="../index.php" class="logout"><i class="fas fa-sign-out-alt"></i> Logout</a>
                    </div>
                </div>
            </div>
        </header>

        <!-- Page Content Container -->
        <div class="page-content">
