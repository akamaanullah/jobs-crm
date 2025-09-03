<?php
$page_title = 'View Job';
include 'includes/header.php';

// Sample job data (in real app, this would come from database)
$jobId = isset($_GET['id']) ? $_GET['id'] : 1;

// Different job data based on job ID
$jobData = [];
switch($jobId) {
    case 1:
        $jobData = [
            'id' => $jobId,
            'title' => 'AC Repair & Maintenance',
            'shopName' => 'CoolTech AC Services',
            'jobId' => 'JOB-001',
            'jobType' => 'AC Repair',
            'address' => '123 Main Street, Downtown',
            'city' => 'New York, NY 10001',
            'jobDetail' => 'Complete AC repair and maintenance service for residential unit. Includes system inspection, filter replacement, refrigerant check, and performance optimization. Unit is 5 years old and showing reduced cooling efficiency.',
            'slaDeadline' => '2024-12-15T14:30:00',
            'status' => 'visit-approved',
            'additionalNotes' => 'Client prefers morning appointments. AC unit is located on the 3rd floor balcony. Need to check for any warranty coverage.',
            'createdDate' => '2024-12-10T10:30:00',
            'pictures' => ['ac-repair1.jpg', 'ac-repair2.jpg']
        ];
        break;
    case 2:
        $jobData = [
            'id' => $jobId,
            'title' => 'Plumbing Services',
            'shopName' => 'ProPlumb Solutions',
            'jobId' => 'JOB-002',
            'jobType' => 'Plumbing',
            'address' => '456 Oak Avenue, Suburbia',
            'city' => 'Los Angeles, CA 90210',
            'jobDetail' => 'Kitchen sink repair and bathroom faucet replacement. Sink has slow drainage and faucet is leaking. Need to replace both fixtures with modern, water-efficient models.',
            'slaDeadline' => '2024-12-20T16:00:00',
            'status' => 'visit-request-pending',
            'additionalNotes' => 'Client wants eco-friendly fixtures. Kitchen renovation planned for next month.',
            'createdDate' => '2024-12-12T14:20:00',
            'pictures' => ['plumbing1.jpg']
        ];
        break;
    case 3:
        $jobData = [
            'id' => $jobId,
            'title' => 'Electrical Wiring Installation',
            'shopName' => 'PowerTech Electric',
            'jobId' => 'JOB-003',
            'jobType' => 'Electrical',
            'address' => '789 Pine Street, Downtown',
            'city' => 'Chicago, IL 60601',
            'jobDetail' => 'Complete electrical wiring installation for new home office. Includes new circuit installation, outlet placement, lighting fixtures, and safety inspection. Need to meet commercial office standards.',
            'slaDeadline' => '2024-12-25T12:00:00',
            'status' => 'final-visit-approved',
            'additionalNotes' => 'Client works from home and needs reliable power for multiple devices. Prefers LED lighting throughout.',
            'createdDate' => '2024-12-08T09:15:00',
            'pictures' => ['electrical1.jpg', 'electrical2.jpg', 'electrical3.jpg']
        ];
        break;
    case 4:
        $jobData = [
            'id' => $jobId,
            'title' => 'Carpentry Work',
            'shopName' => 'WoodCraft Masters',
            'jobId' => 'JOB-004',
            'jobType' => 'Carpentry',
            'address' => '321 Elm Street, Residential',
            'city' => 'Miami, FL 33101',
            'jobDetail' => 'Custom bookshelf and entertainment center construction. Built-in design with premium wood finish. Includes shelving, cable management, and LED accent lighting.',
            'slaDeadline' => '2024-12-18T17:00:00',
            'status' => 'work-completed',
            'additionalNotes' => 'Client provided specific dimensions and design preferences. Work completed ahead of schedule.',
            'createdDate' => '2024-12-05T11:45:00',
            'pictures' => ['carpentry1.jpg', 'carpentry2.jpg']
        ];
        break;
    case 5:
        $jobData = [
            'id' => $jobId,
            'title' => 'Painting Services',
            'shopName' => 'ColorPro Painters',
            'jobId' => 'JOB-005',
            'jobType' => 'Painting',
            'address' => '654 Maple Drive, Suburban',
            'city' => 'Houston, TX 77001',
            'jobDetail' => 'Interior painting for 3-bedroom apartment. Includes walls, ceilings, and trim work. Color scheme: neutral tones with accent walls in living room and master bedroom.',
            'slaDeadline' => '2024-12-22T15:30:00',
            'status' => 'payment-pending',
            'additionalNotes' => 'Client selected premium paint with low-VOC formula. Work completed successfully.',
            'createdDate' => '2024-12-15T08:30:00',
            'pictures' => ['painting1.jpg', 'painting2.jpg']
        ];
        break;
    case 6:
        $jobData = [
            'id' => $jobId,
            'title' => 'Roof Repair',
            'shopName' => 'RoofGuard Solutions',
            'jobId' => 'JOB-006',
            'jobType' => 'Roofing',
            'address' => '987 Cedar Lane, Rural',
            'city' => 'Phoenix, AZ 85001',
            'jobDetail' => 'Emergency roof repair after storm damage. Replace damaged shingles, repair flashing, and ensure proper drainage. Inspection reveals minor structural damage that needs attention.',
            'slaDeadline' => '2024-12-28T10:00:00',
            'status' => 'payment-approved',
            'additionalNotes' => 'Insurance claim approved. Client wants to upgrade to impact-resistant shingles.',
            'createdDate' => '2024-12-20T16:45:00',
            'pictures' => ['roof1.jpg', 'roof2.jpg']
        ];
        break;
    case 7:
        $jobData = [
            'id' => $jobId,
            'title' => 'Kitchen Renovation',
            'shopName' => 'KitchenCraft Pro',
            'jobId' => 'JOB-007',
            'jobType' => 'Renovation',
            'address' => '147 Birch Road, Upscale',
            'city' => 'Seattle, WA 98101',
            'jobDetail' => 'Complete kitchen renovation including new cabinets, countertops, appliances, and flooring. Modern design with quartz countertops and stainless steel appliances. Includes plumbing and electrical updates.',
            'slaDeadline' => '2025-01-15T18:00:00',
            'status' => 'final-visit-pending',
            'additionalNotes' => 'Client wants smart home integration for appliances. Project is 70% complete.',
            'createdDate' => '2024-12-01T13:20:00',
            'pictures' => ['kitchen1.jpg', 'kitchen2.jpg', 'kitchen3.jpg']
        ];
        break;
    default:
        $jobData = [
            'id' => $jobId,
            'title' => 'General Service',
            'shopName' => 'Service Provider',
            'jobId' => 'JOB-' . str_pad($jobId, 3, '0', STR_PAD_LEFT),
            'jobType' => 'General',
            'address' => 'Sample Address',
            'city' => 'Sample City',
            'jobDetail' => 'General service description.',
            'slaDeadline' => '2024-12-30T12:00:00',
            'status' => 'pending',
            'additionalNotes' => '',
            'createdDate' => '2024-12-01T10:00:00',
            'pictures' => []
        ];
}

