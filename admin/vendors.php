<?php
$page_title = 'Vendors';
include 'includes/header.php';

// Sample vendor data (in real app, this would come from database)
$vendors = [
    [
        'id' => 1,
        'name' => 'John Smith',
        'email' => 'john.smith@email.com',
        'phone' => '+1 (555) 123-4567',
        'specialization' => 'Frontend Development',
        'status' => 'active',
        'platform' => 'Upwork',
        'quoteType' => 'paid',
        'quoteAmount' => 2500,
        'appointmentDate' => '2024-12-15',
        'appointmentTime' => '14:00',
        'assignedDate' => '2024-11-01',
        'avatar' => 'avatar1.jpg',
        'totalProjects' => 15,
        'completedProjects' => 12,
        'totalEarnings' => 45000,
        'successRate' => 80,
        'rating' => 4.8
    ],
    [
        'id' => 2,
        'name' => 'Sarah Johnson',
        'email' => 'sarah.johnson@email.com',
        'phone' => '+1 (555) 234-5678',
        'specialization' => 'UI/UX Design',
        'status' => 'active',
        'platform' => 'Fiverr',
        'quoteType' => 'free',
        'quoteAmount' => null,
        'appointmentDate' => '2024-12-20',
        'appointmentTime' => '10:30',
        'assignedDate' => '2024-10-15',
        'avatar' => 'avatar2.jpg',
        'totalProjects' => 28,
        'completedProjects' => 25,
        'totalEarnings' => 78000,
        'successRate' => 89,
        'rating' => 4.9
    ],
    [
        'id' => 3,
        'name' => 'Michael Chen',
        'email' => 'michael.chen@email.com',
        'phone' => '+1 (555) 345-6789',
        'specialization' => 'Backend Development',
        'status' => 'pending',
        'platform' => 'Freelancer',
        'quoteType' => 'paid',
        'quoteAmount' => 3200,
        'appointmentDate' => '2024-12-25',
        'appointmentTime' => '16:00',
        'assignedDate' => '2024-12-01',
        'avatar' => 'avatar3.jpg',
        'totalProjects' => 8,
        'completedProjects' => 6,
        'totalEarnings' => 22000,
        'successRate' => 75,
        'rating' => 4.5
    ],
    [
        'id' => 4,
        'name' => 'Emily Davis',
        'email' => 'emily.davis@email.com',
        'phone' => '+1 (555) 456-7890',
        'specialization' => 'Mobile Development',
        'status' => 'active',
        'platform' => 'Upwork',
        'quoteType' => 'paid',
        'quoteAmount' => 2800,
        'appointmentDate' => '2024-12-18',
        'appointmentTime' => '11:00',
        'assignedDate' => '2024-11-20',
        'avatar' => 'avatar4.jpg',
        'totalProjects' => 22,
        'completedProjects' => 19,
        'totalEarnings' => 65000,
        'successRate' => 86,
        'rating' => 4.7
    ],
    [
        'id' => 5,
        'name' => 'David Wilson',
        'email' => 'david.wilson@email.com',
        'phone' => '+1 (555) 567-8901',
        'specialization' => 'Database Admin',
        'status' => 'inactive',
        'platform' => 'Fiverr',
        'quoteType' => 'free',
        'quoteAmount' => null,
        'appointmentDate' => '2024-12-30',
        'appointmentTime' => '13:30',
        'assignedDate' => '2024-09-10',
        'avatar' => 'avatar5.jpg',
        'totalProjects' => 12,
        'completedProjects' => 10,
        'totalEarnings' => 35000,
        'successRate' => 83,
        'rating' => 4.6
    ]
];

