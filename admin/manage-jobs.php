<?php
$page_title = 'Manage Jobs';
include 'includes/header.php';
?>

        <!-- Manage Jobs Content -->
        <div class="dashboard-content">
            <!-- Page Header -->
            <div class="page-header">
                <div class="header-content">
                    <h2>Manage Jobs</h2>
                    <p>View and manage all jobs in the system</p>
                </div>
                <div class="header-actions">
                    <a href="add-job.php" class="btn-primary">
                        <i class="fas fa-plus"></i>
                        Add New Job
                    </a>
                </div>
            </div>

            <!-- Filters and Search -->
            <div class="filters-section">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" id="jobSearch" placeholder="Search jobs by store name, job type, or address...">
                </div>
                
                <div class="filter-controls">
                    <select id="statusFilter" class="filter-select">
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    
                    <select id="typeFilter" class="filter-select">
                        <option value="">All Types</option>
                        <option value="development">Development</option>
                        <option value="design">Design</option>
                        <option value="marketing">Marketing</option>
                        <option value="consulting">Consulting</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="installation">Installation</option>
                        <option value="repair">Repair</option>
                        <option value="other">Other</option>
                    </select>
                    
                    <select id="slaFilter" class="filter-select">
                        <option value="">All SLA</option>
                        <option value="overdue">Overdue</option>
                        <option value="due-today">Due Today</option>
                        <option value="due-week">Due This Week</option>
                        <option value="upcoming">Upcoming</option>
                    </select>
                </div>
            </div>

            <!-- Jobs Table -->
            <div class="jobs-table-container">
                <div class="table-header">
                    <div class="table-stats">
                        <span class="total-jobs">Total: <strong id="totalJobs">24</strong></span>
                        <span class="filtered-jobs">Showing: <strong id="filteredJobs">24</strong></span>
                    </div>
                    <div class="table-actions">
                        <button class="btn-secondary" id="exportJobs">
                            <i class="fas fa-download"></i>
                            Export
                        </button>
                        <button class="btn-secondary" id="bulkActions">
                            <i class="fas fa-tasks"></i>
                            Bulk Actions
                        </button>
                    </div>
                </div>

                <div class="jobs-table">
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <input type="checkbox" id="selectAll">
                                </th>
                                <th>Store Name</th>
                                <th>Job Type</th>
                                <th>Address</th>
                                <th>SLA Deadline</th>
                                <th>Status</th>
                                <th>Vendors</th>
                                <th>Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="jobsTableBody">
                            <!-- Sample Jobs Data -->
                            <tr class="job-row" data-id="1">
                                <td>
                                    <input type="checkbox" class="job-checkbox">
                                </td>
                                <td>
                                    <div class="store-info">
                                        <h4>Tech Solutions Inc.</h4>
                                        <span class="store-id">#JOB-001</span>
                                    </div>
                                </td>
                                <td>
                                    <span class="job-type development">Development</span>
                                </td>
                                <td>
                                    <div class="address-info">
                                        <p>123 Main Street, Downtown</p>
                                        <span>New York, NY 10001</span>
                                    </div>
                                </td>
                                <td>
                                    <div class="sla-info">
                                        <span class="sla-date">Dec 15, 2024</span>
                                        <span class="sla-time">2:30 PM</span>
                                        <span class="sla-status overdue">Overdue</span>
                                    </div>
                                </td>
                                <td>
                                    <span class="status-badge pending">Pending</span>
                                </td>
                                <td>
                                    <div class="vendors-info">
                                        <span class="vendor-count">3 vendors</span>
                                        <button class="view-vendors" title="View Vendors">
                                            <i class="fas fa-users"></i>
                                        </button>
                                    </div>
                                </td>
                                <td>
                                    <div class="created-info">
                                        <span class="created-date">Dec 10, 2024</span>
                                        <span class="created-time">10:30 AM</span>
                                    </div>
                                </td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="btn-icon" title="View Details">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button class="btn-icon" title="Edit Job">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="btn-icon" title="Add Vendor">
                                            <i class="fas fa-user-plus"></i>
                                        </button>
                                        <button class="btn-icon dropdown-toggle" title="More Actions">
                                            <i class="fas fa-ellipsis-v"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr class="job-row" data-id="2">
                                <td>
                                    <input type="checkbox" class="job-checkbox">
                                </td>
                                <td>
                                    <div class="store-info">
                                        <h4>Creative Agency</h4>
                                        <span class="store-id">#JOB-002</span>
                                    </div>
                                </td>
                                <td>
                                    <span class="job-type design">Design</span>
                                </td>
                                <td>
                                    <div class="address-info">
                                        <p>456 Design Avenue</p>
                                        <span>Los Angeles, CA 90210</span>
                                    </div>
                                </td>
                                <td>
                                    <div class="sla-info">
                                        <span class="sla-date">Dec 20, 2024</span>
                                        <span class="sla-time">5:00 PM</span>
                                        <span class="sla-status upcoming">Upcoming</span>
                                    </div>
                                </td>
                                <td>
                                    <span class="status-badge in-progress">In Progress</span>
                                </td>
                                <td>
                                    <div class="vendors-info">
                                        <span class="vendor-count">2 vendors</span>
                                        <button class="view-vendors" title="View Vendors">
                                            <i class="fas fa-users"></i>
                                        </button>
                                    </div>
                                </td>
                                <td>
                                    <div class="created-info">
                                        <span class="created-date">Dec 12, 2024</span>
                                        <span class="created-time">3:15 PM</span>
                                    </div>
                                </td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="btn-icon" title="View Details">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button class="btn-icon" title="Edit Job">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="btn-icon" title="Add Vendor">
                                            <i class="fas fa-user-plus"></i>
                                        </button>
                                        <button class="btn-icon dropdown-toggle" title="More Actions">
                                            <i class="fas fa-ellipsis-v"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr class="job-row" data-id="3">
                                <td>
                                    <input type="checkbox" class="job-checkbox">
                                </td>
                                <td>
                                    <div class="store-info">
                                        <h4>StartupXYZ</h4>
                                        <span class="store-id">#JOB-003</span>
                                    </div>
                                </td>
                                <td>
                                    <span class="job-type marketing">Marketing</span>
                                </td>
                                <td>
                                    <div class="address-info">
                                        <p>789 Innovation Drive</p>
                                        <span>San Francisco, CA 94105</span>
                                    </div>
                                </td>
                                <td>
                                    <div class="sla-info">
                                        <span class="sla-date">Dec 18, 2024</span>
                                        <span class="sla-time">1:00 PM</span>
                                        <span class="sla-status due-today">Due Today</span>
                                    </div>
                                </td>
                                <td>
                                    <span class="status-badge completed">Completed</span>
                                </td>
                                <td>
                                    <div class="vendors-info">
                                        <span class="vendor-count">1 vendor</span>
                                        <button class="view-vendors" title="View Vendors">
                                            <i class="fas fa-users"></i>
                                        </button>
                                    </div>
                                </td>
                                <td>
                                    <div class="created-info">
                                        <span class="created-date">Dec 8, 2024</span>
                                        <span class="created-time">9:45 AM</span>
                                    </div>
                                </td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="btn-icon" title="View Details">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button class="btn-icon" title="Edit Job">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="btn-icon" title="Add Vendor">
                                            <i class="fas fa-user-plus"></i>
                                        </button>
                                        <button class="btn-icon dropdown-toggle" title="More Actions">
                                            <i class="fas fa-ellipsis-v"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div class="pagination">
                    <div class="pagination-info">
                        <span>Showing 1-10 of 24 jobs</span>
                    </div>
                    <div class="pagination-controls">
                        <button class="pagination-btn" disabled>
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <button class="pagination-btn active">1</button>
                        <button class="pagination-btn">2</button>
                        <button class="pagination-btn">3</button>
                        <button class="pagination-btn">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

<?php include 'includes/footer.php'; ?>
