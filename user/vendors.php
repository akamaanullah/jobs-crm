<?php
$page_title = 'My Vendors';
include 'includes/header.php';

// Sample vendors data (in real app, this would come from database)
$vendors = [
    [
        'id' => 1,
        'name' => 'Ahmed Khan',
        'email' => 'ahmed.khan@email.com',
        'phone' => '+92 (300) 123-4567',
        'specialization' => 'AC Technician',
        'status' => 'active',
        'assignedDate' => '2024-12-11T09:00:00',
        'assignedJob' => 'AC Repair & Maintenance',
        'jobId' => 'JOB-001',
        'quoteType' => 'free',
        'quoteAmount' => 0,
        'appointmentDate' => '2024-12-15',
        'appointmentTime' => '10:00',
        'platform' => 'Direct Contact',
        'avatar' => 'avatar1.jpg',
        'visitApprovedCount' => 2,
        'finalApprovedCount' => 1,
        'jobsCompletedCount' => 1
    ],
    [
        'id' => 2,
        'name' => 'Fatima Ali',
        'email' => 'fatima.ali@email.com',
        'phone' => '+92 (301) 987-6543',
        'specialization' => 'Plumber',
        'status' => 'active',
        'assignedDate' => '2024-12-11T10:30:00',
        'assignedJob' => 'Plumbing Services',
        'jobId' => 'JOB-002',
        'quoteType' => 'paid',
        'quoteAmount' => 150,
        'appointmentDate' => '2024-12-20',
        'appointmentTime' => '14:00',
        'platform' => 'Upwork',
        'avatar' => 'avatar2.jpg',
        'visitApprovedCount' => 3,
        'finalApprovedCount' => 2,
        'jobsCompletedCount' => 2
    ],
    [
        'id' => 3,
        'name' => 'Hassan Raza',
        'email' => 'hassan.raza@email.com',
        'phone' => '+92 (302) 456-7890',
        'specialization' => 'Electrician',
        'status' => 'completed',
        'assignedDate' => '2024-12-12T14:00:00',
        'assignedJob' => 'Electrical Wiring Installation',
        'jobId' => 'JOB-003',
        'quoteType' => 'paid',
        'quoteAmount' => 300,
        'appointmentDate' => '2024-12-25',
        'appointmentTime' => '12:00',
        'platform' => 'Fiverr',
        'avatar' => 'avatar3.jpg',
        'visitApprovedCount' => 5,
        'finalApprovedCount' => 4,
        'jobsCompletedCount' => 4
    ],
    [
        'id' => 4,
        'name' => 'Sara Ahmed',
        'email' => 'sara.ahmed@email.com',
        'phone' => '+92 (303) 789-0123',
        'specialization' => 'Carpenter',
        'status' => 'pending',
        'assignedDate' => '2024-12-13T11:00:00',
        'assignedJob' => 'Carpentry Work',
        'jobId' => 'JOB-004',
        'quoteType' => 'free',
        'quoteAmount' => 0,
        'appointmentDate' => '2024-12-18',
        'appointmentTime' => '16:00',
        'platform' => 'Direct Contact',
        'avatar' => 'avatar4.jpg',
        'visitApprovedCount' => 1,
        'finalApprovedCount' => 0,
        'jobsCompletedCount' => 0
    ],
    [
        'id' => 5,
        'name' => 'Omar Hassan',
        'email' => 'omar.hassan@email.com',
        'phone' => '+92 (304) 321-6540',
        'specialization' => 'Painter',
        'status' => 'active',
        'assignedDate' => '2024-12-14T15:30:00',
        'assignedJob' => 'Painting Services',
        'jobId' => 'JOB-005',
        'quoteType' => 'paid',
        'quoteAmount' => 200,
        'appointmentDate' => '2024-12-22',
        'appointmentTime' => '09:00',
        'platform' => 'Freelancer',
        'avatar' => 'avatar5.jpg',
        'visitApprovedCount' => 4,
        'finalApprovedCount' => 3,
        'jobsCompletedCount' => 3
    ]
];