// Sample work history data
$workHistory = [
    1 => [
        [
            'jobId' => 'JOB-001',
            'jobTitle' => 'E-commerce Website Development',
            'storeName' => 'Tech Solutions Inc.',
            'startDate' => '2024-11-01',
            'endDate' => '2024-12-01',
            'status' => 'completed',
            'earnings' => 2500,
            'rating' => 5,
            'feedback' => 'Excellent work! John delivered the project on time with high quality.'
        ],
        [
            'jobId' => 'JOB-003',
            'jobTitle' => 'Corporate Website Redesign',
            'storeName' => 'Global Enterprises',
            'startDate' => '2024-10-15',
            'endDate' => '2024-11-15',
            'status' => 'completed',
            'earnings' => 3000,
            'rating' => 4,
            'feedback' => 'Good work, but some minor revisions were needed.'
        ],
        [
            'jobId' => 'JOB-005',
            'jobTitle' => 'Portfolio Website',
            'storeName' => 'Creative Studios',
            'startDate' => '2024-12-05',
            'endDate' => null,
            'status' => 'in-progress',
            'earnings' => 2000,
            'rating' => null,
            'feedback' => null
        ]
    ],
    2 => [
        [
            'jobId' => 'JOB-002',
            'jobTitle' => 'Mobile App UI Design',
            'storeName' => 'Innovation Labs',
            'startDate' => '2024-11-10',
            'endDate' => '2024-12-10',
            'status' => 'completed',
            'earnings' => 1800,
            'rating' => 5,
            'feedback' => 'Sarah created beautiful and intuitive designs. Highly recommended!'
        ],
        [
            'jobId' => 'JOB-004',
            'jobTitle' => 'Dashboard Design',
            'storeName' => 'Data Analytics Corp',
            'startDate' => '2024-12-01',
            'endDate' => null,
            'status' => 'in-progress',
            'earnings' => 2200,
            'rating' => null,
            'feedback' => null
        ]
    ],
    3 => [
        [
            'jobId' => 'JOB-006',
            'jobTitle' => 'API Development',
            'storeName' => 'StartupXYZ',
            'startDate' => '2024-12-01',
            'endDate' => null,
            'status' => 'in-progress',
            'earnings' => 3200,
            'rating' => null,
            'feedback' => null
        ]
    ],
    4 => [
        [
            'jobId' => 'JOB-007',
            'jobTitle' => 'iOS App Development',
            'storeName' => 'Mobile Solutions',
            'startDate' => '2024-11-20',
            'endDate' => null,
            'status' => 'in-progress',
            'earnings' => 2800,
            'rating' => null,
            'feedback' => null
        ]
    ],
    5 => [
        [
            'jobId' => 'JOB-008',
            'jobTitle' => 'Database Optimization',
            'storeName' => 'Enterprise Systems',
            'startDate' => '2024-09-10',
            'endDate' => '2024-10-10',
            'status' => 'completed',
            'earnings' => 1500,
            'rating' => 4,
            'feedback' => 'Good database optimization work.'
        ]
    ]
];
?>

<!-- Vendors Content -->
<div class="dashboard-content">
    <!-- Page Header -->
    <div class="page-header">
        <div class="header-content">
            <h2>Vendors Management</h2>
            <p>Manage and track all vendors in the system</p>
        </div>

    </div>

    <!-- Filters Section -->
    <div class="filters-section">
        <div class="search-box">
            <i class="fas fa-search"></i>
            <input type="text" id="vendorSearch" placeholder="Search vendors by name, email, or specialization...">
        </div>
        <div class="filter-controls">
            <select id="statusFilter" class="filter-select">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
            </select>
            <select id="specializationFilter" class="filter-select">
                <option value="">All Specializations</option>
                <option value="frontend development">Frontend Development</option>
                <option value="backend development">Backend Development</option>
                <option value="ui/ux design">UI/UX Design</option>
                <option value="mobile development">Mobile Development</option>
                <option value="database admin">Database Admin</option>
            </select>
            <select id="platformFilter" class="filter-select">
                <option value="">All Platforms</option>
                <option value="upwork">Upwork</option>
                <option value="fiverr">Fiverr</option>
                <option value="freelancer">Freelancer</option>
            </select>
        </div>
    </div>

    <!-- Vendors Stats -->
    <div class="table-header">
        <div class="table-stats">
            <span id="totalVendors"><?php echo count($vendors); ?> Total Vendors</span>
            <span id="activeVendors"><?php echo count(array_filter($vendors, function($v) { return $v['status'] === 'active'; })); ?> Active</span>
        </div>
        <div class="table-actions">
            <button class="btn-secondary" id="exportVendors">
                <i class="fas fa-download"></i>
                Export
            </button>
            <button class="btn-secondary" id="bulkActions">
                <i class="fas fa-cogs"></i>
                Bulk Actions
            </button>
        </div>
    </div>

    <!-- Vendors Grid -->
    <div class="vendors-grid">
        <?php foreach ($vendors as $vendor): ?>
        <div class="vendor-card" data-vendor-id="<?php echo $vendor['id']; ?>">
            <div class="vendor-header">
                <div class="vendor-info">
                    <div class="vendor-avatar">
                        <?php 
                        $initials = '';
                        $nameParts = explode(' ', $vendor['name']);
                        foreach ($nameParts as $part) {
                            $initials .= strtoupper(substr($part, 0, 1));
                        }
                        echo $initials;
                        ?>
                    </div>
                    <div class="vendor-details">
                        <h4><?php echo $vendor['name']; ?></h4>
                        <p class="vendor-specialization"><?php echo $vendor['specialization']; ?></p>
                        <span class="vendor-status <?php echo $vendor['status']; ?>">
                            <?php echo ucfirst($vendor['status']); ?>
                        </span>
                    </div>
                </div>
                <div class="vendor-actions">
                    <button class="btn-icon view-profile-btn" title="View Profile" data-vendor-id="<?php echo $vendor['id']; ?>">
                        <i class="fas fa-user"></i>
                    </button>
                    <button class="btn-icon remove-vendor-btn" title="Remove Vendor" data-vendor-id="<?php echo $vendor['id']; ?>">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>

            <div class="vendor-contact">
                <div class="contact-item">
                    <i class="fas fa-envelope"></i>
                    <span><?php echo $vendor['email']; ?></span>
                </div>
                <div class="contact-item">
                    <i class="fas fa-phone"></i>
                    <span><?php echo $vendor['phone']; ?></span>
                </div>
                <div class="contact-item">
                    <i class="fas fa-globe"></i>
                    <span>Platform: <?php echo $vendor['platform']; ?></span>
                </div>
                <div class="contact-item">
                    <i class="fas fa-calendar-check"></i>
                    <span>Added: <?php echo date('M d, Y', strtotime($vendor['assignedDate'])); ?></span>
                </div>
                <div class="contact-item">
                    <i class="fas fa-user"></i>
                    <span>Added by: Admin</span>
                </div>
            </div>

            <div class="vendor-stats">
                <div class="stat-item">
                    <span class="stat-label">Total Projects</span>
                    <span class="stat-value"><?php echo $vendor['totalProjects']; ?></span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Completed</span>
                    <span class="stat-value"><?php echo $vendor['completedProjects']; ?></span>
                </div>
            </div>


        </div>
        <?php endforeach; ?>
    </div>
