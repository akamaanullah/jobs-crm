<?php
$page_title = 'Manage Requests';
include 'includes/header.php';

// Sample requests data (in real app, this would come from database)
$requests = [
    [
        'id' => 1,
        'type' => 'visit_approval',
        'status' => 'pending',
        'user_name' => 'Ahmed Khan',
        'user_email' => 'ahmed.khan@email.com',
        'vendor_name' => 'John Smith',
        'vendor_specialization' => 'Frontend Development',
        'job_name' => 'Tech Solutions Website',
        'job_id' => 'JOB-001',
        'request_date' => '2024-12-15T10:30:00',
        'description' => 'Vendor has completed the initial visit and assessment. Requesting approval to proceed with the project.',
        'user_message' => 'Hi admin, I met with John Smith today. He seems very professional and has good experience. Please approve his visit so we can start the work.',
        'admin_response' => '',
        'attachments' => ['visit_report.pdf', 'vendor_photos.jpg']
    ],
    [
        'id' => 2,
        'type' => 'final_approval',
        'status' => 'pending',
        'user_name' => 'Sarah Johnson',
        'user_email' => 'sarah.johnson@email.com',
        'vendor_name' => 'Mike Wilson',
        'vendor_specialization' => 'UI/UX Design',
        'job_name' => 'E-commerce Mobile App',
        'job_id' => 'JOB-002',
        'request_date' => '2024-12-15T11:15:00',
        'description' => 'Vendor has completed all requirements and delivered the final design. Requesting final approval.',
        'user_message' => 'Mike has completed the UI/UX design work. The designs look amazing and meet all our requirements. Please give final approval.',
        'admin_response' => '',
        'attachments' => ['final_designs.zip', 'design_specs.pdf']
    ],
    [
        'id' => 3,
        'type' => 'payment_request',
        'status' => 'pending',
        'user_name' => 'David Brown',
        'user_email' => 'david.brown@email.com',
        'vendor_name' => 'Emily Davis',
        'vendor_specialization' => 'Database Admin',
        'job_name' => 'Inventory Management System',
        'job_id' => 'JOB-003',
        'request_date' => '2024-12-15T12:00:00',
        'description' => 'Vendor has completed the work and is requesting payment. All deliverables have been received.',
        'user_message' => 'Emily has completed the database setup and configuration. Everything is working perfectly. Please process the payment.',
        'admin_response' => '',
        'attachments' => ['database_docs.pdf', 'test_results.pdf']
    ],
    [
        'id' => 4,
        'type' => 'visit_approval',
        'status' => 'approved',
        'user_name' => 'Lisa Anderson',
        'user_email' => 'lisa.anderson@email.com',
        'vendor_name' => 'Robert Taylor',
        'vendor_specialization' => 'Security Expert',
        'job_name' => 'Banking Security System',
        'job_id' => 'JOB-004',
        'request_date' => '2024-12-14T15:30:00',
        'description' => 'Vendor visit approved. Security assessment completed successfully.',
        'user_message' => 'Robert conducted a thorough security assessment. His expertise is exactly what we need for this project.',
        'admin_response' => 'Approved! Robert has excellent credentials and the security assessment looks comprehensive.',
        'attachments' => ['security_report.pdf']
    ],
    [
        'id' => 5,
        'type' => 'final_approval',
        'status' => 'rejected',
        'user_name' => 'Michael Clark',
        'user_email' => 'michael.clark@email.com',
        'vendor_name' => 'Jennifer White',
        'vendor_specialization' => 'Mobile Developer',
        'job_name' => 'Fitness App Development',
        'job_id' => 'JOB-005',
        'request_date' => '2024-12-14T16:45:00',
        'description' => 'Final approval rejected due to incomplete deliverables.',
        'user_message' => 'Jennifer has completed the mobile app development. Please review and approve.',
        'admin_response' => 'Rejected: The app is missing several key features mentioned in the requirements. Please ask Jennifer to complete all features before resubmitting.',
        'attachments' => ['app_demo.mp4', 'feature_list.pdf']
    ]
];

// Get request type label
function getRequestTypeLabel($type) {
    switch($type) {
        case 'visit_approval':
            return 'Visit Approval';
        case 'final_approval':
            return 'Final Approval';
        case 'payment_request':
            return 'Payment Request';
        default:
            return ucfirst($type);
    }
}

// Get status badge class
function getStatusBadgeClass($status) {
    switch($status) {
        case 'pending':
            return 'pending';
        case 'approved':
            return 'approved';
        case 'rejected':
            return 'rejected';
        default:
            return 'pending';
    }
}
?>

