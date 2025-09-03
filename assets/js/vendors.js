document.addEventListener('DOMContentLoaded', function() {
    // Initialize vendors page functionality
    initializeVendorsPage();
    
    function initializeVendorsPage() {
        // Search functionality
        const searchInput = document.getElementById('vendorSearch');
        if (searchInput) {
            searchInput.addEventListener('input', debounce(function() {
                filterVendors();
            }, 300));
        }
        
        // Filter functionality
        const filters = ['statusFilter', 'specializationFilter', 'platformFilter'];
        filters.forEach(filterId => {
            const filter = document.getElementById(filterId);
            if (filter) {
                filter.addEventListener('change', filterVendors);
            }
        });
        
        // View profile buttons
        document.querySelectorAll('.view-profile-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const vendorId = this.dataset.vendorId;
                openVendorProfile(vendorId);
            });
        });
        

        

        
        document.querySelectorAll('.remove-vendor-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const vendorId = this.dataset.vendorId;
                if (confirm('Are you sure you want to remove this vendor?')) {
                    window.themeManager.showNotification(`Removing vendor ${vendorId}`, 'info');
                }
            });
        });
        
        // Export and bulk actions
        const exportBtn = document.getElementById('exportVendors');
        if (exportBtn) {
            exportBtn.addEventListener('click', function() {
                window.themeManager.showNotification('Exporting vendors data...', 'info');
            });
        }
        
        const bulkActionsBtn = document.getElementById('bulkActions');
        if (bulkActionsBtn) {
            bulkActionsBtn.addEventListener('click', function() {
                window.themeManager.showNotification('Bulk actions menu', 'info');
            });
        }
        

    }
    
    function filterVendors() {
        const searchTerm = document.getElementById('vendorSearch').value.toLowerCase();
        const statusFilter = document.getElementById('statusFilter').value;
        const specializationFilter = document.getElementById('specializationFilter').value;
        const platformFilter = document.getElementById('platformFilter').value;
        
        const vendorCards = document.querySelectorAll('.vendor-card');
        
        vendorCards.forEach(card => {
            const vendorName = card.querySelector('h4').textContent.toLowerCase();
            const vendorEmail = card.querySelector('.contact-item:nth-child(1) span').textContent.toLowerCase();
            const vendorSpecialization = card.querySelector('.vendor-specialization').textContent.toLowerCase();
            const vendorStatus = card.querySelector('.vendor-status').textContent.toLowerCase();
            const vendorPlatform = card.querySelector('.contact-item:nth-child(3) span').textContent.toLowerCase();
            
            const matchesSearch = vendorName.includes(searchTerm) || 
                                vendorEmail.includes(searchTerm) || 
                                vendorSpecialization.includes(searchTerm);
            
            const matchesStatus = !statusFilter || vendorStatus === statusFilter;
            const matchesSpecialization = !specializationFilter || vendorSpecialization === specializationFilter.toLowerCase();
            const matchesPlatform = !platformFilter || vendorPlatform.includes(platformFilter.toLowerCase());
            
            if (matchesSearch && matchesStatus && matchesSpecialization && matchesPlatform) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease-in';
            } else {
                card.style.display = 'none';
            }
        });
        
        updateVendorStats();
    }
    
    function updateVendorStats() {
        const visibleVendors = document.querySelectorAll('.vendor-card[style*="display: block"], .vendor-card:not([style*="display: none"])');
        const activeVendors = Array.from(visibleVendors).filter(card => 
            card.querySelector('.vendor-status').textContent.toLowerCase() === 'active'
        );
        
        const totalVendorsSpan = document.getElementById('totalVendors');
        const activeVendorsSpan = document.getElementById('activeVendors');
        
        if (totalVendorsSpan) {
            totalVendorsSpan.textContent = `${visibleVendors.length} Total Vendors`;
        }
        if (activeVendorsSpan) {
            activeVendorsSpan.textContent = `${activeVendors.length} Active`;
        }
    }
    
    function openVendorProfile(vendorId) {
        // Sample vendor data (in real app, this would come from API)
        const vendorData = {
            1: {
                name: 'John Smith',
                specialization: 'Frontend Development',
                status: 'active',
                email: 'john.smith@email.com',
                phone: '+1 (555) 123-4567',
                platform: 'Upwork',
                joinDate: 'Mar 15, 2023',
                rating: 4.8,
                totalProjects: 15,
                completedProjects: 12,
                totalEarnings: 45000,
                successRate: 80,
                quoteType: 'paid',
                quoteAmount: 2500,
                appointmentDate: 'Dec 15, 2024',
                appointmentTime: '2:00 PM'
            },
            2: {
                name: 'Sarah Johnson',
                specialization: 'UI/UX Design',
                status: 'active',
                email: 'sarah.johnson@email.com',
                phone: '+1 (555) 234-5678',
                platform: 'Fiverr',
                joinDate: 'Nov 20, 2022',
                rating: 4.9,
                totalProjects: 28,
                completedProjects: 25,
                totalEarnings: 78000,
                successRate: 89,
                quoteType: 'free',
                quoteAmount: null,
                appointmentDate: 'Dec 20, 2024',
                appointmentTime: '10:30 AM'
            },
            3: {
                name: 'Michael Chen',
                specialization: 'Backend Development',
                status: 'pending',
                email: 'michael.chen@email.com',
                phone: '+1 (555) 345-6789',
                platform: 'Freelancer',
                joinDate: 'Dec 01, 2024',
                rating: 4.5,
                totalProjects: 8,
                completedProjects: 6,
                totalEarnings: 22000,
                successRate: 75,
                quoteType: 'paid',
                quoteAmount: 3200,
                appointmentDate: 'Dec 25, 2024',
                appointmentTime: '4:00 PM'
            },
            4: {
                name: 'Emily Davis',
                specialization: 'Mobile Development',
                status: 'active',
                email: 'emily.davis@email.com',
                phone: '+1 (555) 456-7890',
                platform: 'Upwork',
                joinDate: 'Nov 20, 2024',
                rating: 4.7,
                totalProjects: 22,
                completedProjects: 19,
                totalEarnings: 65000,
                successRate: 86,
                quoteType: 'paid',
                quoteAmount: 2800,
                appointmentDate: 'Dec 18, 2024',
                appointmentTime: '11:00 AM'
            },
            5: {
                name: 'David Wilson',
                specialization: 'Database Admin',
                status: 'inactive',
                email: 'david.wilson@email.com',
                phone: '+1 (555) 567-8901',
                platform: 'Fiverr',
                joinDate: 'Sep 10, 2024',
                rating: 4.6,
                totalProjects: 12,
                completedProjects: 10,
                totalEarnings: 35000,
                successRate: 83,
                quoteType: 'free',
                quoteAmount: null,
                appointmentDate: 'Dec 30, 2024',
                appointmentTime: '1:30 PM'
            }
        };
        
        const vendor = vendorData[vendorId];
        if (!vendor) {
            window.themeManager.showNotification('Vendor not found', 'error');
            return;
        }
        
        // Populate modal with vendor data
        document.getElementById('modalVendorName').textContent = vendor.name;
        document.getElementById('modalVendorSpecialization').textContent = vendor.specialization;
        document.getElementById('modalVendorStatus').textContent = vendor.status;
        document.getElementById('modalVendorEmail').textContent = vendor.email;
        document.getElementById('modalVendorPhone').textContent = vendor.phone;
        document.getElementById('modalVendorPlatform').textContent = vendor.platform;
                 document.getElementById('modalVendorJoinDate').textContent = `Added: ${vendor.joinDate}`;
         document.getElementById('modalVendorAddedBy').textContent = 'Added by: Admin';
        
        // Set avatar
        const avatarElement = document.getElementById('modalVendorAvatar');
        const initials = vendor.name.split(' ').map(n => n[0]).join('').toUpperCase();
        avatarElement.innerHTML = initials;
        
        // Update stats
        document.getElementById('modalTotalProjects').textContent = vendor.totalProjects;
        document.getElementById('modalCompletedProjects').textContent = vendor.completedProjects;
        document.getElementById('modalTotalEarnings').textContent = `$${vendor.totalEarnings.toLocaleString()}`;
        document.getElementById('modalSuccessRate').textContent = `${vendor.successRate}%`;
        
        
        
        // Load work history
        loadVendorWorkHistory(vendorId);
        
        // Show modal
        document.getElementById('vendorProfileModal').style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        window.themeManager.showNotification(`Viewing profile for ${vendor.name}`, 'info');
    }
    
    function loadVendorWorkHistory(vendorId) {
        const workHistoryContainer = document.getElementById('modalWorkHistory');
        
        // Sample work history data
        const workHistory = {
            1: [
                {
                    jobId: 'JOB-001',
                    jobTitle: 'E-commerce Website Development',
                    storeName: 'Tech Solutions Inc.',
                    startDate: 'Nov 01, 2024',
                    endDate: 'Dec 01, 2024',
                    status: 'completed',
                    earnings: 2500,
                    rating: 5,
                    feedback: 'Excellent work! John delivered the project on time with high quality.'
                },
                {
                    jobId: 'JOB-003',
                    jobTitle: 'Corporate Website Redesign',
                    storeName: 'Global Enterprises',
                    startDate: 'Oct 15, 2024',
                    endDate: 'Nov 15, 2024',
                    status: 'completed',
                    earnings: 3000,
                    rating: 4,
                    feedback: 'Good work, but some minor revisions were needed.'
                },
                {
                    jobId: 'JOB-005',
                    jobTitle: 'Portfolio Website',
                    storeName: 'Creative Studios',
                    startDate: 'Dec 05, 2024',
                    endDate: null,
                    status: 'in-progress',
                    earnings: 2000,
                    rating: null,
                    feedback: null
                }
            ],
            2: [
                {
                    jobId: 'JOB-002',
                    jobTitle: 'Mobile App UI Design',
                    storeName: 'Innovation Labs',
                    startDate: 'Nov 10, 2024',
                    endDate: 'Dec 10, 2024',
                    status: 'completed',
                    earnings: 1800,
                    rating: 5,
                    feedback: 'Sarah created beautiful and intuitive designs. Highly recommended!'
                },
                {
                    jobId: 'JOB-004',
                    jobTitle: 'Dashboard Design',
                    storeName: 'Data Analytics Corp',
                    startDate: 'Dec 01, 2024',
                    endDate: null,
                    status: 'in-progress',
                    earnings: 2200,
                    rating: null,
                    feedback: null
                }
            ],
            3: [
                {
                    jobId: 'JOB-006',
                    jobTitle: 'API Development',
                    storeName: 'StartupXYZ',
                    startDate: 'Dec 01, 2024',
                    endDate: null,
                    status: 'in-progress',
                    earnings: 3200,
                    rating: null,
                    feedback: null
                }
            ],
            4: [
                {
                    jobId: 'JOB-007',
                    jobTitle: 'iOS App Development',
                    storeName: 'Mobile Solutions',
                    startDate: 'Nov 20, 2024',
                    endDate: null,
                    status: 'in-progress',
                    earnings: 2800,
                    rating: null,
                    feedback: null
                }
            ],
            5: [
                {
                    jobId: 'JOB-008',
                    jobTitle: 'Database Optimization',
                    storeName: 'Enterprise Systems',
                    startDate: 'Sep 10, 2024',
                    endDate: 'Oct 10, 2024',
                    status: 'completed',
                    earnings: 1500,
                    rating: 4,
                    feedback: 'Good database optimization work.'
                }
            ]
        };
        
        const history = workHistory[vendorId] || [];
        
        if (history.length === 0) {
            workHistoryContainer.innerHTML = `
                <div class="no-history">
                    <i class="fas fa-inbox"></i>
                    <p>No work history available</p>
                </div>
            `;
        } else {
            workHistoryContainer.innerHTML = `
                <div class="work-history-list">
                    ${history.map(job => `
                        <div class="work-history-item">
                            <div class="job-header">
                                <div class="job-info text-left">
                                    <h5>${job.jobTitle}</h5>
                                    <p class="job-client">${job.storeName}</p>
                                    <p class="job-id">${job.jobId}</p>
                                </div>
                                <div class="job-status">
                                    <span class="status-badge ${job.status}">${job.status}</span>
                                </div>
                            </div>
                            <div class="job-details">
                                <div class="job-dates">
                                    <span><i class="fas fa-calendar"></i> ${job.startDate}</span>
                                    ${job.endDate ? `<span><i class="fas fa-calendar-check"></i> ${job.endDate}</span>` : ''}
                                </div>
                                <div class="job-earnings">
                                    <span><i class="fas fa-dollar-sign"></i> $${job.earnings.toLocaleString()}</span>
                                </div>
                                ${job.rating ? `
                                    <div class="job-rating">
                                        <div class="stars">
                                            ${Array.from({length: 5}, (_, i) => 
                                                `<i class="fas fa-star ${i < job.rating ? 'filled' : ''}"></i>`
                                            ).join('')}
                                        </div>
                                    </div>
                                ` : ''}
                            </div>
                            ${job.feedback ? `
                                <div class="job-feedback">
                                    <p>${job.feedback}</p>
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }
    
    // Initialize vendor profile modal
    if (document.getElementById('vendorProfileModal')) {
        initializeVendorProfileModal();
    }
    
    function initializeVendorProfileModal() {
        const modal = document.getElementById('vendorProfileModal');
        const closeBtn = document.getElementById('closeVendorProfile');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
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
    
    // Add fade-in animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
});
