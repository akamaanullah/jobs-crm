<?php
$page_title = 'View Job';
include 'includes/header.php';

// Sample job data (in real app, this would come from database)
$jobId = isset($_GET['id']) ? $_GET['id'] : 1;
$jobData = [
    'id' => $jobId,
    'storeName' => 'Tech Solutions Inc.',
    'storeId' => 'JOB-001',
    'jobType' => 'development',
    'address' => '123 Main Street, Downtown',
    'city' => 'New York, NY 10001',
    'jobDetail' => 'Complete website development for Tech Solutions Inc. including frontend design, backend functionality, database integration, and mobile responsiveness. The website should include user authentication, admin panel, payment integration, and real-time notifications.',
    'slaDeadline' => '2024-12-15T14:30:00',
    'status' => 'in-progress',
    'additionalNotes' => 'Client prefers modern design with blue color scheme. Need to integrate with their existing CRM system. Mobile app version will be developed in phase 2.',
    'createdDate' => '2024-12-10T10:30:00',
    'pictures' => ['job1.jpg', 'job2.jpg', 'job3.jpg']
];

$vendors = [
    [
        'id' => 1,
        'name' => 'John Smith',
        'email' => 'john.smith@email.com',
        'phone' => '+1 (555) 123-4567',
        'specialization' => 'Frontend Development',
        'status' => 'visit_approved',
        'assignedDate' => '2024-12-11T09:00:00',
        'avatar' => 'vendor1.jpg'
    ],
    [
        'id' => 2,
        'name' => 'Sarah Johnson',
        'email' => 'sarah.johnson@email.com',
        'phone' => '+1 (555) 987-6543',
        'specialization' => 'Backend Development',
        'status' => 'final_approved',
        'assignedDate' => '2024-12-11T10:30:00',
        'avatar' => 'vendor2.jpg'
    ],
    [
        'id' => 3,
        'name' => 'Mike Wilson',
        'email' => 'mike.wilson@email.com',
        'phone' => '+1 (555) 456-7890',
        'specialization' => 'UI/UX Design',
        'status' => 'job_completed',
        'assignedDate' => '2024-12-12T14:00:00',
        'avatar' => 'vendor3.jpg'
    ],
    [
        'id' => 4,
        'name' => 'Emily Davis',
        'email' => 'emily.davis@email.com',
        'phone' => '+1 (555) 234-5678',
        'specialization' => 'Database Admin',
        'status' => 'payment_received',
        'assignedDate' => '2024-12-12T11:00:00',
        'avatar' => 'vendor4.jpg'
    ],
    [
        'id' => 5,
        'name' => 'David Brown',
        'email' => 'david.brown@email.com',
        'phone' => '+1 (555) 345-6789',
        'specialization' => 'DevOps Engineer',
        'status' => 'visit_approved',
        'assignedDate' => '2024-12-12T13:30:00',
        'avatar' => 'vendor5.jpg'
    ],
    [
        'id' => 6,
        'name' => 'Lisa Anderson',
        'email' => 'lisa.anderson@email.com',
        'phone' => '+1 (555) 456-7890',
        'specialization' => 'QA Tester',
        'status' => 'final_approved',
        'assignedDate' => '2024-12-13T09:15:00',
        'avatar' => 'vendor6.jpg'
    ],
    [
        'id' => 7,
        'name' => 'Robert Taylor',
        'email' => 'robert.taylor@email.com',
        'phone' => '+1 (555) 567-8901',
        'specialization' => 'Security Expert',
        'status' => 'job_completed',
        'assignedDate' => '2024-12-13T10:45:00',
        'avatar' => 'vendor7.jpg'
    ],
    [
        'id' => 8,
        'name' => 'Jennifer White',
        'email' => 'jennifer.white@email.com',
        'phone' => '+1 (555) 678-9012',
        'specialization' => 'Mobile Developer',
        'status' => 'payment_received',
        'assignedDate' => '2024-12-13T14:20:00',
        'avatar' => 'vendor8.jpg'
    ],
    [
        'id' => 9,
        'name' => 'Michael Clark',
        'email' => 'michael.clark@email.com',
        'phone' => '+1 (555) 789-0123',
        'specialization' => 'System Architect',
        'status' => 'visit_approved',
        'assignedDate' => '2024-12-14T08:30:00',
        'avatar' => 'vendor9.jpg'
    ],
    [
        'id' => 10,
        'name' => 'Amanda Lee',
        'email' => 'amanda.lee@email.com',
        'phone' => '+1 (555) 890-1234',
        'specialization' => 'Project Manager',
        'status' => 'final_approved',
        'assignedDate' => '2024-12-14T11:00:00',
        'avatar' => 'vendor10.jpg'
    ]
];
?>

