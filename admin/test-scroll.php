<?php
$page_title = 'Test Scroll';
include 'includes/header.php';
?>

        <!-- Test Content -->
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

            <!-- Test Cards for Scroll -->
            <?php for($i = 1; $i <= 20; $i++): ?>
            <div class="dashboard-card" style="margin-bottom: 20px;">
                <div class="card-header">
                    <h3>Test Card <?php echo $i; ?></h3>
                    <span>Card <?php echo $i; ?> of 20</span>
                </div>
                <div class="card-content">
                    <p>This is test content for card <?php echo $i; ?>. This card is designed to test scrolling functionality.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    
                    <div class="job-list">
                        <div class="job-item">
                            <div class="job-info">
                                <h4>Test Job <?php echo $i; ?> - Development</h4>
                                <p>Client: Test Company <?php echo $i; ?></p>
                                <span class="job-status <?php echo $i % 3 == 0 ? 'completed' : ($i % 2 == 0 ? 'in-progress' : 'pending'); ?>">
                                    <?php echo $i % 3 == 0 ? 'Completed' : ($i % 2 == 0 ? 'In Progress' : 'Pending'); ?>
                                </span>
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
            <?php endfor; ?>

            <!-- Bottom Test Card -->
            <div class="dashboard-card" style="margin-bottom: 50px;">
                <div class="card-header">
                    <h3>Bottom Test Card</h3>
                </div>
                <div class="card-content">
                    <p>This is the bottom card to test if scrolling reaches the end properly.</p>
                    <p>If you can see this card, scrolling is working correctly!</p>
                    
                    <div class="form-actions">
                        <button class="btn-primary">
                            <i class="fas fa-check"></i>
                            Scroll Test Complete
                        </button>
                        <button class="btn-secondary" onclick="history.back()">
                            <i class="fas fa-arrow-left"></i>
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </div>

<?php include 'includes/footer.php'; ?>
