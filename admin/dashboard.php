<?php
$page_title = 'Dashboard';
include 'includes/header.php';
?>

        <!-- Dashboard Content -->
        <div class="dashboard-content">
            <!-- Stats Cards -->
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-briefcase"></i>
                    </div>
                    <div class="stat-info">
                        <h3>Total Jobs</h3>
                        <p class="stat-number">24</p>
                        <span class="stat-change positive">+12% from last month</span>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="stat-info">
                        <h3>Active Vendors</h3>
                        <p class="stat-number">18</p>
                        <span class="stat-change positive">+5% from last month</span>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="stat-info">
                        <h3>Pending Jobs</h3>
                        <p class="stat-number">7</p>
                        <span class="stat-change negative">-3% from last month</span>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="stat-info">
                        <h3>Completed Jobs</h3>
                        <p class="stat-number">15</p>
                        <span class="stat-change positive">+8% from last month</span>
                    </div>
                </div>
            </div>

            <!-- Recent Jobs & Quick Actions -->
            <div class="dashboard-grid">
                <!-- Recent Jobs -->
                <div class="dashboard-card">
                    <div class="card-header">
                        <h3>Recent Jobs</h3>
                        <a href="manage-jobs.php" class="view-all">View All</a>
                    </div>
                    <div class="card-content">
                        <div class="job-list">
                            <div class="job-item">
                                <div class="job-info">
                                    <h4>Website Development</h4>
                                    <p>Client: Tech Solutions Inc.</p>
                                    <span class="job-status pending">Pending</span>
                                </div>
                                <div class="job-actions">
                                    <button class="btn-icon" title="View Details">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn-icon" title="Edit">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                </div>
                            </div>

                            <div class="job-item">
                                <div class="job-info">
                                    <h4>Mobile App Design</h4>
                                    <p>Client: StartupXYZ</p>
                                    <span class="job-status in-progress">In Progress</span>
                                </div>
                                <div class="job-actions">
                                    <button class="btn-icon" title="View Details">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn-icon" title="Edit">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                </div>
                            </div>

                            <div class="job-item">
                                <div class="job-info">
                                    <h4>Logo Design</h4>
                                    <p>Client: Creative Agency</p>
                                    <span class="job-status completed">Completed</span>
                                </div>
                                <div class="job-actions">
                                    <button class="btn-icon" title="View Details">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn-icon" title="Edit">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="dashboard-card">
                    <div class="card-header">
                        <h3>Quick Actions</h3>
                    </div>
                    <div class="card-content">
                        <div class="quick-actions">
                            <a href="add-job.php" class="action-btn">
                                <i class="fas fa-plus-circle"></i>
                                <span>Add New Job</span>
                            </a>
                            <a href="vendors.php" class="action-btn">
                                <i class="fas fa-user-plus"></i>
                                <span>Add Vendor</span>
                            </a>
                            <a href="reports.php" class="action-btn">
                                <i class="fas fa-chart-line"></i>
                                <span>Generate Report</span>
                            </a>
                            <a href="settings.php" class="action-btn">
                                <i class="fas fa-cog"></i>
                                <span>System Settings</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Activity Feed -->
            <div class="dashboard-card">
                <div class="card-header">
                    <h3>Recent Activity</h3>
                </div>
                <div class="card-content">
                    <div class="activity-feed">
                        <div class="activity-item">
                            <div class="activity-icon">
                                <i class="fas fa-plus"></i>
                            </div>
                            <div class="activity-content">
                                <p><strong>New job added:</strong> Website Development for Tech Solutions Inc.</p>
                                <span class="activity-time">2 hours ago</span>
                            </div>
                        </div>

                        <div class="activity-item">
                            <div class="activity-icon">
                                <i class="fas fa-user-plus"></i>
                            </div>
                            <div class="activity-content">
                                <p><strong>New vendor registered:</strong> John Doe (Web Developer)</p>
                                <span class="activity-time">4 hours ago</span>
                            </div>
                        </div>

                        <div class="activity-item">
                            <div class="activity-icon">
                                <i class="fas fa-check"></i>
                            </div>
                            <div class="activity-content">
                                <p><strong>Job completed:</strong> Logo Design for Creative Agency</p>
                                <span class="activity-time">1 day ago</span>
                            </div>
                        </div>

                        <div class="activity-item">
                            <div class="activity-icon">
                                <i class="fas fa-comment"></i>
                            </div>
                            <div class="activity-content">
                                <p><strong>New message:</strong> Client feedback received for Mobile App Design</p>
                                <span class="activity-time">2 days ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

<?php include 'includes/footer.php'; ?>