<!-- View Job Content -->
<div class="dashboard-content">
    <!-- Page Header -->
    <div class="page-header">
        <div class="header-content">
            <div class="breadcrumb">
                <a href="manage-jobs.php" class="breadcrumb-link">
                    <i class="fas fa-arrow-left"></i>
                    Back to Jobs
                </a>
            </div>
            <h2><?php echo $jobData['storeName']; ?></h2>
            <p>Job ID: <?php echo $jobData['storeId']; ?> | <?php echo ucfirst($jobData['status']); ?></p>
        </div>
        <div class="header-actions">
            <button class="btn-secondary" id="editJob">
                <i class="fas fa-edit"></i>
                Edit Job
            </button>
            <button class="btn-primary" id="addVendor">
                <i class="fas fa-user-plus"></i>
                Add Vendor
            </button>
        </div>
    </div>

    <!-- Job Details Section -->
    <div class="job-details-section">
        <div class="section-header">
            <h3><i class="fas fa-info-circle"></i> Job Details</h3>
        </div>

        <div class="job-details-grid">
            <!-- Basic Information -->
            <div class="detail-card">
                <h4>Basic Information</h4>
                <div class="detail-item">
                    <span class="label">Store Name:</span>
                    <span class="value"><?php echo $jobData['storeName']; ?></span>
                </div>
                <div class="detail-item">
                    <span class="label">Job Type:</span>
                    <span class="value">
                        <span class="job-type-badge <?php echo $jobData['jobType']; ?>">
                            <?php echo ucfirst($jobData['jobType']); ?>
                        </span>
                    </span>
                </div>
                <div class="detail-item">
                    <span class="label">Status:</span>
                    <span class="value">
                        <span class="status-badge <?php echo $jobData['status']; ?>">
                            <?php echo ucfirst($jobData['status']); ?>
                        </span>
                    </span>
                </div>
                <div class="detail-item">
                    <span class="label">Created:</span>
                    <span class="value"><?php echo date('M d, Y g:i A', strtotime($jobData['createdDate'])); ?></span>
                </div>
            </div>

            <!-- Location Information -->
            <div class="detail-card">
                <h4>Location</h4>
                <div class="detail-item">
                    <span class="label">Address:</span>
                    <span class="value"><?php echo $jobData['address']; ?></span>
                </div>
                <div class="detail-item">
                    <span class="label">City:</span>
                    <span class="value"><?php echo $jobData['city']; ?></span>
                </div>
                <div class="detail-item">
                    <button class="btn-link" id="viewOnMap">
                        <i class="fas fa-map-marker-alt"></i>
                        View on Map
                    </button>
                </div>
            </div>

            <!-- SLA Information -->
            <div class="detail-card">
                <h4>SLA Information</h4>
                <div class="detail-item">
                    <span class="label">Deadline:</span>
                    <span class="value"><?php echo date('M d, Y g:i A', strtotime($jobData['slaDeadline'])); ?></span>
                </div>
                <div class="detail-item">
                    <span class="label">Time Remaining:</span>
                    <span class="value" id="timeRemaining">
                        <span class="countdown" data-deadline="<?php echo $jobData['slaDeadline']; ?>">
                            Loading...
                        </span>
                    </span>
                </div>
                <div class="detail-item">
                    <span class="label">SLA Status:</span>
                    <span class="value">
                        <span class="sla-status-badge" id="slaStatus">Calculating...</span>
                    </span>
                </div>
            </div>
        </div>

        <!-- Job Description -->
        <div class="detail-card full-width">
            <h4>Job Description</h4>
            <div class="job-description">
                <p><?php echo nl2br($jobData['jobDetail']); ?></p>
            </div>
        </div>

        <!-- Additional Notes -->
        <?php if (!empty($jobData['additionalNotes'])): ?>
            <div class="detail-card full-width">
                <h4>Additional Notes</h4>
                <div class="additional-notes">
                    <p><?php echo nl2br($jobData['additionalNotes']); ?></p>
                </div>
            </div>
        <?php endif; ?>

        <!-- Job Pictures -->
        <?php if (!empty($jobData['pictures'])): ?>
            <div class="detail-card full-width">
                <h4>Job Pictures</h4>
                <div class="job-pictures">
                    <?php foreach ($jobData['pictures'] as $picture): ?>
                        <div class="picture-item">
                            <img src="../assets/images/jobs/<?php echo $picture; ?>" alt="Job Picture"
                                onclick="openImageModal(this.src)">
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        <?php endif; ?>
    </div>

    <!-- Vendors Section -->
    <div class="vendors-section">
        <div class="section-header">
            <h3><i class="fas fa-users"></i> Assigned Vendors</h3>
            <span class="vendor-count"><?php echo count($vendors); ?> vendors assigned</span>
        </div>

        <div class="vendors-grid">
            <?php foreach ($vendors as $vendor): ?>
                <div class="vendor-card" data-vendor-id="<?php echo $vendor['id']; ?>">
                    <div class="vendor-header">
                        <div class="vendor-info">
                            <div class="vendor-avatar">
                                <img src="../assets/images/vendors/<?php echo $vendor['avatar']; ?>"
                                    alt="<?php echo $vendor['name']; ?>">
                            </div>
                            <div class="vendor-details">
                                <h4><?php echo $vendor['name']; ?></h4>
                                <p class="vendor-specialization"><?php echo $vendor['specialization']; ?></p>
                                <span class="vendor-status <?php echo $vendor['status']; ?>">
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
                        <div class="vendor-actions">
                            <button class="btn-icon" title="View Profile">
                                <i class="fas fa-user"></i>
                            </button>
                            <button class="btn-icon" title="Remove Vendor">
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
                            <i class="fas fa-calendar"></i>
                            <span>Assigned: <?php echo date('M d, Y', strtotime($vendor['assignedDate'])); ?></span>
                        </div>
                    </div>

                    <!-- Vendor Notes Section -->
                    <div class="vendor-chat">
                        <div class="chat-header">
                            <h5>Talk About Vendor <?php echo $vendor['name']; ?></h5>
                            <button class="btn-icon chat-toggle" title="Toggle Notes">
                                <i class="fas fa-chevron-down"></i>
                            </button>
                        </div>

                        <div class="chat-container" style="display: none;">
                            <div class="chat-messages" id="chatMessages-<?php echo $vendor['id']; ?>">
                                <!-- Sample notes about vendor -->
                                <div class="message admin-message">
                                    <div class="message-content">
                                        <p>Called <?php echo $vendor['name']; ?> today. He said he'll complete the <?php echo $vendor['specialization']; ?> work by Friday. Seems confident about the timeline.</p>
                                        <span class="message-time">2:30 PM</span>
                                    </div>
                                </div>
                                <div class="message vendor-message">
                                    <div class="message-content">
                                        <p>Spoke with <?php echo $vendor['name']; ?> on WhatsApp. He sent some sample work - looks good quality. Asked for 50% advance payment.</p>
                                        <span class="message-time">2:35 PM</span>
                                    </div>
                                </div>
                                
                                <div class="message admin-message">
                                    <div class="message-content">
                                        <p>Updated vendor status to "Visit Approved". He visited the site yesterday and confirmed he can handle the work.</p>
                                        <span class="message-time">2:40 PM</span>
                                    </div>
                                </div>
                                
                                <div class="message user-message">
                                    <div class="message-content">
                                        <p>Vendor completed the work today! Quality is excellent. Need to process payment now.</p>
                                        <span class="message-time">2:45 PM</span>
                                    </div>
                                </div>
                            </div>

                            <div class="chat-input">
                                <div class="input-group">
                                    <input type="text" class="chat-message-input" placeholder="Add note about <?php echo $vendor['name']; ?>..."
                                        data-vendor-id="<?php echo $vendor['id']; ?>">
                                    <button class="btn-icon attachment-btn" title="Add Attachment"
                                        data-vendor-id="<?php echo $vendor['id']; ?>">
                                        <i class="fas fa-paperclip"></i>
                                    </button>
                                    <button class="btn-icon send-message" data-vendor-id="<?php echo $vendor['id']; ?>">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                                <input type="file" class="chat-file-input" data-vendor-id="<?php echo $vendor['id']; ?>"
                                    multiple accept="image/*,.pdf,.doc,.docx,.txt" style="display: none;">
                            </div>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</div>

