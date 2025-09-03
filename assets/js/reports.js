document.addEventListener('DOMContentLoaded', function() {
    // Initialize reports page functionality
    initializeReportsPage();
    
    let monthlyChart, userPerformanceChart, paymentStatusChart;
    
    function initializeReportsPage() {
        // Initialize charts with a small delay to ensure DOM is ready
        setTimeout(() => {
        initializeMonthlyChart();
            initializeUserPerformanceChart();
            initializePaymentStatusChart();
        }, 100);
        
        // Initialize event listeners
        initializeEventListeners();
        
        // Initialize animations
        initializeAnimations();
    }
    
    function initializeEventListeners() {
        // Export report button
        const exportBtn = document.getElementById('exportReport');
        if (exportBtn) {
            exportBtn.addEventListener('click', function() {
                window.themeManager.showNotification('Exporting report...', 'info');
                // Simulate export functionality
                setTimeout(() => {
                    window.themeManager.showNotification('Report exported successfully!', 'success');
                }, 2000);
            });
        }
        
        // Generate report button
        const generateBtn = document.getElementById('generateReport');
        if (generateBtn) {
            generateBtn.addEventListener('click', function() {
                window.themeManager.showNotification('Generating new report...', 'info');
                // Simulate report generation
                setTimeout(() => {
                    window.themeManager.showNotification('Report generated successfully!', 'success');
                }, 3000);
            });
        }
        
        // Chart period selector
        const chartPeriod = document.getElementById('chartPeriod');
        if (chartPeriod) {
            chartPeriod.addEventListener('change', function() {
                updateMonthlyChart(this.value);
            });
        }
    }
    
    function initializeMonthlyChart() {
        console.log('Initializing monthly chart...');
        const ctx = document.getElementById('monthlyChart');
        if (!ctx) {
            console.error('Monthly chart canvas not found');
            return;
        }
        
        // Check if Chart.js is available
        if (typeof Chart === 'undefined') {
            console.error('Chart.js not loaded');
            return;
        }
        
        console.log('Chart.js is available, creating chart...');
        
        const monthlyData = {
            'Jan': 15, 'Feb': 18, 'Mar': 22, 'Apr': 19,
            'May': 25, 'Jun': 28, 'Jul': 24, 'Aug': 30,
            'Sep': 27, 'Oct': 32, 'Nov': 35, 'Dec': 38
        };
        
        // Create gradient
        const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.9)');
        gradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.6)');
        gradient.addColorStop(1, 'rgba(99, 102, 241, 0.1)');
        
        monthlyChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(monthlyData),
                datasets: [{
                    label: 'Jobs',
                    data: Object.values(monthlyData),
                    backgroundColor: gradient,
                    borderColor: 'rgba(99, 102, 241, 1)',
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false,
                    hoverBackgroundColor: 'rgba(99, 102, 241, 0.9)',
                    hoverBorderColor: 'rgba(99, 102, 241, 1)',
                    hoverBorderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: 'rgba(99, 102, 241, 0.5)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                return `Jobs: ${context.parsed.y}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: 'var(--text-secondary)',
                            font: {
                                size: 12
                            },
                            padding: 10
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: 'var(--text-secondary)',
                            font: {
                                size: 12
                            },
                            padding: 10
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }
    
    function initializeUserPerformanceChart() {
        const ctx = document.getElementById('userPerformanceChart');
        if (!ctx) {
            console.error('User performance chart canvas not found');
            return;
        }
        
        // Check if Chart.js is available
        if (typeof Chart === 'undefined') {
            console.error('Chart.js not loaded');
            return;
        }
        
        const userData = {
            'John Smith': 8,
            'Sarah Johnson': 6,
            'Mike Wilson': 5,
            'Lisa Brown': 4,
            'David Lee': 3
        };
        
        const colors = [
            '#6366f1', '#10b981', '#f59e0b', '#8b5cf6', '#6b7280'
        ];
        
        userPerformanceChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(userData),
                datasets: [{
                    label: 'Vendors Approved',
                    data: Object.values(userData),
                    backgroundColor: colors,
                    borderColor: colors.map(color => color + 'CC'),
                    borderWidth: 2,
                    borderRadius: 6,
                    hoverBackgroundColor: colors.map(color => color + 'DD'),
                    hoverBorderColor: colors.map(color => color + 'FF'),
                    hoverBorderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: 'rgba(99, 102, 241, 0.5)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                return `Vendors Approved: ${context.parsed.x}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: 'var(--text-secondary)',
                            font: {
                                size: 12
                            },
                            padding: 10
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: 'var(--text-secondary)',
                            font: {
                                size: 11
                            },
                            padding: 5
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }
    
    function initializePaymentStatusChart() {
        const ctx = document.getElementById('paymentStatusChart');
        if (!ctx) {
            console.error('Payment status chart canvas not found');
            return;
        }
        
        // Check if Chart.js is available
        if (typeof Chart === 'undefined') {
            console.error('Chart.js not loaded');
            return;
        }
        
        const paymentData = {
            'Completed': 65,
            'Pending': 25,
            'Failed': 10
        };
        
        const colors = [
            '#10b981', '#f59e0b', '#ef4444'
        ];
        
        paymentStatusChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(paymentData),
                datasets: [{
                    data: Object.values(paymentData),
                    backgroundColor: colors,
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 2,
                    hoverBackgroundColor: colors.map(color => color + 'CC'),
                    hoverBorderColor: 'rgba(255, 255, 255, 0.2)',
                    hoverBorderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: 'rgba(99, 102, 241, 0.5)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.parsed}%`;
                            }
                        }
                    }
                },
                cutout: '60%',
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }
    
    function updateMonthlyChart(period) {
        if (!monthlyChart) return;
        
        window.themeManager.showNotification(`Updating chart for last ${period} months...`, 'info');
        
        // Simulate data update based on period
        const baseData = [15, 18, 22, 19, 25, 28, 24, 30, 27, 32, 35, 38];
        let newData, newLabels;
        
        switch(period) {
            case '3':
                newData = baseData.slice(-3);
                newLabels = ['Oct', 'Nov', 'Dec'];
                break;
            case '6':
                newData = baseData.slice(-6);
                newLabels = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                break;
            default:
                newData = baseData;
                newLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        }
        
        monthlyChart.data.labels = newLabels;
        monthlyChart.data.datasets[0].data = newData;
        monthlyChart.update('active');
        
        setTimeout(() => {
            window.themeManager.showNotification('Chart updated successfully!', 'success');
        }, 1000);
    }
    
    function initializeAnimations() {
        // Animate stat numbers
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const finalValue = stat.textContent;
            const isCurrency = finalValue.includes('$');
            const isPercentage = finalValue.includes('%');
            
            let numericValue = parseFloat(finalValue.replace(/[$,%]/g, ''));
            let currentValue = 0;
            const increment = numericValue / 50;
            
            const animate = () => {
                currentValue += increment;
                if (currentValue < numericValue) {
                    if (isCurrency) {
                        stat.textContent = '$' + Math.floor(currentValue).toLocaleString();
                    } else if (isPercentage) {
                        stat.textContent = Math.floor(currentValue) + '%';
                    } else {
                        stat.textContent = Math.floor(currentValue);
                    }
                    requestAnimationFrame(animate);
                } else {
                    stat.textContent = finalValue;
                }
            };
            
            animate();
        });
        
        // Animate performer items
        const performerItems = document.querySelectorAll('.performer-item');
        performerItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 200);
        });
        
        // Animate activity items
        const activityItems = document.querySelectorAll('.activity-item');
        activityItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 200);
        });
    }
    
    // Handle window resize for responsive charts
    window.addEventListener('resize', function() {
        if (monthlyChart) {
            monthlyChart.resize();
        }
        if (userPerformanceChart) {
            userPerformanceChart.resize();
        }
        if (paymentStatusChart) {
            paymentStatusChart.resize();
        }
    });
    
    // Manual refresh functionality
    function refreshData() {
            window.themeManager.showNotification('Refreshing data...', 'info');
            // Simulate data refresh
            setTimeout(() => {
            if (monthlyChart) {
                monthlyChart.update('active');
            }
            if (userPerformanceChart) {
                userPerformanceChart.update('active');
            }
            if (paymentStatusChart) {
                paymentStatusChart.update('active');
            }
                window.themeManager.showNotification('Data refreshed successfully!', 'success');
            }, 1000);
    }
    
    // Manual refresh button
    const refreshBtn = document.createElement('button');
    refreshBtn.className = 'btn-secondary';
    refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh';
    refreshBtn.addEventListener('click', refreshData);
    
    // Add refresh button to header actions
    const headerActions = document.querySelector('.header-actions');
    if (headerActions) {
        headerActions.appendChild(refreshBtn);
    }
});
