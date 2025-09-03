<?php
$page_title = 'My Jobs';
include 'includes/header.php';
?>

<!-- Jobs Content -->
<div class="user-jobs-content">
    <!-- Page Header -->
    <div class="user-page-header">
        <div class="user-page-header-left">
            <h1>My Jobs</h1>
            <p>Manage and track all your assigned jobs</p>
        </div>
        <div class="user-page-header-actions">
            <div class="user-search-box">
                <input type="text" id="userJobSearch" placeholder="Search jobs...">
                <i class="fas fa-search"></i>
            </div>
            <div class="user-filter-dropdown">
                <select id="userStatusFilter">
                    <option value="">All Status</option>
                    <option value="visit-request-pending">Visit Request Pending</option>
                    <option value="visit-approved">Visit Approved</option>
                    <option value="final-visit-pending">Final Visit Pending</option>
                    <option value="final-visit-approved">Final Visit Approved</option>
                    <option value="work-completed">Work Completed</option>
                    <option value="payment-pending">Payment Pending</option>
                    <option value="payment-approved">Payment Approved</option>
                </select>
            </div>
        </div>
    </div>

    <!-- Jobs Stats -->
    <div class="user-jobs-stats">
        <div class="user-job-stat-item">
            <div class="user-job-stat-icon total">
                <i class="fas fa-briefcase"></i>
            </div>
            <div class="user-job-stat-info">
                <h3>Total Jobs</h3>
                <p class="user-job-stat-number">7</p>
            </div>
        </div>
        <div class="user-job-stat-item">
            <div class="user-job-stat-icon pending">
                <i class="fas fa-clock"></i>
            </div>
            <div class="user-job-stat-info">
                <h3>Pending Requests</h3>
                <p class="user-job-stat-number">5</p>
            </div>
        </div>
        <div class="user-job-stat-item">
            <div class="user-job-stat-icon approved">
                <i class="fas fa-check-circle"></i>
            </div>
            <div class="user-job-stat-info">
                <h3>Approved</h3>
                <p class="user-job-stat-number">8</p>
            </div>
        </div>
        <div class="user-job-stat-item">
            <div class="user-job-stat-icon completed">
                <i class="fas fa-tasks"></i>
            </div>
            <div class="user-job-stat-info">
                <h3>Completed Work</h3>
                <p class="user-job-stat-number">3</p>
            </div>
        </div>
        <div class="user-job-stat-item">
            <div class="user-job-stat-icon vendors">
                <i class="fas fa-users"></i>
            </div>
            <div class="user-job-stat-info">
                <h3>Total Vendors</h3>
                <p class="user-job-stat-number">15</p>
            </div>
        </div>
    </div>

    <!-- Jobs List -->
    <div class="user-jobs-container">
        <div class="user-jobs-list" id="userJobsList">
            <!-- Job Item 1 -->
            <div class="user-job-card" data-status="visit-approved" data-job-id="1">
                <div class="user-job-card-header">
                    <div class="user-job-title">
                        <h3>AC Repair & Maintenance</h3>
                        <p class="user-job-shop">CoolTech AC Services</p>
                        <span class="user-job-status visit-approved">Visit Approved</span>
                    </div>
                    <div class="user-job-actions">
                        <button class="user-job-action-btn" title="View Details"
                            onclick="window.location.href='view-job.php?id=1'">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="user-job-card-content">
                    <div class="user-job-details">
                        <div class="user-job-detail-item">
                            <i class="fas fa-calendar"></i>
                            <span>Started: Jan 15, 2024</span>
                        </div>
                        <div class="user-job-detail-item">
                            <i class="fas fa-users"></i>
                            <span>Vendors: 3 assigned</span>
                        </div>
                        <div class="user-job-detail-item">
                            <i class="fas fa-check-double"></i>
                            <span>Visit: Approved on Jan 18</span>
                        </div>
                    </div>
                    <div class="user-job-progress">
                        <div class="user-progress-bar">
                            <div class="user-progress-fill" style="width: 30%"></div>
                        </div>
                        <span class="user-progress-text">Visit Phase Complete</span>
                    </div>
                </div>
            </div>

            <!-- Job Item 2 -->
            <div class="user-job-card" data-status="visit-request-pending" data-job-id="2">
                <div class="user-job-card-header">
                    <div class="user-job-title">
                        <h3>Plumbing Services</h3>
                        <p class="user-job-shop">ProPlumb Solutions</p>
                        <span class="user-job-status visit-request-pending">Visit Request Pending</span>
                    </div>
                    <div class="user-job-actions">
                        <button class="user-job-action-btn" title="View Details"
                            onclick="window.location.href='view-job.php?id=2'">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="user-job-card-content">
                    <div class="user-job-details">
                        <div class="user-job-detail-item">
                            <i class="fas fa-calendar"></i>
                            <span>Created: Jan 20, 2024</span>
                        </div>
                        <div class="user-job-detail-item">
                            <i class="fas fa-users"></i>
                            <span>Vendors: 2 assigned</span>
                        </div>
                        <div class="user-job-detail-item">
                            <i class="fas fa-clock"></i>
                            <span>Awaiting visit approval</span>
                        </div>
                    </div>
                    <div class="user-job-progress">
                        <div class="user-progress-bar">
                            <div class="user-progress-fill" style="width: 10%"></div>
                        </div>
                        <span class="user-progress-text">Visit Request Submitted</span>
                    </div>
                </div>
            </div>

            <!-- Job Item 3 -->
            <div class="user-job-card" data-status="final-visit-approved" data-job-id="3">
                <div class="user-job-card-header">
                    <div class="user-job-title">
                        <h3>Electrical Wiring Installation</h3>
                        <p class="user-job-shop">PowerTech Electric</p>
                        <span class="user-job-status final-visit-approved">Final Visit Approved</span>
                    </div>
                    <div class="user-job-actions">
                        <button class="user-job-action-btn" title="View Details"
                            onclick="window.location.href='view-job.php?id=3'">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="user-job-card-content">
                    <div class="user-job-details">
                        <div class="user-job-detail-item">
                            <i class="fas fa-calendar"></i>
                            <span>Final Visit: Jan 10, 2024</span>
                        </div>
                        <div class="user-job-detail-item">
                            <i class="fas fa-users"></i>
                            <span>Vendors: 1 assigned</span>
                        </div>
                        <div class="user-job-detail-item">
                            <i class="fas fa-star"></i>
                            <span>Final Visit: Approved</span>
                        </div>
                    </div>
                    <div class="user-job-progress">
                        <div class="user-progress-bar">
                            <div class="user-progress-fill" style="width: 80%"></div>
                        </div>
                        <span class="user-progress-text">Final Visit Complete</span>
                    </div>
                </div>
            </div>

            <!-- Job Item 4 -->
            <div class="user-job-card" data-status="work-completed" data-job-id="4">
                <div class="user-job-card-header">
                    <div class="user-job-title">
                        <h3>Carpentry Work</h3>
                        <p class="user-job-shop">WoodCraft Masters</p>
                        <span class="user-job-status work-completed">Work Completed</span>
                    </div>
                    <div class="user-job-actions">
                        <button class="user-job-action-btn" title="View Details"
                            onclick="window.location.href='view-job.php?id=4'">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="user-job-card-content">
                    <div class="user-job-details">
                        <div class="user-job-detail-item">
                            <i class="fas fa-calendar"></i>
                            <span>Completed: Jan 18, 2024</span>
                        </div>
                        <div class="user-job-detail-item">
                            <i class="fas fa-users"></i>
                            <span>Vendors: 2 assigned</span>
                        </div>
                        <div class="user-job-detail-item">
                            <i class="fas fa-check-circle"></i>
                            <span>Work: Completed</span>
                        </div>
                    </div>
                    <div class="user-job-progress">
                        <div class="user-progress-bar">
                            <div class="user-progress-fill" style="width: 100%"></div>
                        </div>
                        <span class="user-progress-text">Work Completed</span>
                    </div>
                </div>
            </div>

            <!-- Job Item 5 -->
            <div class="user-job-card" data-status="payment-pending" data-job-id="5">
                <div class="user-job-card-header">
                    <div class="user-job-title">
                        <h3>Painting Services</h3>
                        <p class="user-job-shop">ColorPro Painters</p>
                        <span class="user-job-status payment-pending">Payment Request Pending</span>
                    </div>
                    <div class="user-job-actions">
                        <button class="user-job-action-btn" title="View Details"
                            onclick="window.location.href='view-job.php?id=5'">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="user-job-card-content">
                    <div class="user-job-details">
                        <div class="user-job-detail-item">
                            <i class="fas fa-calendar"></i>
                            <span>Payment Request: Jan 22, 2024</span>
                        </div>
                        <div class="user-job-detail-item">
                            <i class="fas fa-users"></i>
                            <span>Vendors: 1 assigned</span>
                        </div>
                        <div class="user-job-detail-item">
                            <i class="fas fa-clock"></i>
                            <span>Payment: Awaiting approval</span>
                        </div>
                    </div>
                    <div class="user-job-progress">
                        <div class="user-progress-bar">
                            <div class="user-progress-fill" style="width: 90%"></div>
                        </div>
                        <span class="user-progress-text">Payment Request Submitted</span>
                    </div>
                </div>
            </div>

            <!-- Job Item 6 -->
            <div class="user-job-card" data-status="payment-approved" data-job-id="6">
                <div class="user-job-card-header">
                    <div class="user-job-title">
                        <h3>Roof Repair</h3>
                        <p class="user-job-shop">RoofGuard Solutions</p>
                        <span class="user-job-status payment-approved">Payment Approved</span>
                    </div>
                    <div class="user-job-actions">
                        <button class="user-job-action-btn" title="View Details"
                            onclick="window.location.href='view-job.php?id=6'">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="user-job-card-content">
                    <div class="user-job-details">
                        <div class="user-job-detail-item">
                            <i class="fas fa-calendar"></i>
                            <span>Payment: Jan 25, 2024</span>
                        </div>
                        <div class="user-job-detail-item">
                            <i class="fas fa-users"></i>
                            <span>Vendors: 1 assigned</span>
                        </div>
                        <div class="user-job-detail-item">
                            <i class="fas fa-check-circle"></i>
                            <span>Payment: Approved</span>
                        </div>
                    </div>
                    <div class="user-job-progress">
                        <div class="user-progress-bar">
                            <div class="user-progress-fill" style="width: 100%"></div>
                        </div>
                        <span class="user-progress-text">Payment Approved</span>
                    </div>
                </div>
            </div>

            <!-- Job Item 7 -->
            <div class="user-job-card" data-status="final-visit-pending" data-job-id="7">
                <div class="user-job-card-header">
                    <div class="user-job-title">
                        <h3>Kitchen Renovation</h3>
                        <p class="user-job-shop">KitchenCraft Pro</p>
                        <span class="user-job-status final-visit-pending">Final Visit Pending</span>
                    </div>
                    <div class="user-job-actions">
                        <button class="user-job-action-btn" title="View Details"
                            onclick="window.location.href='view-job.php?id=7'">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="user-job-card-content">
                    <div class="user-job-details">
                        <div class="user-job-detail-item">
                            <i class="fas fa-calendar"></i>
                            <span>Work Done: Jan 28, 2024</span>
                        </div>
                        <div class="user-job-detail-item">
                            <i class="fas fa-users"></i>
                            <span>Vendors: 1 assigned</span>
                        </div>
                        <div class="user-job-detail-item">
                            <i class="fas fa-clock"></i>
                            <span>Final Visit: Request Pending</span>
                        </div>
                    </div>
                    <div class="user-job-progress">
                        <div class="user-progress-bar">
                            <div class="user-progress-fill" style="width: 70%"></div>
                        </div>
                        <span class="user-progress-text">Ready for Final Visit</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- No Jobs Message -->
        <div class="user-no-jobs" id="userNoJobs" style="display: none;">
            <div class="user-no-jobs-content">
                <i class="fas fa-briefcase"></i>
                <h3>No Jobs Found</h3>
                <p>No jobs match your current search criteria.</p>
                <button class="user-btn-primary" onclick="clearFilters()">
                    <i class="fas fa-refresh"></i>
                    Clear Filters
                </button>
            </div>
        </div>
    </div>
</div>

<?php include 'includes/footer.php'; ?>