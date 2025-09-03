<?php
$page_title = 'Reports';
include 'includes/header.php';

// Sample data for reports (in real app, this would come from database)
$reports = [
    'jobs' => [
        'total' => 45,
        'active' => 12,
        'completed' => 28,
        'pending' => 5
    ],
    'vendors' => [
        'total' => 28,
        'approved' => 22,
        'pending' => 4,
        'rejected' => 2
    ],
    'payments' => [
        'total_earned' => 125000,
        'this_month' => 18500,
        'pending_payments' => 8500,
        'completed_payments' => 116500
    ],
    'users' => [
        'total_users' => 15,
        'active_users' => 12,
        'top_performer' => 'John Smith',
        'top_vendors_approved' => 8
    ]
];

// Sample chart data
$monthlyJobs = [
    'Jan' => 15, 'Feb' => 18, 'Mar' => 22, 'Apr' => 19,
    'May' => 25, 'Jun' => 28, 'Jul' => 24, 'Aug' => 30,
    'Sep' => 27, 'Oct' => 32, 'Nov' => 35, 'Dec' => 38
];

$userPerformance = [
    'John Smith' => 8,
    'Sarah Johnson' => 6,
    'Mike Wilson' => 5,
    'Lisa Brown' => 4,
    'David Lee' => 3
];

$paymentStatus = [
    'Completed' => 65,
    'Pending' => 25,
    'Failed' => 10
];
?>