// Sample vendors data
$vendors = [
    [
        'id' => 1,
        'name' => 'Ahmed Khan',
        'email' => 'ahmed.khan@email.com',
        'phone' => '+92 (300) 123-4567',
        'specialization' => 'AC Technician',
        'status' => 'visit_approved',
        'assignedDate' => '2024-12-11T09:00:00',
        'avatar' => 'vendor1.jpg'
    ],
    [
        'id' => 2,
        'name' => 'Fatima Ali',
        'email' => 'fatima.ali@email.com',
        'phone' => '+92 (301) 987-6543',
        'specialization' => 'Plumber',
        'status' => 'final_approved',
        'assignedDate' => '2024-12-11T10:30:00',
        'avatar' => 'vendor2.jpg'
    ],
    [
        'id' => 3,
        'name' => 'Hassan Raza',
        'email' => 'hassan.raza@email.com',
        'phone' => '+92 (302) 456-7890',
        'specialization' => 'Electrician',
        'status' => 'job_completed',
        'assignedDate' => '2024-12-12T14:00:00',
        'avatar' => 'vendor3.jpg'
    ]
];
?>

<!-- View Job Content -->
<div class="user-jobs-content">
    <!-- Page Header -->
    <div class="user-page-header">
        <div class="user-page-header-left">
            <div class="breadcrumb">
                <a href="jobs.php" class="breadcrumb-link">
                    <i class="fas fa-arrow-left"></i>
                    Back to Jobs
                </a>
            </div>
            <h1><?php echo $jobData['title']; ?></h1>
            <p>Job ID: <?php echo $jobData['jobId']; ?> | <?php echo ucfirst(str_replace('-', ' ', $jobData['status'])); ?></p>
        </div>
        <div class="user-page-header-actions">
            <button class="user-btn-primary" id="addVendor">
                <i class="fas fa-user-plus"></i>
                Add Vendor
            </button>
        </div>
    </div>

    <!-- Job Details Section -->
    <div class="user-job-details-section">
        <div class="user-section-header">
            <h3><i class="fas fa-info-circle"></i> Job Details</h3>
        </div>

        <div class="user-job-details-grid">
            <!-- Basic Information -->
            <div class="user-detail-card">
                <h4>Basic Information</h4>
                <div class="user-detail-item">
                    <span class="label">Service Type:</span>
                    <span class="value"><?php echo $jobData['jobType']; ?></span>
                </div>
                <div class="user-detail-item">
                    <span class="label">Service Provider:</span>
                    <span class="value"><?php echo $jobData['shopName']; ?></span>
                </div>
                <div class="user-detail-item">
                    <span class="label">Status:</span>
                    <span class="value">
                        <span class="user-status-badge <?php echo $jobData['status']; ?>">
                            <?php 
                            switch($jobData['status']) {
                                case 'visit-request-pending':
                                    echo 'Visit Request Pending';
                                    break;
                                case 'visit-approved':
                                    echo 'Visit Approved';
                                    break;
                                case 'final-visit-pending':
                                    echo 'Final Visit Pending';
                                    break;
                                case 'final-visit-approved':
                                    echo 'Final Visit Approved';
                                    break;
                                case 'work-completed':
                                    echo 'Work Completed';
                                    break;
                                case 'payment-pending':
                                    echo 'Payment Pending';
                                    break;
                                case 'payment-approved':
                                    echo 'Payment Approved';
                                    break;
                                default:
                                    echo ucfirst($jobData['status']);
                            }
                            ?>
                        </span>
                    </span>
                </div>
                <div class="user-detail-item">
                    <span class="label">Created:</span>
                    <span class="value"><?php echo date('M d, Y g:i A', strtotime($jobData['createdDate'])); ?></span>
                </div>
            </div>

            <!-- Location Information -->
            <div class="user-detail-card">
                <h4>Location</h4>
                <div class="user-detail-item">
                    <span class="label">Address:</span>
                    <span class="value"><?php echo $jobData['address']; ?></span>
                </div>
                <div class="user-detail-item">
                    <span class="label">City:</span>
                    <span class="value"><?php echo $jobData['city']; ?></span>
                </div>
                <div class="user-detail-item">
                    <button class="user-btn-link" id="viewOnMap">
                        <i class="fas fa-map-marker-alt"></i>
                        View on Map
                    </button>
                </div>
            </div>

            <!-- Timeline Information -->
            <div class="user-detail-card">
                <h4>Timeline</h4>
                <div class="user-detail-item">
                    <span class="label">Deadline:</span>
                    <span class="value"><?php echo date('M d, Y g:i A', strtotime($jobData['slaDeadline'])); ?></span>
                </div>
                <div class="user-detail-item">
                    <span class="label">Time Remaining:</span>
                    <span class="value" id="timeRemaining">
                        <span class="countdown" data-deadline="<?php echo $jobData['slaDeadline']; ?>">
                            Loading...
                        </span>
                    </span>
                </div>
                <div class="user-detail-item">
                    <span class="label">Progress:</span>
                    <span class="value">
                        <span class="user-progress-status" id="progressStatus">Calculating...</span>
                    </span>
                </div>
            </div>
        </div>

        <!-- Job Description -->
        <div class="user-detail-card full-width">
            <h4>Service Description</h4>
            <div class="user-job-description">
                <p><?php echo nl2br($jobData['jobDetail']); ?></p>
            </div>
        </div>

        <!-- Additional Notes -->
        <?php if (!empty($jobData['additionalNotes'])): ?>
            <div class="user-detail-card full-width">
                <h4>Additional Notes</h4>
                <div class="user-additional-notes">
                    <p><?php echo nl2br($jobData['additionalNotes']); ?></p>
                </div>
            </div>
        <?php endif; ?>

        <!-- Job Pictures -->
        <?php if (!empty($jobData['pictures'])): ?>
            <div class="user-detail-card full-width">
                <h4>Job Pictures</h4>
                <div class="user-job-pictures">
                    <?php foreach ($jobData['pictures'] as $picture): ?>
                        <div class="user-picture-item">
                            <img src="../assets/images/jobs/<?php echo $picture; ?>" alt="Job Picture"
                                onclick="openUserImageModal(this.src)">
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        <?php endif; ?>
    </div>

    <!-- Vendors Section -->
    <div class="user-vendors-section">
        <div class="user-section-header">
            <h3><i class="fas fa-users"></i> Assigned Service Providers</h3>
            <span class="user-vendor-count"><?php echo count($vendors); ?> providers assigned</span>
        </div>

        <div class="user-vendors-grid">
            <?php foreach ($vendors as $vendor): ?>
                <div class="user-vendor-card" data-vendor-id="<?php echo $vendor['id']; ?>">
                    <div class="user-vendor-header">
                        <div class="user-vendor-info">
                            <div class="user-vendor-avatar">
                                <img src="../assets/images/vendors/<?php echo $vendor['avatar']; ?>"
                                    alt="<?php echo $vendor['name']; ?>">
                            </div>
                            <div class="user-vendor-details">
                                <h4><?php echo $vendor['name']; ?></h4>
                                <p class="user-vendor-specialization"><?php echo $vendor['specialization']; ?></p>
                                <span class="user-vendor-status <?php echo $vendor['status']; ?>">
                                    <?php 
                                    switch($vendor['status']) {
                                        case 'visit_approved':
                                            echo '<i class="fas fa-check-circle"></i> Visit Approved';
                                            break;
                                        case 'final_approved':
                                            echo '<i class="fas fa-star"></i> Final Approved';
                                            break;
                                        case 'job_completed':
                                            echo '<i class="fas fa-trophy"></i> Job Completed';
                                            break;
                                        case 'payment_received':
                                            echo '<i class="fas fa-dollar-sign"></i> Payment Received';
                                            break;
                                        default:
                                            echo ucfirst($vendor['status']);
                                    }
                                    ?>
                                </span>
                            </div>
                        </div>
                        <div class="user-vendor-actions">
                            <button class="user-btn-icon" title="Remove Vendor">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>

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
                            <i class="fas fa-calendar"></i>
                            <span>Assigned: <?php echo date('M d, Y', strtotime($vendor['assignedDate'])); ?></span>
                        </div>
                    </div>

                    <!-- Vendor Action Buttons -->
                    <div class="user-vendor-actions-section">
                        <div class="user-vendor-action-buttons">
                            <!-- Visit Approval Button -->
                            <button class="user-action-btn user-btn-primary" id="requestVisitApproval-<?php echo $vendor['id']; ?>" 
                                    data-vendor-id="<?php echo $vendor['id']; ?>" 
                                    style="<?php echo ($vendor['status'] === 'visit_approved' || $vendor['status'] === 'final_approved' || $vendor['status'] === 'job_completed' || $vendor['status'] === 'payment_received') ? 'display: none;' : ''; ?>">
                                <i class="fas fa-check-circle"></i>
                                Request Visit Approval
                            </button>

                            <!-- Final Approval Button -->
                            <button class="user-action-btn user-btn-primary" id="requestFinalApproval-<?php echo $vendor['id']; ?>" 
                                    data-vendor-id="<?php echo $vendor['id']; ?>" 
                                    style="<?php echo ($vendor['status'] !== 'visit_approved') ? 'display: none;' : ''; ?>">
                                <i class="fas fa-star"></i>
                                Request Final Approval
                            </button>

                            <!-- Job Complete Button -->
                            <button class="user-action-btn user-btn-primary" id="requestJobComplete-<?php echo $vendor['id']; ?>" 
                                    data-vendor-id="<?php echo $vendor['id']; ?>" 
                                    style="<?php echo ($vendor['status'] !== 'final_approved') ? 'display: none;' : ''; ?>">
                                <i class="fas fa-trophy"></i>
                                Job Complete
                            </button>

                            <!-- Status Display -->
                            <div class="user-vendor-status-display" id="vendorStatus-<?php echo $vendor['id']; ?>">
                                <?php if ($vendor['status'] === 'visit_approved'): ?>
                                    <span class="user-status-success">
                                        <i class="fas fa-check-circle"></i> Visit Approved
                                    </span>
                                <?php elseif ($vendor['status'] === 'final_approved'): ?>
                                    <span class="user-status-success">
                                        <i class="fas fa-star"></i> Final Approved
                                    </span>
                                <?php elseif ($vendor['status'] === 'job_completed'): ?>
                                    <span class="user-status-success">
                                        <i class="fas fa-trophy"></i> Job Completed
                                    </span>
                                <?php elseif ($vendor['status'] === 'payment_received'): ?>
                                    <span class="user-status-success">
                                        <i class="fas fa-dollar-sign"></i> Payment Received
                                    </span>
                                <?php endif; ?>
                            </div>
                        </div>
                    </div>

                    <!-- Vendor Notes Section -->
                    <div class="user-vendor-chat">
                        <div class="user-chat-header">
                            <h5>Notes about <?php echo $vendor['name']; ?></h5>
                            <div class="user-chat-actions">
                                <button class="user-btn-icon user-chat-large" title="Open Large Chat" data-vendor-id="<?php echo $vendor['id']; ?>">
                                    <i class="fas fa-expand"></i>
                                </button>
                                <button class="user-btn-icon user-chat-toggle" title="Toggle Notes">
                                    <i class="fas fa-chevron-down"></i>
                                </button>
                            </div>
                        </div>

                        <div class="user-chat-container" style="display: none;">
                            <div class="user-chat-messages" id="userChatMessages-<?php echo $vendor['id']; ?>">
                                <!-- Sample notes about vendor -->
                                <div class="user-message admin-message">
                                    <div class="user-message-content">
                                        <p>Called <?php echo $vendor['name']; ?> today. He said he'll complete the <?php echo $vendor['specialization']; ?> work by Friday. Seems confident about the timeline.</p>
                                        <span class="user-message-time">2:30 PM</span>
                                    </div>
                                </div>
                                <div class="user-message user-message">
                                    <div class="user-message-content">
                                        <p>Spoke with <?php echo $vendor['name']; ?> on WhatsApp. He sent some sample work - looks good quality. Asked for 50% advance payment.</p>
                                        <span class="user-message-time">2:35 PM</span>
                                    </div>
                                </div>
                                
                                <div class="user-message admin-message">
                                    <div class="user-message-content">
                                        <p>Updated vendor status to "Visit Approved". He visited the site yesterday and confirmed he can handle the work.</p>
                                        <span class="user-message-time">2:40 PM</span>
                                    </div>
                                </div>
                                
                                <div class="user-message user-message">
                                    <div class="user-message-content">
                                        <p>Vendor completed the work today! Quality is excellent. Need to process payment now.</p>
                                        <span class="user-message-time">2:45 PM</span>
                                    </div>
                                </div>
                            </div>

                            <div class="user-chat-input">
                                <div class="user-input-group">
                                    <input type="text" class="user-chat-message-input" placeholder="Add note about <?php echo $vendor['name']; ?>..."
                                        data-vendor-id="<?php echo $vendor['id']; ?>">
                                    <button class="user-btn-icon user-send-message" data-vendor-id="<?php echo $vendor['id']; ?>">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</div>