</div>

<!-- Vendor Profile Modal -->
<div id="vendorProfileModal" class="modal">
    <div class="modal-content vendor-profile-modal">
        <div class="modal-header">
            <h3><i class="fas fa-user"></i> Vendor Profile</h3>
            <span class="close" id="closeVendorProfile">&times;</span>
        </div>
        
        <div class="vendor-profile-content">
            <!-- Vendor Basic Info -->
            <div class="vendor-profile-section">
                <div class="vendor-profile-header">
                    <div class="vendor-profile-avatar" id="modalVendorAvatar">
                        <!-- Avatar will be set dynamically -->
                    </div>
                    <div class="vendor-profile-info">
                        <h4 id="modalVendorName">Vendor Name</h4>
                        <p id="modalVendorSpecialization">Specialization</p>
                        <span class="vendor-status" id="modalVendorStatus">Status</span>
                    </div>
                </div>
            </div>
            
                         <!-- Vendor Details -->
             <div class="vendor-profile-section">
                 <div class="section-title">
                     <i class="fas fa-info-circle"></i>
                     <span>Contact Information</span>
                 </div>
                 <div class="vendor-profile-details">
                     <div class="vendor-detail-row">
                         <i class="fas fa-envelope"></i>
                         <span id="modalVendorEmail">email@example.com</span>
                     </div>
                     <div class="vendor-detail-row">
                         <i class="fas fa-phone"></i>
                         <span id="modalVendorPhone">+1 (555) 123-4567</span>
                     </div>
                     <div class="vendor-detail-row">
                         <i class="fas fa-globe"></i>
                         <span id="modalVendorPlatform">Platform</span>
                     </div>
                     <div class="vendor-detail-row">
                         <i class="fas fa-calendar-check"></i>
                         <span id="modalVendorJoinDate">Added: Join Date</span>
                     </div>
                     <div class="vendor-detail-row">
                         <i class="fas fa-user"></i>
                         <span id="modalVendorAddedBy">Added by: Admin</span>
                     </div>
                 </div>
             </div>
            
            <!-- Performance Stats -->
            <div class="vendor-profile-section">
                <div class="section-title">
                    <i class="fas fa-chart-line"></i>
                    <span>Performance Statistics</span>
                </div>
                <div class="vendor-stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-briefcase"></i>
                        </div>
                        <div class="stat-info">
                            <span class="stat-value" id="modalTotalProjects">0</span>
                            <span class="stat-label">Total Projects</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="stat-info">
                            <span class="stat-value" id="modalCompletedProjects">0</span>
                            <span class="stat-label">Completed</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-dollar-sign"></i>
                        </div>
                        <div class="stat-info">
                            <span class="stat-value" id="modalTotalEarnings">$0</span>
                            <span class="stat-label">Total Earnings</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-percentage"></i>
                        </div>
                        <div class="stat-info">
                            <span class="stat-value" id="modalSuccessRate">0%</span>
                            <span class="stat-label">Success Rate</span>
                        </div>
                    </div>
                </div>
            </div>
            
            
            
            <!-- Work History -->
            <div class="vendor-profile-section">
                <div class="section-title">
                    <i class="fas fa-history"></i>
                    <span>Work History</span>
                </div>
                <div class="work-history-container" id="modalWorkHistory">
                    <div class="no-history">
                        <i class="fas fa-inbox"></i>
                        <p>No work history available</p>
                    </div>
                </div>
            </div>
            
            
        </div>
    </div>
</div>

<?php include 'includes/footer.php'; ?>