// Filter vendors by status
$statusFilter = isset($_GET['status']) ? $_GET['status'] : 'all';
$filteredVendors = $vendors;

if ($statusFilter !== 'all') {
    $filteredVendors = array_filter($vendors, function($vendor) use ($statusFilter) {
        return $vendor['status'] === $statusFilter;
    });
}

// Search functionality
$searchQuery = isset($_GET['search']) ? $_GET['search'] : '';
if ($searchQuery) {
    $filteredVendors = array_filter($filteredVendors, function($vendor) use ($searchQuery) {
        return stripos($vendor['name'], $searchQuery) !== false ||
               stripos($vendor['specialization'], $searchQuery) !== false ||
               stripos($vendor['assignedJob'], $searchQuery) !== false;
    });
}
?>

<!-- Vendors Content -->
<div class="user-vendors-content">
    <!-- Page Header -->
    <div class="user-page-header">
        <div class="user-page-header-left">
            <h1>My Vendors</h1>
            <p>Manage and track all your service providers</p>
        </div>

    </div>

    <!-- Filters and Search -->
    <div class="user-filters-section">
        <div class="user-search-filter">
            <div class="user-search-box">
                <i class="fas fa-search"></i>
                <input type="text" id="vendorSearch" placeholder="Search vendors, jobs, or specializations..." value="<?php echo htmlspecialchars($searchQuery); ?>">
            </div>
        </div>
        
        <div class="user-status-filters">
            <a href="?status=all<?php echo $searchQuery ? '&search=' . urlencode($searchQuery) : ''; ?>" 
               class="user-filter-btn <?php echo $statusFilter === 'all' ? 'active' : ''; ?>">
                All (<?php echo count($vendors); ?>)
            </a>
            <a href="?status=active<?php echo $searchQuery ? '&search=' . urlencode($searchQuery) : ''; ?>" 
               class="user-filter-btn <?php echo $statusFilter === 'active' ? 'active' : ''; ?>">
                Active (<?php echo count(array_filter($vendors, function($v) { return $v['status'] === 'active'; })); ?>)
            </a>
            <a href="?status=pending<?php echo $searchQuery ? '&search=' . urlencode($searchQuery) : ''; ?>" 
               class="user-filter-btn <?php echo $statusFilter === 'pending' ? 'active' : ''; ?>">
                Pending (<?php echo count(array_filter($vendors, function($v) { return $v['status'] === 'pending'; })); ?>)
            </a>
            <a href="?status=completed<?php echo $searchQuery ? '&search=' . urlencode($searchQuery) : ''; ?>" 
               class="user-filter-btn <?php echo $statusFilter === 'completed' ? 'active' : ''; ?>">
                Completed (<?php echo count(array_filter($vendors, function($v) { return $v['status'] === 'completed'; })); ?>)
            </a>
        </div>
    </div>

    <!-- Vendors Grid -->
    <div class="user-vendors-grid">
        <?php if (empty($filteredVendors)): ?>
            <div class="user-no-vendors">
                <i class="fas fa-users-slash"></i>
                <h3>No vendors found</h3>
                <p>Try adjusting your search or filters to find what you're looking for.</p>
                <button class="user-btn-primary" id="addFirstVendor">
                    <i class="fas fa-user-plus"></i>
                    Add Your First Vendor
                </button>
            </div>
        <?php else: ?>
            <?php foreach ($filteredVendors as $vendor): ?>
                <div class="user-vendor-card" data-vendor-id="<?php echo $vendor['id']; ?>">
                    <!-- Vendor Header -->
                    <div class="user-vendor-header">
                        <div class="user-vendor-info">
                            <div class="user-vendor-avatar">
                                <img src="../assets/images/vendors/<?php echo $vendor['avatar']; ?>" 
                                     alt="<?php echo $vendor['name']; ?>">
                                <div class="user-vendor-status-badge <?php echo $vendor['status']; ?>">
                                    <?php 
                                    switch($vendor['status']) {
                                        case 'active':
                                            echo '<i class="fas fa-play-circle"></i> Active';
                                            break;
                                        case 'pending':
                                            echo '<i class="fas fa-clock"></i> Pending';
                                            break;
                                        case 'completed':
                                            echo '<i class="fas fa-check-circle"></i> Completed';
                                            break;
                                        default:
                                            echo ucfirst($vendor['status']);
                                    }
                                    ?>
                                </div>
                            </div>
                            <div class="user-vendor-details">
                                <h4><?php echo $vendor['name']; ?></h4>
                                <p class="user-vendor-specialization">
                                    <i class="fas fa-tools"></i> <?php echo $vendor['specialization']; ?>
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Job Assignment Info -->
                    <div class="user-vendor-job-info">
                        <div class="user-job-assignment">
                            <h5><i class="fas fa-briefcase"></i> Current Assignment</h5>
                            <div class="user-job-details">
                                <div class="user-job-item">
                                    <span class="label">Job:</span>
                                    <span class="value"><?php echo $vendor['assignedJob']; ?></span>
                                </div>
                                <div class="user-job-item">
                                    <span class="label">Job ID:</span>
                                    <span class="value"><?php echo $vendor['jobId']; ?></span>
                                </div>
                                <div class="user-job-item">
                                    <span class="label">Assigned:</span>
                                    <span class="value"><?php echo date('M d, Y', strtotime($vendor['assignedDate'])); ?></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Contact Information -->
                    <div class="user-vendor-contact">
                        <div class="user-contact-item">
                            <i class="fas fa-envelope"></i>
                            <span><?php echo $vendor['email']; ?></span>
                        </div>
                        <div class="user-contact-item">
                            <i class="fas fa-phone"></i>
                            <span><?php echo $vendor['phone']; ?></span>
                        </div>
                        <div class="user-contact-item">
                            <i class="fas fa-globe"></i>
                            <span><?php echo $vendor['platform']; ?></span>
                        </div>
                    </div>

                    <!-- Quote and Appointment -->
                    <div class="user-vendor-quote">
                        <div class="user-quote-info">
                            <div class="user-quote-type">
                                <span class="user-quote-badge <?php echo $vendor['quoteType']; ?>">
                                    <?php echo $vendor['quoteType'] === 'free' ? 'Free Quote' : 'Paid Quote'; ?>
                                </span>
                                <?php if ($vendor['quoteType'] === 'paid'): ?>
                                    <span class="user-quote-amount">$<?php echo $vendor['quoteAmount']; ?></span>
                                <?php endif; ?>
                            </div>
                            <div class="user-appointment-info">
                                <i class="fas fa-calendar-alt"></i>
                                <span><?php echo date('M d, Y', strtotime($vendor['appointmentDate'])); ?> at <?php echo date('g:i A', strtotime($vendor['appointmentTime'])); ?></span>
                            </div>
                        </div>
                    </div>

                    <!-- Performance Stats -->
                    <div class="user-vendor-stats">
                        <div class="user-stat-item">
                            <span class="user-stat-number"><?php echo $vendor['visitApprovedCount']; ?></span>
                            <span class="user-stat-label">Visit Approved</span>
                        </div>
                        <div class="user-stat-item">
                            <span class="user-stat-number"><?php echo $vendor['finalApprovedCount']; ?></span>
                            <span class="user-stat-label">Final Approved</span>
                        </div>
                        <div class="user-stat-item">
                            <span class="user-stat-number"><?php echo $vendor['jobsCompletedCount']; ?></span>
                            <span class="user-stat-label">Jobs Completed</span>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        <?php endif; ?>
    </div>