<!-- Image Modal -->
<div id="imageModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <img id="modalImage" src="" alt="Job Picture">
    </div>
</div>

<!-- Add Vendor Modal -->
<div id="addVendorModal" class="modal">
    <div class="modal-content vendor-form-modal">
        <div class="modal-header">
            <h3><i class="fas fa-user-plus"></i> Add New Vendor</h3>
            <span class="close" id="closeAddVendor">&times;</span>
        </div>

        <form id="addVendorForm" class="vendor-form">
            <div class="form-section">
                <div class="section-title">
                    <i class="fas fa-user"></i>
                    <span>Vendor Information</span>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="vendorName">Vendor Name *</label>
                        <input type="text" id="vendorName" name="vendorName" required>
                    </div>
                    <div class="form-group">
                        <label for="vendorPhone">Phone Number *</label>
                        <input type="tel" id="vendorPhone" name="vendorPhone" required>
                    </div>
                </div>

                <div class="form-group">
                    <label for="vendorEmail">Email Address *</label>
                    <input type="email" id="vendorEmail" name="vendorEmail" required>
                </div>

                <div class="form-group">
                    <label for="vendorSpecialization">Specialization *</label>
                    <select id="vendorSpecialization" name="vendorSpecialization" required>
                        <option value="">Select Specialization</option>
                        <option value="Frontend Development">Frontend Development</option>
                        <option value="Backend Development">Backend Development</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Database Admin">Database Admin</option>
                        <option value="DevOps Engineer">DevOps Engineer</option>
                        <option value="QA Tester">QA Tester</option>
                        <option value="Security Expert">Security Expert</option>
                        <option value="Mobile Developer">Mobile Developer</option>
                        <option value="System Architect">System Architect</option>
                        <option value="Project Manager">Project Manager</option>
                    </select>
                </div>
            </div>

            <div class="form-section">
                <div class="section-title">
                    <i class="fas fa-dollar-sign"></i>
                    <span>Quote Information</span>
                </div>

                <div class="form-group">
                    <label>Quote Type *</label>
                    <div class="radio-group">
                        <label class="radio-option">
                            <input type="radio" name="quoteType" value="free" checked>
                            <span class="radio-custom"></span>
                            <span class="radio-label">Free Quote</span>
                        </label>
                        <label class="radio-option">
                            <input type="radio" name="quoteType" value="paid">
                            <span class="radio-custom"></span>
                            <span class="radio-label">Paid Quote</span>
                        </label>
                    </div>
                </div>

                <div class="form-group" id="quoteAmountGroup" style="display: none;">
                    <label for="quoteAmount">Quote Amount *</label>
                    <div class="input-with-icon">
                        <i class="fas fa-dollar-sign"></i>
                        <input type="number" id="quoteAmount" name="quoteAmount" min="0" step="0.01" placeholder="0.00">
                    </div>
                </div>
            </div>

            <div class="form-section">
                <div class="section-title">
                    <i class="fas fa-calendar-alt"></i>
                    <span>Appointment Details</span>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="appointmentDate">Appointment Date *</label>
                        <input type="date" id="appointmentDate" name="appointmentDate" required>
                    </div>
                    <div class="form-group">
                        <label for="appointmentTime">Appointment Time *</label>
                        <input type="time" id="appointmentTime" name="appointmentTime" required>
                    </div>
                </div>

                <div class="form-group">
                    <label for="vendorPlatform">Vendor Platform (Optional)</label>
                    <input type="text" id="vendorPlatform" name="vendorPlatform"
                        placeholder="e.g., Upwork, Fiverr, Freelancer, etc.">
                </div>
            </div>

            <div class="form-actions">
                <button type="button" class="btn-secondary" id="cancelAddVendor">
                    <i class="fas fa-times"></i>
                    Cancel
                </button>
                <button type="submit" class="btn-primary">
                    <i class="fas fa-user-plus"></i>
                    Add Vendor
                </button>
            </div>
        </form>
    </div>
