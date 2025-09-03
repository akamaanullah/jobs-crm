<?php
$page_title = 'Test Charts';
include 'includes/header.php';
?>

<!-- Test Charts Content -->
<div class="dashboard-content">
    <div class="page-header">
        <div class="header-content">
            <h2>Chart Test Page</h2>
            <p>Testing Chart.js functionality</p>
        </div>
    </div>

    <div class="dashboard-grid">
        <div class="dashboard-card">
            <div class="card-header">
                <h3>Test Chart</h3>
            </div>
            <div class="card-content">
                <div class="chart-container">
                    <canvas id="testChart"></canvas>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    console.log('Chart.js available:', typeof Chart !== 'undefined');
    
    if (typeof Chart !== 'undefined') {
        const ctx = document.getElementById('testChart');
        if (ctx) {
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            console.log('Test chart created successfully');
        } else {
            console.error('Test chart canvas not found');
        }
    } else {
        console.error('Chart.js not loaded');
    }
});
</script>

<?php include 'includes/footer.php'; ?>
