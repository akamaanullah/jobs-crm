// User Jobs JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeUserJobs();
});

function initializeUserJobs() {
    setupJobSearch();
    setupJobFilter();
    setupJobAnimations();
}

function setupJobSearch() {
    const searchInput = document.getElementById('userJobSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterJobs(searchTerm, getCurrentStatusFilter());
        });
    }
}

function setupJobFilter() {
    const statusFilter = document.getElementById('userStatusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            const status = this.value;
            const searchTerm = getCurrentSearchTerm();
            filterJobs(searchTerm, status);
        });
    }
}

function getCurrentSearchTerm() {
    const searchInput = document.getElementById('userJobSearch');
    return searchInput ? searchInput.value.toLowerCase() : '';
}

function getCurrentStatusFilter() {
    const statusFilter = document.getElementById('userStatusFilter');
    return statusFilter ? statusFilter.value : '';
}

function filterJobs(searchTerm, statusFilter) {
    const jobCards = document.querySelectorAll('.user-job-card');
    const jobsList = document.getElementById('userJobsList');
    const noJobsMessage = document.getElementById('userNoJobs');
    
    let visibleJobs = 0;
    
    jobCards.forEach(card => {
        const jobTitle = card.querySelector('.user-job-title h3').textContent.toLowerCase();
        const jobStatus = card.getAttribute('data-status');
        
        const matchesSearch = jobTitle.includes(searchTerm);
        const matchesStatus = !statusFilter || jobStatus === statusFilter;
        
        if (matchesSearch && matchesStatus) {
            card.style.display = 'block';
            visibleJobs++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show/hide no jobs message
    if (visibleJobs === 0) {
        jobsList.style.display = 'none';
        noJobsMessage.style.display = 'block';
    } else {
        jobsList.style.display = 'block';
        noJobsMessage.style.display = 'none';
    }
    
    // Update stats based on visible jobs
    updateJobStats();
}

function updateJobStats() {
    const visibleJobs = document.querySelectorAll('.user-job-card[style*="display: block"], .user-job-card:not([style*="display: none"])');
    
    let totalJobs = visibleJobs.length;
    let pendingCount = 0;
    let approvedCount = 0;
    let completedCount = 0;
    let totalVendors = 0;
    
    visibleJobs.forEach(job => {
        const status = job.getAttribute('data-status');
        
        // Count pending requests
        if (status === 'visit-request-pending' || status === 'final-visit-pending' || status === 'payment-pending') {
            pendingCount++;
        }
        
        // Count approved items
        if (status === 'visit-approved' || status === 'final-visit-approved' || status === 'payment-approved') {
            approvedCount++;
        }
        
        // Count completed work
        if (status === 'work-completed') {
            completedCount++;
        }
        
        // Count vendors (extract from job details)
        const vendorText = job.querySelector('.user-job-detail-item span');
        if (vendorText && vendorText.textContent.includes('Vendors:')) {
            const vendorMatch = vendorText.textContent.match(/(\d+)/);
            if (vendorMatch) {
                totalVendors += parseInt(vendorMatch[1]);
            }
        }
    });
    
    // Update stat numbers
    updateStatNumber('Total Jobs', totalJobs);
    updateStatNumber('Pending Requests', pendingCount);
    updateStatNumber('Approved', approvedCount);
    updateStatNumber('Completed Work', completedCount);
    updateStatNumber('Total Vendors', totalVendors);
}

function updateStatNumber(statType, count) {
    const statItems = document.querySelectorAll('.user-job-stat-item');
    statItems.forEach(item => {
        const title = item.querySelector('h3').textContent;
        if (title === statType) {
            const numberElement = item.querySelector('.user-job-stat-number');
            if (numberElement) {
                // Animate the number change
                animateNumberChange(numberElement, parseInt(numberElement.textContent), count);
            }
        }
    });
}

function animateNumberChange(element, startValue, endValue) {
    const duration = 500;
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(startValue + (endValue - startValue) * progress);
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

function clearFilters() {
    const searchInput = document.getElementById('userJobSearch');
    const statusFilter = document.getElementById('userStatusFilter');
    
    if (searchInput) searchInput.value = '';
    if (statusFilter) statusFilter.value = '';
    
    filterJobs('', '');
}

function setupJobAnimations() {
    // Animate job cards on load
    const jobCards = document.querySelectorAll('.user-job-card');
    jobCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, index * 100);
    });
    
    // Animate stat items
    const statItems = document.querySelectorAll('.user-job-stat-item');
    statItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100);
        }, (index + jobCards.length) * 100);
    });
}

// Export functions for use in other files
window.userJobs = {
    filterJobs,
    clearFilters,
    updateJobStats
};