</div>

<!-- View Vendor Profile Modal -->
<div id="viewVendorModal" class="modal">
    <div class="modal-content vendor-profile-modal">
        <div class="modal-header">
            <h3><i class="fas fa-user"></i> Vendor Profile</h3>
            <span class="close" id="closeViewVendor">&times;</span>
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
                        <i class="fas fa-calendar"></i>
                        <span id="modalVendorAppointment">Appointment Date</span>
                    </div>
                    <div class="vendor-detail-row" id="modalVendorPlatformRow" style="display: none;">
                        <i class="fas fa-globe"></i>
                        <span id="modalVendorPlatform">Platform</span>
                    </div>
                </div>
            </div>

            <!-- Quote Information -->
            <div class="vendor-profile-section">
                <div class="section-title">
                    <i class="fas fa-dollar-sign"></i>
                    <span>Quote Information</span>
                </div>
                <div class="vendor-profile-details">
                    <div class="vendor-detail-row">
                        <i class="fas fa-tag"></i>
                        <span id="modalVendorQuoteType">Quote Type</span>
                    </div>
                    <div class="vendor-detail-row" id="modalVendorQuoteAmountRow" style="display: none;">
                        <i class="fas fa-dollar-sign"></i>
                        <span id="modalVendorQuoteAmount">Quote Amount</span>
                    </div>
                </div>
            </div>

            <!-- Chat Attachments -->
            <div class="vendor-profile-section">
                <div class="section-title">
                    <i class="fas fa-paperclip"></i>
                    <span>Chat Attachments</span>
                </div>
                <div class="vendor-attachments-container" id="modalVendorAttachments">
                    <div class="vendor-no-attachments">
                        <i class="fas fa-inbox"></i>
                        <p>No attachments found in chat</p>
                    </div>
                </div>
            </div>

            <!-- Profile Actions -->
            <div class="vendor-profile-actions">
                <button class="btn-secondary" id="editVendorProfile">
                    <i class="fas fa-edit"></i>
                    Edit Profile
                </button>
                <button class="btn-primary" id="contactVendor">
                    <i class="fas fa-comments"></i>
                    Open Chat
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Edit Job Modal -->
<div id="editJobModal" class="modal">
    <div class="modal-content edit-job-modal">
        <div class="modal-header">
            <h3><i class="fas fa-edit"></i> Edit Job</h3>
            <span class="close" id="closeEditJob">&times;</span>
        </div>

        <form id="editJobForm" class="edit-job-form">
            <div class="form-section">
                <div class="section-title">
                    <i class="fas fa-store"></i>
                    <span>Store Information</span>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="editStoreName">Store Name *</label>
                        <input type="text" id="editStoreName" name="storeName" required>
                    </div>
                    <div class="form-group">
                        <label for="editJobType">Job Type *</label>
                        <select id="editJobType" name="jobType" required>
                            <option value="">Select Job Type</option>
                            <option value="Website Development">Website Development</option>
                            <option value="Mobile App Development">Mobile App Development</option>
                            <option value="UI/UX Design">UI/UX Design</option>
                            <option value="Database Design">Database Design</option>
                            <option value="System Integration">System Integration</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Consultation">Consultation</option>
                            <option value="Training">Training</option>
                            <option value="Testing">Testing</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label for="editAddress">Address *</label>
                    <textarea id="editAddress" name="address" rows="3" required
                        placeholder="Enter complete address"></textarea>
                </div>
            </div>

            <div class="form-section">
                <div class="section-title">
                    <i class="fas fa-tasks"></i>
                    <span>Job Details</span>
                </div>

                <div class="form-group">
                    <label for="editJobDetail">Job Detail *</label>
                    <textarea id="editJobDetail" name="jobDetail" rows="5" required
                        placeholder="Describe the job requirements and specifications"></textarea>
                </div>
            </div>

            <div class="form-section">
                <div class="section-title">
                    <i class="fas fa-clock"></i>
                    <span>Service Level Agreement (SLA)</span>
                </div>

                <div class="form-group">
                    <label for="editJobSLA">SLA Deadline *</label>
                    <input type="datetime-local" id="editJobSLA" name="jobSLA" required>
                </div>
            </div>

            <div class="form-section">
                <div class="section-title">
                    <i class="fas fa-images"></i>
                    <span>Job Pictures</span>
                </div>

                <div class="form-group">
                    <label for="editJobPictures">Add/Update Pictures</label>
                    <div class="file-upload-area" id="editFileUploadArea">
                        <input type="file" id="editJobPictures" name="jobPictures[]" multiple accept="image/*"
                            class="file-input">
                        <div class="file-upload-content">
                            <i class="fas fa-cloud-upload-alt"></i>
                            <p>Drag & drop images here or click to browse</p>
                            <span>Supports: JPG, PNG, GIF (Max 5MB each)</span>
                        </div>
                    </div>
                    <div class="image-preview-grid" id="editImagePreview"></div>
                </div>
            </div>

            <div class="form-section">
                <div class="section-title">
                    <i class="fas fa-sticky-note"></i>
                    <span>Additional Notes</span>
                </div>

                <div class="form-group">
                    <label for="editAdditionalNotes">Additional Notes</label>
                    <textarea id="editAdditionalNotes" name="additionalNotes" rows="4"
                        placeholder="Any additional information or special requirements"></textarea>
                </div>
            </div>

            <div class="form-actions">
                <button type="button" class="btn-secondary" id="cancelEditJob">
                    <i class="fas fa-times"></i>
                    Cancel
                </button>
                <button type="submit" class="btn-primary">
                    <i class="fas fa-save"></i>
                    Update Job
                </button>
            </div>
        </form>
    </div>
</div>

<?php include 'includes/footer.php'; ?>