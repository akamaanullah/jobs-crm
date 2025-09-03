// Theme Manager - Common functionality for all pages
class ThemeManager {
    constructor() {
        this.currentTheme = 'default';
        this.themeButtons = document.querySelectorAll('.theme-btn');
        this.init();
    }

    init() {
        this.loadSavedTheme();
        this.bindEvents();
        this.updateThemeButtons();
    }

    // Load saved theme from localStorage
    loadSavedTheme() {
        const savedTheme = localStorage.getItem('selected-theme');
        if (savedTheme) {
            this.setTheme(savedTheme);
        }
    }

    // Bind event listeners
    bindEvents() {
        this.themeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const theme = btn.getAttribute('data-theme');
                this.setTheme(theme);
                this.showNotification(`Theme changed to ${theme}`, 'success');
            });
        });
    }

    // Set theme and update UI
    setTheme(theme) {
        this.currentTheme = theme;
        
        // Remove existing theme classes
        document.body.classList.remove('theme-purple', 'theme-green');
        
        // Add new theme class if not default
        if (theme !== 'default') {
            document.body.classList.add(`theme-${theme}`);
        }
        
        // Save to localStorage
        localStorage.setItem('selected-theme', theme);
        
        // Update button states
        this.updateThemeButtons();
        
        // Dispatch custom event for other scripts
        document.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme: theme } 
        }));
    }

    // Update theme button states
    updateThemeButtons() {
        this.themeButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-theme') === this.currentTheme) {
                btn.classList.add('active');
            }
        });
    }

    // Get current theme
    getCurrentTheme() {
        return this.currentTheme;
    }

    // Show notification
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
            max-width: 400px;
        `;

        // Add to page
        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        });
    }

    // Get notification icon
    getNotificationIcon(type) {
        switch(type) {
            case 'success': return 'fa-check-circle';
            case 'error': return 'fa-exclamation-circle';
            case 'warning': return 'fa-exclamation-triangle';
            default: return 'fa-info-circle';
        }
    }

    // Get notification color from CSS variables
    getNotificationColor(type) {
        const root = document.documentElement;
        const computedStyle = getComputedStyle(root);
        
        switch(type) {
            case 'success': return computedStyle.getPropertyValue('--success-color').trim();
            case 'error': return computedStyle.getPropertyValue('--error-color').trim();
            case 'warning': return computedStyle.getPropertyValue('--warning-color').trim();
            default: return computedStyle.getPropertyValue('--info-color').trim();
        }
    }

    // Add notification styles if not already present
    addNotificationStyles() {
        if (!document.getElementById('theme-manager-styles')) {
            const style = document.createElement('style');
            style.id = 'theme-manager-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    padding: 5px;
                    margin-left: 10px;
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add notification styles
    const themeManager = new ThemeManager();
    themeManager.addNotificationStyles();
    
    // Make theme manager globally available
    window.themeManager = themeManager;
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeManager;
}