<!-- Requests Content -->
<div class="dashboard-content">
    <!-- Page Header -->
    <div class="page-header">
        <div class="header-content">
            <h2>Manage Requests</h2>
            <p>Review and respond to user requests for vendor approvals and payments</p>
        </div>
    </div>

    <!-- Request Tabs -->
    <div class="request-tabs">
        <button class="tab-btn active" data-tab="pending">
            <i class="fas fa-clock"></i>
            <span>Pending</span>
            <span class="tab-count" id="pendingCount">0</span>
        </button>
        <button class="tab-btn" data-tab="approved">
            <i class="fas fa-check-circle"></i>
            <span>Approved</span>
            <span class="tab-count" id="approvedCount">0</span>
        </button>
        <button class="tab-btn" data-tab="rejected">
            <i class="fas fa-times-circle"></i>
            <span>Rejected</span>
            <span class="tab-count" id="rejectedCount">0</span>
        </button>
    </div>

    <!-- Filter Section -->
    <div class="filter-section">
        <div class="filter-group">
            <select id="typeFilter" class="form-control">
                <option value="">All Types</option>
                <option value="visit_approval">Visit Approval</option>
                <option value="final_approval">Final Approval</option>
                <option value="payment_request">Payment Request</option>
            </select>
        </div>
    </div>

    <!-- Requests Grid -->
    <div class="requests-grid" id="requestsGrid">
        <?php foreach ($requests as $request): ?>
            <div class="request-card" data-request-id="<?php echo $request['id']; ?>" 
                 data-status="<?php echo $request['status']; ?>" 
                 data-type="<?php echo $request['type']; ?>">
                
                <!-- Request Header -->
                <div class="request-header">
                    <div class="request-info">
                        <div class="request-type-badge <?php echo $request['type']; ?>">
                            <i class="fas fa-<?php echo $request['type'] === 'visit_approval' ? 'eye' : ($request['type'] === 'final_approval' ? 'star' : 'dollar-sign'); ?>"></i>
                            <?php echo getRequestTypeLabel($request['type']); ?>
                        </div>
                        <div class="request-status-badge <?php echo getStatusBadgeClass($request['status']); ?>">
                            <?php echo ucfirst($request['status']); ?>
                        </div>
                    </div>
                    <div class="request-date">
                        <?php echo date('M d, Y g:i A', strtotime($request['request_date'])); ?>
                    </div>
                </div>

                <!-- Request Details -->
                <div class="request-details">
                    <div class="detail-row">
                        <span class="label">User:</span>
                        <span class="value"><?php echo $request['user_name']; ?></span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Vendor:</span>
                        <span class="value"><?php echo $request['vendor_name']; ?> (<?php echo $request['vendor_specialization']; ?>)</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Job:</span>
                        <span class="value"><?php echo $request['job_name']; ?> (<?php echo $request['job_id']; ?>)</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Description:</span>
                        <span class="value"><?php echo $request['description']; ?></span>
                    </div>
                </div>

                <!-- Attachments Button -->
                <?php if (!empty($request['attachments'])): ?>
                    <div class="attachments-section">
                        <button class="btn-secondary view-attachments" data-request-id="<?php echo $request['id']; ?>">
                            <i class="fas fa-paperclip"></i>
                            View Attachments (<?php echo count($request['attachments']); ?>)
                        </button>
                    </div>
                <?php endif; ?>

                <!-- Admin Response -->
                <?php if (!empty($request['admin_response'])): ?>
                    <div class="admin-response-section">
                        <h6>Admin Response:</h6>
                        <div class="response-content">
                            <p><?php echo $request['admin_response']; ?></p>
                        </div>
                    </div>
                <?php endif; ?>

                <!-- Action Buttons -->
                <div class="request-actions">
                    <?php if ($request['status'] === 'pending'): ?>
                        <button class="btn-success approve-request" data-request-id="<?php echo $request['id']; ?>">
                            <i class="fas fa-check"></i>
                            Approve
                        </button>
                        <button class="btn-danger reject-request" data-request-id="<?php echo $request['id']; ?>">
                            <i class="fas fa-times"></i>
                            Reject
                        </button>
                    <?php else: ?>
                        <span class="status-message">
                            <?php echo $request['status'] === 'approved' ? 'Request approved' : 'Request rejected'; ?>
                        </span>
                    <?php endif; ?>
                    
                    <button class="btn-primary chat-with-user" data-request-id="<?php echo $request['id']; ?>">
                        <i class="fas fa-comments"></i>
                        Chat with User
                    </button>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</div>

<!-- Chat Modal -->
<div id="chatModal" class="modal">
    <div class="modal-content request-chat-modal">
        <div class="modal-header">
            <h3><i class="fas fa-comments"></i> Chat with User</h3>
            <span class="close" id="closeChat">&times;</span>
        </div>
        
        <div class="request-chat-container">
            <div class="request-chat-messages" id="chatMessages">
                <!-- Chat messages will be loaded here -->
            </div>
            
            <div class="request-chat-input">
                <div class="input-group">
                    <input type="text" id="chatMessageInput" placeholder="Type your message...">
                    <button class="btn-icon" id="sendMessage">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Attachments Modal -->
<div id="attachmentsModal" class="modal">
    <div class="modal-content attachments-modal">
        <div class="modal-header">
            <h3><i class="fas fa-paperclip"></i> Request Attachments</h3>
            <span class="close" id="closeAttachments">&times;</span>
        </div>
        
        <div class="attachments-content">
            <div class="attachments-list" id="attachmentsList">
                <!-- Attachments will be loaded here -->
            </div>
        </div>
    </div>
</div>



<?php include 'includes/footer.php'; ?>
