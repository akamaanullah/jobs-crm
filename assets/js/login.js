// Login Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.querySelector('.login-btn');

    // Password Toggle Functionality
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });

    // Form Submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(loginForm);
        const username = formData.get('username');
        const password = formData.get('password');

        // Basic validation
        if (!username || !password) {
            window.themeManager.showNotification('Please fill in all fields', 'error');
            return;
        }

        // Show loading state
        setLoadingState(true);

        // Simulate login process (replace with actual backend call)
        setTimeout(() => {
            // For demo purposes - replace with actual authentication
            if (username === 'admin' && password === 'admin123') {
                window.themeManager.showNotification('Login successful! Redirecting to admin dashboard...', 'success');
                setTimeout(() => {
                    window.location.href = 'admin/dashboard.php';
                }, 1500);
            } else if (username === 'user' && password === 'user123') {
                window.themeManager.showNotification('Login successful! Redirecting to user dashboard...', 'success');
                setTimeout(() => {
                    window.location.href = 'user/jobs-list.php';
                }, 1500);
            } else {
                window.themeManager.showNotification('Invalid credentials. Please try again.', 'error');
                setLoadingState(false);
            }
        }, 1000);
    });

    // Input focus effects
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Loading state function
    function setLoadingState(loading) {
        if (loading) {
            loginBtn.classList.add('loading');
            loginBtn.innerHTML = '<i class="fas fa-spinner"></i> Logging in...';
            loginBtn.disabled = true;
        } else {
            loginBtn.classList.remove('loading');
            loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
            loginBtn.disabled = false;
        }
    }

    // Notification system is now handled by theme-manager.js
    // Use window.themeManager.showNotification() if needed

    // Theme functionality is now handled by theme-manager.js
    // No need to duplicate theme switching code here

    // CSS animations are now handled by theme-manager.js
});
