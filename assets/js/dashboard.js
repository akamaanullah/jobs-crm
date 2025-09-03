// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    const themeBtns = document.querySelectorAll('.theme-btn');
    const userMenu = document.querySelector('.user-menu');

    // Sidebar Toggle Functionality
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });

        // Theme functionality is now handled by theme-manager.js
    // No need to duplicate theme switching code here

    // User Menu Dropdown
    if (userMenu) {
        userMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = this.querySelector('.dropdown-menu');
            dropdown.style.opacity = dropdown.style.opacity === '1' ? '0' : '1';
            dropdown.style.visibility = dropdown.style.visibility === 'visible' ? 'hidden' : 'visible';
            dropdown.style.transform = dropdown.style.transform === 'translateY(0px)' ? 'translateY(-10px)' : 'translateY(0px)';
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            const dropdown = userMenu.querySelector('.dropdown-menu');
            dropdown.style.opacity = '0';
            dropdown.style.visibility = 'hidden';
            dropdown.style.transform = 'translateY(-10px)';
        });
    }

    // Job Action Buttons
    const jobActionBtns = document.querySelectorAll('.btn-icon');
    jobActionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.getAttribute('title');
            const jobTitle = this.closest('.job-item').querySelector('h4').textContent;
            
            if (action === 'View Details') {
                window.themeManager.showNotification(`Viewing details for: ${jobTitle}`, 'info');
                // Add navigation logic here
            } else if (action === 'Edit') {
                window.themeManager.showNotification(`Editing: ${jobTitle}`, 'info');
                // Add edit logic here
            }
        });
    });

    // Quick Action Buttons
    const actionBtns = document.querySelectorAll('.action-btn');
            actionBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                const action = this.querySelector('span').textContent;
                window.themeManager.showNotification(`Opening: ${action}`, 'info');
            });
        });

    // Animate stats on page load
    animateStats();

    // Notification system is now handled by theme-manager.js
    // Use window.themeManager.showNotification() if needed

    // Animate stats numbers
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const finalNumber = parseInt(stat.textContent);
            let currentNumber = 0;
            const increment = finalNumber / 50;
            const timer = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= finalNumber) {
                    currentNumber = finalNumber;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(currentNumber);
            }, 30);
        });
    }

    // Add dashboard specific animations
    const dashboardStyle = document.createElement('style');
    dashboardStyle.textContent = `
        /* Dashboard specific animations */
        .stat-card {
            animation: fadeInUp 0.6s ease-out;
            animation-fill-mode: both;
        }

        .stat-card:nth-child(1) { animation-delay: 0.1s; }
        .stat-card:nth-child(2) { animation-delay: 0.2s; }
        .stat-card:nth-child(3) { animation-delay: 0.3s; }
        .stat-card:nth-child(4) { animation-delay: 0.4s; }

        .dashboard-card {
            animation: fadeInUp 0.6s ease-out;
            animation-fill-mode: both;
        }

        .dashboard-card:nth-child(1) { animation-delay: 0.5s; }
        .dashboard-card:nth-child(2) { animation-delay: 0.6s; }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(dashboardStyle);

    // Real-time updates simulation
    setInterval(() => {
        // Simulate real-time updates
        const randomStat = document.querySelectorAll('.stat-number')[Math.floor(Math.random() * 4)];
        const currentValue = parseInt(randomStat.textContent);
        const newValue = currentValue + Math.floor(Math.random() * 3) - 1;
        if (newValue >= 0) {
            randomStat.textContent = newValue;
        }
    }, 30000); // Update every 30 seconds
});