<!-- Reports Content -->
<div class="dashboard-content">
    <!-- Page Header -->
    <div class="page-header">
        <div class="header-content">
            <h2>System Reports</h2>
            <p>Overview of jobs, vendors, payments and user performance</p>
        </div>
        <div class="header-actions">
            <button class="btn-secondary" id="exportReport">
                <i class="fas fa-download"></i>
                Export Report
            </button>
            <button class="btn-primary" id="generateReport">
                <i class="fas fa-chart-line"></i>
                Generate Report
            </button>
        </div>
    </div>

    <!-- Overview Stats -->
    <div class="stats-grid">
        <div class="dashboard-card">
            <div class="card-header">
                <h3>Total Jobs</h3>
                <i class="fas fa-briefcase"></i>
            </div>
            <div class="card-content">
                <div class="stat-number"><?php echo $reports['jobs']['total']; ?></div>
                <div class="stat-breakdown">
                    <span class="stat-item active"><?php echo $reports['jobs']['active']; ?> Active</span>
                    <span class="stat-item completed"><?php echo $reports['jobs']['completed']; ?> Completed</span>
                    <span class="stat-item pending"><?php echo $reports['jobs']['pending']; ?> Pending</span>
                </div>
            </div>
        </div>

        <div class="dashboard-card">
            <div class="card-header">
                <h3>Vendors Status</h3>
                <i class="fas fa-users"></i>
            </div>
            <div class="card-content">
                <div class="stat-number"><?php echo $reports['vendors']['total']; ?></div>
                <div class="stat-breakdown">
                    <span class="stat-item approved"><?php echo $reports['vendors']['approved']; ?> Approved</span>
                    <span class="stat-item pending"><?php echo $reports['vendors']['pending']; ?> Pending</span>
                </div>
            </div>
        </div>

        <div class="dashboard-card">
            <div class="card-header">
                <h3>Total Earnings</h3>
                <i class="fas fa-dollar-sign"></i>
            </div>
            <div class="card-content">
                <div class="stat-number">$<?php echo number_format($reports['payments']['total_earned']); ?></div>
                <div class="stat-breakdown">
                    <span class="stat-item completed">$<?php echo number_format($reports['payments']['completed_payments']); ?> Completed</span>
                    <span class="stat-item pending">$<?php echo number_format($reports['payments']['pending_payments']); ?> Pending</span>
                </div>
            </div>
        </div>

        <div class="dashboard-card">
            <div class="card-header">
                <h3>Active Users</h3>
                <i class="fas fa-user-check"></i>
            </div>
            <div class="card-content">
                <div class="stat-number"><?php echo $reports['users']['active_users']; ?></div>
                <div class="stat-breakdown">
                    <span class="stat-item top-performer"><?php echo $reports['users']['top_performer']; ?> (Top)</span>
                    <span class="stat-item total-users"><?php echo $reports['users']['total_users']; ?> Total Users</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Charts Section -->
    <div class="dashboard-grid">
        <!-- Monthly Jobs Chart -->
        <div class="dashboard-card full-width">
            <div class="card-header">
                <h3>Monthly Jobs Overview</h3>
                <div class="card-actions">
                    <select id="chartPeriod" class="chart-select">
                        <option value="12">Last 12 Months</option>
                        <option value="6">Last 6 Months</option>
                        <option value="3">Last 3 Months</option>
                    </select>
                </div>
            </div>
            <div class="card-content">
                <div class="chart-container">
                    <canvas id="monthlyChart"></canvas>
                </div>
            </div>
        </div>

        <!-- User Performance Chart -->
        <div class="dashboard-card">
            <div class="card-header">
                <h3>User Performance</h3>
                <i class="fas fa-trophy"></i>
            </div>
            <div class="card-content">
                <div class="chart-container">
                    <canvas id="userPerformanceChart"></canvas>
                </div>
                <div class="chart-legend">
                    <?php foreach ($userPerformance as $user => $vendors): ?>
                    <div class="legend-item">
                        <span class="legend-color" style="background: var(--chart-color-<?php echo strtolower(str_replace(' ', '-', $user)); ?>)"></span>
                        <span class="legend-label"><?php echo $user; ?></span>
                        <span class="legend-value"><?php echo $vendors; ?> vendors</span>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>

        <!-- Payment Status -->
        <div class="dashboard-card">
            <div class="card-header">
                <h3>Payment Status</h3>
                <i class="fas fa-credit-card"></i>
            </div>
            <div class="card-content">
                <div class="chart-container">
                    <canvas id="paymentStatusChart"></canvas>
                </div>
                <div class="chart-legend">
                    <?php foreach ($paymentStatus as $status => $percentage): ?>
                    <div class="legend-item">
                        <span class="legend-color" style="background: var(--chart-color-<?php echo strtolower($status); ?>)"></span>
                        <span class="legend-label"><?php echo $status; ?></span>
                        <span class="legend-value"><?php echo $percentage; ?>%</span>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </div>

    <!-- Top Performers Section -->
    <div class="dashboard-card full-width">
        <div class="card-header">
            <h3>Top Performing Users</h3>
            <i class="fas fa-medal"></i>
        </div>
        <div class="card-content">
            <div class="performers-grid">
                <?php 
                $rank = 1;
                foreach ($userPerformance as $user => $vendors): 
                ?>
                <div class="performer-item">
                    <div class="performer-rank">#<?php echo $rank; ?></div>
                    <div class="performer-info">
                        <div class="performer-name"><?php echo $user; ?></div>
                        <div class="performer-stats">
                            <span class="stat-badge approved"><?php echo $vendors; ?> Vendors Approved</span>
                            <span class="stat-badge jobs"><?php echo rand(5, 15); ?> Jobs Completed</span>
                        </div>
                    </div>
                    <div class="performer-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                </div>
                <?php 
                $rank++;
                endforeach; 
                ?>
            </div>
        </div>
    </div>

    <!-- Recent Activity -->
    <div class="dashboard-card full-width">
        <div class="card-header">
            <h3>Recent Activity</h3>
            <i class="fas fa-clock"></i>
        </div>
        <div class="card-content">
            <div class="activity-list">
                <div class="activity-item">
                    <div class="activity-icon vendor-approved">
                        <i class="fas fa-user-check"></i>
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">Vendor Approved</div>
                        <div class="activity-desc">John Smith approved vendor "Tech Solutions" for Web Development job</div>
                        <div class="activity-time">2 hours ago</div>
                    </div>
                </div>
                <div class="activity-item">
                    <div class="activity-icon payment-completed">
                        <i class="fas fa-dollar-sign"></i>
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">Payment Completed</div>
                        <div class="activity-desc">Payment of $2,500 completed for Mobile App Development project</div>
                        <div class="activity-time">5 hours ago</div>
                    </div>
                </div>
                <div class="activity-item">
                    <div class="activity-icon job-completed">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">Job Completed</div>
                        <div class="activity-desc">E-commerce Website Development completed by Sarah Johnson</div>
                        <div class="activity-time">1 day ago</div>
                    </div>
                </div>
                <div class="activity-item">
                    <div class="activity-icon new-vendor">
                        <i class="fas fa-user-plus"></i>
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">New Vendor Added</div>
                        <div class="activity-desc">Mike Wilson added "Design Studio" as UI/UX vendor</div>
                        <div class="activity-time">2 days ago</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include 'includes/footer.php'; ?>