<!-- Image Modal -->
<div id="userImageModal" class="user-modal">
    <div class="user-modal-content">
        <span class="user-close">&times;</span>
        <img id="userModalImage" src="" alt="Job Picture">
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

<!-- Final Approval Modal -->
<div id="finalApprovalModal" class="user-modal">
    <div class="user-modal-content user-form-modal">
        <div class="user-modal-header">
            <h3><i class="fas fa-star"></i> Request Final Approval</h3>
            <span class="user-close" id="closeFinalApproval">&times;</span>
        </div>

        <form id="finalApprovalForm" class="user-form">
            <div class="user-form-section">
                <div class="user-section-title">
                    <i class="fas fa-info-circle"></i>
                    <span>Project Details</span>
                </div>

                <div class="user-form-group">
                    <label for="estimatedAmount">Estimated Amount *</label>
                    <div class="user-input-with-icon">
                        <i class="fas fa-dollar-sign"></i>
                        <input type="number" id="estimatedAmount" name="estimatedAmount" min="0" step="0.01" required placeholder="0.00">
                    </div>
                </div>

                <div class="user-form-row">
                    <div class="user-form-group">
                        <label for="projectDate">Project Date *</label>
                        <input type="date" id="projectDate" name="projectDate" required>
                    </div>
                    <div class="user-form-group">
                        <label for="projectTime">Project Time *</label>
                        <input type="time" id="projectTime" name="projectTime" required>
                    </div>
                </div>

                <div class="user-form-group">
                    <label for="paymentMode">Payment Mode *</label>
                    <select id="paymentMode" name="paymentMode" required>
                        <option value="">Select Payment Mode</option>
                        <option value="cash">Cash</option>
                        <option value="bank_transfer">Bank Transfer</option>
                        <option value="check">Check</option>
                        <option value="online">Online Payment</option>
                        <option value="partial">Partial Payment</option>
                    </select>
                </div>

                <div class="user-form-group">
                    <label for="additionalNotes">Additional Notes</label>
                    <textarea id="additionalNotes" name="additionalNotes" rows="4" 
                        placeholder="Any additional information about the project, vendor requirements, or special conditions..."></textarea>
                </div>
            </div>

            <div class="user-form-actions">
                <button type="button" class="user-btn-secondary" id="cancelFinalApproval">
                    <i class="fas fa-times"></i>
                    Cancel
                </button>
                <button type="submit" class="user-btn-primary">
                    <i class="fas fa-paper-plane"></i>
                    Submit Request
                </button>
            </div>
        </form>
    </div>