</div>

<!-- Add Vendor Modal -->
<div id="addVendorModal" class="user-modal">
    <div class="user-modal-content user-form-modal">
        <div class="user-modal-header">
            <h3><i class="fas fa-user-plus"></i> Add New Vendor</h3>
            <span class="user-close" id="closeAddVendor">&times;</span>
        </div>

        <form id="addVendorForm" class="user-form">
            <div class="user-form-section">
                <div class="user-section-title">
                    <i class="fas fa-user"></i>
                    <span>Vendor Information</span>
                </div>

                <div class="user-form-row">
                    <div class="user-form-group">
                        <label for="vendorName">Vendor Name *</label>
                        <input type="text" id="vendorName" name="vendorName" required>
                    </div>
                    <div class="user-form-group">
                        <label for="vendorPhone">Phone Number *</label>
                        <input type="tel" id="vendorPhone" name="vendorPhone" required>
                    </div>
                </div>

                <div class="user-form-group">
                    <label for="vendorEmail">Email Address *</label>
                    <input type="email" id="vendorEmail" name="vendorEmail" required>
                </div>

                <div class="user-form-group">
                    <label for="vendorSpecialization">Specialization *</label>
                    <select id="vendorSpecialization" name="vendorSpecialization" required>
                        <option value="">Select Specialization</option>
                        <option value="AC Technician">AC Technician</option>
                        <option value="Plumber">Plumber</option>
                        <option value="Electrician">Electrician</option>
                        <option value="Carpenter">Carpenter</option>
                        <option value="Painter">Painter</option>
                        <option value="Roofing Expert">Roofing Expert</option>
                        <option value="Renovation Expert">Renovation Expert</option>
                        <option value="General Contractor">General Contractor</option>
                    </select>
                </div>
            </div>

            <div class="user-form-section">
                <div class="user-section-title">
                    <i class="fas fa-dollar-sign"></i>
                    <span>Quote Information</span>
                </div>

                <div class="user-form-group">
                    <label>Quote Type *</label>
                    <div class="user-radio-group">
                        <label class="user-radio-option">
                            <input type="radio" name="quoteType" value="free" checked>
                            <span class="user-radio-custom"></span>
                            <span class="user-radio-label">Free Quote</span>
                        </label>
                        <label class="user-radio-option">
                            <input type="radio" name="quoteType" value="paid">
                            <span class="user-radio-custom"></span>
                            <span class="user-radio-label">Paid Quote</span>
                        </label>
                    </div>
                </div>

                <div class="user-form-group" id="quoteAmountGroup" style="display: none;">
                    <label for="quoteAmount">Quote Amount *</label>
                    <div class="user-input-with-icon">
                        <i class="fas fa-dollar-sign"></i>
                        <input type="number" id="quoteAmount" name="quoteAmount" min="0" step="0.01" placeholder="0.00">
                    </div>
                </div>
            </div>

            <div class="user-form-section">
                <div class="user-section-title">
                    <i class="fas fa-calendar-alt"></i>
                    <span>Appointment Details</span>
                </div>

                <div class="user-form-row">
                    <div class="user-form-group">
                        <label for="appointmentDate">Appointment Date *</label>
                        <input type="date" id="appointmentDate" name="appointmentDate" required>
                    </div>
                    <div class="user-form-group">
                        <label for="appointmentTime">Appointment Time *</label>
                        <input type="time" id="appointmentTime" name="appointmentTime" required>
                    </div>
                </div>

                <div class="user-form-group">
                    <label for="vendorPlatform">Vendor Platform (Optional)</label>
                    <input type="text" id="vendorPlatform" name="vendorPlatform"
                        placeholder="e.g., Upwork, Fiverr, Freelancer, etc.">
                </div>
            </div>

            <div class="user-form-actions">
                <button type="button" class="user-btn-secondary" id="cancelAddVendor">
                    <i class="fas fa-times"></i>
                    Cancel
                </button>
                <button type="submit" class="user-btn-primary">
                    <i class="fas fa-user-plus"></i>
                    Add Vendor
                </button>
            </div>
        </form>
    </div>
</div>

<?php include 'includes/footer.php'; ?>
