document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const searchInput = document.getElementById('jobSearch');
    const statusFilter = document.getElementById('statusFilter');
    const typeFilter = document.getElementById('typeFilter');
    const slaFilter = document.getElementById('slaFilter');
    const selectAllCheckbox = document.getElementById('selectAll');
    const jobCheckboxes = document.querySelectorAll('.job-checkbox');
    const jobRows = document.querySelectorAll('.job-row');
    const totalJobsSpan = document.getElementById('totalJobs');
    const filteredJobsSpan = document.getElementById('filteredJobs');
    const exportBtn = document.getElementById('exportJobs');
    const bulkActionsBtn = document.getElementById('bulkActions');
    
    // Sample jobs data (in real app, this would come from backend)
    let jobsData = [
        {
            id: 1,
            storeName: 'Tech Solutions Inc.',
            storeId: 'JOB-001',
            jobType: 'development',
            address: '123 Main Street, Downtown',
            city: 'New York, NY 10001',
            slaDeadline: '2024-12-15T14:30:00',
            status: 'pending',
            vendorCount: 3,
            createdDate: '2024-12-10T10:30:00',
            slaStatus: 'overdue'
        },
        {
            id: 2,
            storeName: 'Creative Agency',
            storeId: 'JOB-002',
            jobType: 'design',
            address: '456 Design Avenue',
            city: 'Los Angeles, CA 90210',
            slaDeadline: '2024-12-20T17:00:00',
            status: 'in-progress',
            vendorCount: 2,
            createdDate: '2024-12-12T15:15:00',
            slaStatus: 'upcoming'
        },
        {
            id: 3,
            storeName: 'StartupXYZ',
            storeId: 'JOB-003',
            jobType: 'marketing',
            address: '789 Innovation Drive',
            city: 'San Francisco, CA 94105',
            slaDeadline: '2024-12-18T13:00:00',
            status: 'completed',
            vendorCount: 1,
            createdDate: '2024-12-08T09:45:00',
            slaStatus: 'due-today'
        }
    ];
    
    let filteredJobs = [...jobsData];
    
    // Initialize
    updateJobCounts();
    setupEventListeners();
    
    function setupEventListeners() {
        // Search functionality
        if (searchInput) {
            searchInput.addEventListener('input', debounce(filterJobs, 300));
        }
        
        // Filter functionality
        if (statusFilter) {
            statusFilter.addEventListener('change', filterJobs);
        }
        
        if (typeFilter) {
            typeFilter.addEventListener('change', filterJobs);
        }
        
        if (slaFilter) {
            slaFilter.addEventListener('change', filterJobs);
        }
        
        // Select all functionality
        if (selectAllCheckbox) {
            selectAllCheckbox.addEventListener('change', function() {
                const isChecked = this.checked;
                jobCheckboxes.forEach(checkbox => {
                    if (checkbox.closest('.job-row').style.display !== 'none') {
                        checkbox.checked = isChecked;
                    }
                });
                updateBulkActionsVisibility();
            });
        }
        
        // Individual checkbox functionality
        jobCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                updateSelectAllState();
                updateBulkActionsVisibility();
            });
        });
        
        // Action buttons
        if (exportBtn) {
            exportBtn.addEventListener('click', exportJobs);
        }
        
        if (bulkActionsBtn) {
            bulkActionsBtn.addEventListener('click', showBulkActions);
        }
        
        // Row action buttons
        setupRowActions();
    }
    
    function filterJobs() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const statusValue = statusFilter ? statusFilter.value : '';
        const typeValue = typeFilter ? typeFilter.value : '';
        const slaValue = slaFilter ? slaFilter.value : '';
        
        filteredJobs = jobsData.filter(job => {
            // Search filter
            const searchMatch = !searchTerm || 
                job.storeName.toLowerCase().includes(searchTerm) ||
                job.jobType.toLowerCase().includes(searchTerm) ||
                job.address.toLowerCase().includes(searchTerm) ||
                job.city.toLowerCase().includes(searchTerm);
            
            // Status filter
            const statusMatch = !statusValue || job.status === statusValue;
            
            // Type filter
            const typeMatch = !typeValue || job.jobType === typeValue;
            
            // SLA filter
            const slaMatch = !slaValue || job.slaStatus === slaValue;
            
            return searchMatch && statusMatch && typeMatch && slaMatch;
        });
        
        updateTableDisplay();
        updateJobCounts();
    }
    
    function updateTableDisplay() {
        jobRows.forEach((row, index) => {
            const jobId = parseInt(row.dataset.id);
            const isVisible = filteredJobs.some(job => job.id === jobId);
            
            if (isVisible) {
                row.style.display = '';
                row.classList.add('fade-in');
            } else {
                row.style.display = 'none';
                row.classList.remove('fade-in');
            }
        });
    }
    
    function updateJobCounts() {
        if (totalJobsSpan) {
            totalJobsSpan.textContent = jobsData.length;
        }
        if (filteredJobsSpan) {
            filteredJobsSpan.textContent = filteredJobs.length;
        }
    }
    
    function updateSelectAllState() {
        const visibleCheckboxes = Array.from(jobCheckboxes).filter(checkbox => 
            checkbox.closest('.job-row').style.display !== 'none'
        );
        const checkedVisibleCheckboxes = visibleCheckboxes.filter(checkbox => checkbox.checked);
        
        if (selectAllCheckbox) {
            selectAllCheckbox.checked = checkedVisibleCheckboxes.length === visibleCheckboxes.length && visibleCheckboxes.length > 0;
            selectAllCheckbox.indeterminate = checkedVisibleCheckboxes.length > 0 && checkedVisibleCheckboxes.length < visibleCheckboxes.length;
        }
    }
    
    function updateBulkActionsVisibility() {
        const checkedJobs = Array.from(jobCheckboxes).filter(checkbox => checkbox.checked);
        if (bulkActionsBtn) {
            bulkActionsBtn.style.display = checkedJobs.length > 0 ? 'inline-flex' : 'none';
        }
    }
    
    function setupRowActions() {
        // View details buttons
        document.querySelectorAll('.btn-icon[title="View Details"]').forEach(btn => {
            btn.addEventListener('click', function() {
                const jobId = this.closest('.job-row').dataset.id;
                viewJobDetails(jobId);
            });
        });
        
        // Edit job buttons
        document.querySelectorAll('.btn-icon[title="Edit Job"]').forEach(btn => {
            btn.addEventListener('click', function() {
                const jobId = this.closest('.job-row').dataset.id;
                editJob(jobId);
            });
        });
        
        // Add vendor buttons
        document.querySelectorAll('.btn-icon[title="Add Vendor"]').forEach(btn => {
            btn.addEventListener('click', function() {
                const jobId = this.closest('.job-row').dataset.id;
                addVendorToJob(jobId);
            });
        });
        
        // View vendors buttons
        document.querySelectorAll('.view-vendors').forEach(btn => {
            btn.addEventListener('click', function() {
                const jobId = this.closest('.job-row').dataset.id;
                viewJobVendors(jobId);
            });
        });
        
        // Dropdown toggle buttons
        document.querySelectorAll('.dropdown-toggle').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleDropdown(this);
            });
        });
    }
    
    function viewJobDetails(jobId) {
        window.themeManager.showNotification(`Viewing details for job ${jobId}`, 'info');
        // In real app, redirect to job details page
        // window.location.href = `job-details.php?id=${jobId}`;
    }
    
    function editJob(jobId) {
        window.themeManager.showNotification(`Editing job ${jobId}`, 'info');
        // In real app, redirect to edit job page
        // window.location.href = `edit-job.php?id=${jobId}`;
    }
    
    function addVendorToJob(jobId) {
        window.themeManager.showNotification(`Adding vendor to job ${jobId}`, 'info');
        // In real app, open add vendor modal or redirect
        // openAddVendorModal(jobId);
    }
    
    function viewJobVendors(jobId) {
        window.themeManager.showNotification(`Viewing vendors for job ${jobId}`, 'info');
        // In real app, open vendors modal or redirect
        // openVendorsModal(jobId);
    }
    
    function toggleDropdown(button) {
        // Remove active class from all other dropdowns
        document.querySelectorAll('.dropdown-toggle.active').forEach(btn => {
            if (btn !== button) {
                btn.classList.remove('active');
            }
        });
        
        // Toggle current dropdown
        button.classList.toggle('active');
    }
    
    function exportJobs() {
        const selectedJobs = getSelectedJobs();
        if (selectedJobs.length === 0) {
            window.themeManager.showNotification('Please select jobs to export', 'warning');
            return;
        }
        
        window.themeManager.showNotification(`Exporting ${selectedJobs.length} jobs...`, 'info');
        
        // In real app, implement actual export functionality
        setTimeout(() => {
            window.themeManager.showNotification('Jobs exported successfully!', 'success');
        }, 2000);
    }
    
    function showBulkActions() {
        const selectedJobs = getSelectedJobs();
        if (selectedJobs.length === 0) {
            window.themeManager.showNotification('No jobs selected', 'warning');
            return;
        }
        
        // Show bulk actions menu
        const actions = [
            { label: 'Mark as In Progress', action: () => bulkUpdateStatus(selectedJobs, 'in-progress') },
            { label: 'Mark as Completed', action: () => bulkUpdateStatus(selectedJobs, 'completed') },
            { label: 'Cancel Jobs', action: () => bulkUpdateStatus(selectedJobs, 'cancelled') },
            { label: 'Delete Jobs', action: () => bulkDeleteJobs(selectedJobs) }
        ];
        
        showBulkActionsMenu(actions);
    }
    
    function getSelectedJobs() {
        return Array.from(jobCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.closest('.job-row').dataset.id);
    }
    
    function bulkUpdateStatus(jobIds, status) {
        window.themeManager.showNotification(`Updating ${jobIds.length} jobs to ${status}...`, 'info');
        
        // In real app, make API call to update status
        setTimeout(() => {
            window.themeManager.showNotification(`Successfully updated ${jobIds.length} jobs`, 'success');
            
            // Add notifications for status updates
            if (window.notificationManager) {
                jobIds.forEach(jobId => {
                    window.notificationManager.addNotification({
                        type: 'status_update',
                        title: 'Job Status Updated',
                        message: `Job status has been updated to "${status}"`,
                        data: { 
                            jobId: jobId,
                            status: status
                        }
                    });
                });
            }
            
            // Refresh the page or update the UI
            location.reload();
        }, 1500);
    }
    
    function bulkDeleteJobs(jobIds) {
        if (confirm(`Are you sure you want to delete ${jobIds.length} jobs? This action cannot be undone.`)) {
            window.themeManager.showNotification(`Deleting ${jobIds.length} jobs...`, 'info');
            
            // In real app, make API call to delete jobs
            setTimeout(() => {
                window.themeManager.showNotification(`Successfully deleted ${jobIds.length} jobs`, 'success');
                // Refresh the page or update the UI
                location.reload();
            }, 1500);
        }
    }
    
    function showBulkActionsMenu(actions) {
        // Create and show bulk actions dropdown
        const menu = document.createElement('div');
        menu.className = 'bulk-actions-menu';
        menu.innerHTML = actions.map(action => 
            `<button class="bulk-action-item">${action.label}</button>`
        ).join('');
        
        // Position menu near bulk actions button
        const button = document.getElementById('bulkActions');
        const rect = button.getBoundingClientRect();
        menu.style.position = 'absolute';
        menu.style.top = `${rect.bottom + 5}px`;
        menu.style.right = '25px';
        menu.style.zIndex = '1000';
        
        document.body.appendChild(menu);
        
        // Add click handlers
        menu.querySelectorAll('.bulk-action-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                actions[index].action();
                document.body.removeChild(menu);
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function closeMenu(e) {
            if (!menu.contains(e.target) && !button.contains(e.target)) {
                document.body.removeChild(menu);
                document.removeEventListener('click', closeMenu);
            }
        });
    }
    
    // Utility function for debouncing
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown-toggle')) {
            document.querySelectorAll('.dropdown-toggle.active').forEach(btn => {
                btn.classList.remove('active');
            });
        }
    });
    
    // Add fade-in animation for filtered rows
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            animation: fadeIn 0.3s ease-in;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .bulk-actions-menu {
            background: var(--card-bg);
            border: 1px solid var(--input-border);
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        
        .bulk-action-item {
            display: block;
            width: 100%;
            padding: 12px 16px;
            border: none;
            background: none;
            color: var(--text-primary);
            text-align: left;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .bulk-action-item:hover {
            background: var(--input-bg);
            color: var(--primary-medium);
        }
    `;
    document.head.appendChild(style);
});