</div>

<!-- Large Chat Dropdown -->
<div id="largeChatModal" class="user-large-chat-dropdown">
    <div class="user-large-chat-header">
        <h3 id="largeChatTitle">Chat with Vendor</h3>
        <button class="user-btn-icon" id="closeLargeChat" title="Close">
            <i class="fas fa-times"></i>
        </button>
    </div>
    
    <div class="user-large-chat-container">
        <div class="user-large-messages" id="largeChatMessages">
            <!-- Messages will be loaded here -->
        </div>
        
        <div class="user-large-chat-input">
            <div class="user-input-group">
                <input type="text" class="user-large-message-input" placeholder="Type your message..." id="largeMessageInput">
                <button class="user-btn-icon user-send-large-message" id="sendLargeMessage">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Job Complete Modal -->
<div id="jobCompleteModal" class="user-modal">
    <div class="user-modal-content user-form-modal">
        <div class="user-modal-header">
            <h3><i class="fas fa-trophy"></i> Job Completion</h3>
            <span class="user-close" id="closeJobComplete">&times;</span>
        </div>

                 <form id="jobCompleteForm" class="user-form">
             <!-- Pictures Section -->
             <div class="user-form-dropdown-section">
                 <div class="user-dropdown-header" data-target="picturesSection">
                     <div class="user-dropdown-title">
                         <i class="fas fa-images"></i>
                         <span>Add Pictures</span>
                     </div>
                     <i class="fas fa-chevron-down user-dropdown-icon"></i>
                 </div>
                 <div class="user-dropdown-content" id="picturesSection">
                     <div class="user-form-group">
                         <label for="jobPictures">Upload Job Pictures *</label>
                         <div class="user-file-upload">
                             <input type="file" id="jobPictures" name="jobPictures[]" multiple accept="image/*" required>
                             <div class="user-file-upload-info">
                                 <i class="fas fa-cloud-upload-alt"></i>
                                 <p>Click to upload or drag and drop</p>
                                 <span>PNG, JPG, JPEG up to 10MB each</span>
                             </div>
                         </div>
                         <div id="jobPicturesPreview" class="user-file-preview"></div>
                     </div>
                 </div>
             </div>
 
             <!-- W9 Form Section -->
             <div class="user-form-dropdown-section">
                 <div class="user-dropdown-header" data-target="w9Section">
                     <div class="user-dropdown-title">
                         <i class="fas fa-file-alt"></i>
                         <span>Add W9 Form</span>
                     </div>
                     <i class="fas fa-chevron-down user-dropdown-icon"></i>
                 </div>
                 <div class="user-dropdown-content" id="w9Section">
                     <div class="user-form-row">
                         <div class="user-form-group">
                             <label for="vendorBusinessName">Vendor/Business Name *</label>
                             <input type="text" id="vendorBusinessName" name="vendorBusinessName" required>
                         </div>
                         <div class="user-form-group">
                             <label for="entityType">Entity Type *</label>
                             <select id="entityType" name="entityType" required>
                                 <option value="">Select Entity Type</option>
                                 <option value="individual">Individual/Sole Proprietor</option>
                                 <option value="llc">LLC</option>
                                 <option value="corporation">Corporation</option>
                                 <option value="partnership">Partnership</option>
                                 <option value="estate">Estate</option>
                                 <option value="trust">Trust</option>
                             </select>
                         </div>
                     </div>
 
                     <div class="user-form-group">
                         <label for="vendorAddress">Address *</label>
                         <textarea id="vendorAddress" name="vendorAddress" rows="3" required 
                             placeholder="Enter complete address including street, city, state, and ZIP code"></textarea>
                     </div>
 
                     <div class="user-form-row">
                         <div class="user-form-group">
                             <label for="einSsn">EIN/SSN *</label>
                             <input type="text" id="einSsn" name="einSsn" required 
                                 placeholder="XX-XXXXXXX (EIN) or XXX-XX-XXXX (SSN)">
                         </div>
                         <div class="user-form-group">
                             <label for="w9FormFile">Upload W9 Form (Optional)</label>
                             <div class="user-file-upload user-w9-upload">
                                 <input type="file" id="w9FormFile" name="w9FormFile" accept=".pdf,.doc,.docx">
                                 <div class="user-file-upload-info">
                                     <i class="fas fa-file-contract"></i>
                                     <p>Upload completed W9 form</p>
                                     <span>PDF, DOC, DOCX up to 5MB</span>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
 
             <!-- Invoice Section -->
             <div class="user-form-dropdown-section">
                 <div class="user-dropdown-header" data-target="invoiceSection">
                     <div class="user-dropdown-title">
                         <i class="fas fa-receipt"></i>
                         <span>Add Invoice</span>
                     </div>
                     <i class="fas fa-chevron-down user-dropdown-icon"></i>
                 </div>
                 <div class="user-dropdown-content" id="invoiceSection">
                     <div class="user-form-group">
                         <label for="invoiceFile">Upload Invoice *</label>
                         <div class="user-file-upload">
                             <input type="file" id="invoiceFile" name="invoiceFile" accept=".pdf,.doc,.docx,.xls,.xlsx" required>
                             <div class="user-file-upload-info">
                                 <i class="fas fa-file-upload"></i>
                                 <p>Upload vendor invoice</p>
                                 <span>PDF, DOC, DOCX, XLS, XLSX up to 10MB</span>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>

            <div class="user-form-actions">
                <button type="button" class="user-btn-secondary" id="cancelJobComplete">
                    <i class="fas fa-times"></i>
                    Cancel
                </button>
                <button type="submit" class="user-btn-primary">
                    <i class="fas fa-check-circle"></i>
                    Complete Job
                </button>
            </div>
        </form>
    </div>
</div>

<?php include 'includes/footer.php'; ?>

