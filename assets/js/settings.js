document.addEventListener('DOMContentLoaded', function () {
    // Initialize settings page functionality
    initializeSettingsPage();

    function initializeSettingsPage() {
        // Initialize tabs
        initializeTabs();

        // Initialize theme options
        initializeThemeOptions();

        // Initialize form handling
        initializeFormHandling();

        // Initialize buttons
        initializeButtons();

        // Initialize animations
        initializeAnimations();
    }

    function initializeTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const settingsPanels = document.querySelectorAll('.settings-panel');

        tabButtons.forEach(button => {
            button.addEventListener('click', function () {
                const targetTab = this.getAttribute('data-tab');

                // Remove active class from all tabs and panels
                tabButtons.forEach(btn => btn.classList.remove('active'));
                settingsPanels.forEach(panel => panel.classList.remove('active'));

                // Add active class to clicked tab and corresponding panel
                this.classList.add('active');
                document.getElementById(targetTab).classList.add('active');

                // Show notification
                window.themeManager.showNotification(`Switched to ${this.textContent.trim()} settings`, 'info');
            });
        });
    }

    function initializeThemeOptions() {
        const themeOptions = document.querySelectorAll('.theme-option');

        themeOptions.forEach(option => {
            option.addEventListener('click', function () {
                const selectedTheme = this.getAttribute('data-theme');

                // Remove active class from all theme options
                themeOptions.forEach(opt => opt.classList.remove('active'));

                // Add active class to selected theme
                this.classList.add('active');

                // Apply theme
                applyTheme(selectedTheme);

                // Show notification
                window.themeManager.showNotification(`Theme changed to ${this.querySelector('span').textContent}`, 'success');
            });
        });
    }

    function applyTheme(theme) {
        // Remove existing theme classes
        document.body.classList.remove('theme-blue', 'theme-purple', 'theme-green');

        // Add new theme class (only if not default)
        if (theme !== 'default') {
            document.body.classList.add(`theme-${theme}`);
        }

        // Update theme manager
        if (window.themeManager) {
            window.themeManager.setTheme(theme);
        }

        // Save theme preference to localStorage
        localStorage.setItem('selectedTheme', theme);

        // Also save to UI settings
        saveUISettings();

        console.log('Theme applied:', theme);
    }

    function initializeFormHandling() {
        // Auto-save functionality for form inputs
        const formInputs = document.querySelectorAll('.form-control, .checkbox-label input');

        formInputs.forEach(input => {
            input.addEventListener('change', function () {
                // Check if this is a UI setting
                const isUISetting = this.id === 'sidebarCollapsed' ||
                    this.id === 'showAnimations' ||
                    this.id === 'compactMode';

                if (isUISetting) {
                    // Save UI settings immediately to localStorage
                    saveUISettings();
                    showAutoSaveIndicator();
                    setTimeout(() => {
                        hideAutoSaveIndicator();
                    }, 1000);
                } else {
                    // Show auto-save indicator for other settings
                    showAutoSaveIndicator();
                    setTimeout(() => {
                        hideAutoSaveIndicator();
                    }, 1000);
                }
            });
        });

        // Form validation
        const emailInput = document.getElementById('adminEmail');
        if (emailInput) {
            emailInput.addEventListener('blur', function () {
                validateEmail(this.value);
            });
        }
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email);

        if (!isValid && email) {
            showFieldError(emailInput, 'Please enter a valid email address');
        } else {
            hideFieldError(emailInput);
        }

        return isValid;
    }

    function showFieldError(field, message) {
        // Remove existing error
        hideFieldError(field);

        // Add error styling
        field.style.borderColor = '#ef4444';
        field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';

        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontSize = '0.85rem';
        errorDiv.style.marginTop = '5px';

        field.parentNode.appendChild(errorDiv);
    }

    function hideFieldError(field) {
        field.style.borderColor = '';
        field.style.boxShadow = '';

        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    function initializeButtons() {
        // Save Settings Button
        const saveBtn = document.getElementById('saveSettings');
        if (saveBtn) {
            saveBtn.addEventListener('click', function () {
                saveSettings();
            });
        }

        // Reset Settings Button
        const resetBtn = document.getElementById('resetSettings');
        if (resetBtn) {
            resetBtn.addEventListener('click', function () {
                resetSettings();
            });
        }

        // Password change button
        const changePasswordBtn = document.getElementById('changePasswordBtn');
        if (changePasswordBtn) {
            changePasswordBtn.addEventListener('click', function () {
                changePassword();
            });
        }

        // Password strength checker
        const newPasswordInput = document.getElementById('newPassword');
        if (newPasswordInput) {
            newPasswordInput.addEventListener('input', function () {
                checkPasswordStrength(this.value);
            });
        }

        // Advanced buttons
        const clearCacheBtn = document.getElementById('clearCache');
        if (clearCacheBtn) {
            clearCacheBtn.addEventListener('click', function () {
                clearCache();
            });
        }

        const optimizeDbBtn = document.getElementById('optimizeDatabase');
        if (optimizeDbBtn) {
            optimizeDbBtn.addEventListener('click', function () {
                optimizeDatabase();
            });
        }

        const exportDataBtn = document.getElementById('exportData');
        if (exportDataBtn) {
            exportDataBtn.addEventListener('click', function () {
                exportData();
            });
        }

        const backupBtn = document.getElementById('backupSystem');
        if (backupBtn) {
            backupBtn.addEventListener('click', function () {
                createBackup();
            });
        }
    }

    function saveSettings() {
        // Show loading state
        const saveBtn = document.getElementById('saveSettings');
        const originalText = saveBtn.innerHTML;
        saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        saveBtn.disabled = true;

        // Collect all form data
        const formData = collectFormData();

        // Simulate API call
        setTimeout(() => {
            // Save to localStorage (in real app, send to server)
            localStorage.setItem('settings', JSON.stringify(formData));

            // Reset button state
            saveBtn.innerHTML = originalText;
            saveBtn.disabled = false;

            // Show success notification
            window.themeManager.showNotification('Settings saved successfully!', 'success');

            // Show saved indicator
            showSavedIndicator();
        }, 1500);
    }

    function collectFormData() {
        const data = {
            general: {
                company_name: document.getElementById('companyName')?.value || '',
                admin_email: document.getElementById('adminEmail')?.value || '',
                timezone: document.getElementById('timezone')?.value || '',
                date_format: document.getElementById('dateFormat')?.value || ''
            },
            notifications: {
                email_notifications: document.getElementById('emailNotifications')?.checked || false,
                sms_notifications: document.getElementById('smsNotifications')?.checked || false,
                job_alerts: document.getElementById('jobAlerts')?.checked || false,
                vendor_alerts: document.getElementById('vendorAlerts')?.checked || false,
                payment_alerts: document.getElementById('paymentAlerts')?.checked || false
            },
            display: {
                sidebar_collapsed: document.getElementById('sidebarCollapsed')?.checked || false,
                show_animations: document.getElementById('showAnimations')?.checked || false,
                compact_mode: document.getElementById('compactMode')?.checked || false
            },
            security: {
                session_timeout: document.getElementById('sessionTimeout')?.value || 30,
                require_2fa: document.getElementById('require2fa')?.checked || false,
                password_expiry: document.getElementById('passwordExpiry')?.value || 90,
                login_attempts: document.getElementById('loginAttempts')?.value || 5
            }
        };

        return data;
    }

    // Separate function for UI settings (localStorage)
    function saveUISettings() {
        const uiSettings = {
            sidebar_collapsed: document.getElementById('sidebarCollapsed')?.checked || false,
            show_animations: document.getElementById('showAnimations')?.checked || false,
            compact_mode: document.getElementById('compactMode')?.checked || false,
            theme: document.querySelector('.theme-option.active')?.getAttribute('data-theme') || 'default'
        };

        // Save UI settings to localStorage immediately
        localStorage.setItem('ui_settings', JSON.stringify(uiSettings));

        // Apply UI changes immediately
        applyUISettings(uiSettings);

        console.log('UI settings saved to localStorage:', uiSettings);
    }

    // Apply UI settings immediately
    function applyUISettings(settings) {
        // Apply sidebar collapse
        if (settings.sidebar_collapsed) {
            document.body.classList.add('sidebar-collapsed');
        } else {
            document.body.classList.remove('sidebar-collapsed');
        }

        // Apply animations
        if (!settings.show_animations) {
            document.body.classList.add('no-animations');
        } else {
            document.body.classList.remove('no-animations');
        }

        // Apply compact mode
        if (settings.compact_mode) {
            document.body.classList.add('compact-mode');
        } else {
            document.body.classList.remove('compact-mode');
        }

        // Apply theme
        document.body.classList.remove('theme-blue', 'theme-purple', 'theme-green');
        if (settings.theme && settings.theme !== 'default') {
            document.body.classList.add(`theme-${settings.theme}`);
        }

        console.log('UI settings applied:', settings);
    }

    function resetSettings() {
        // Show confirmation dialog
        if (confirm('Are you sure you want to reset all settings to default? This action cannot be undone.')) {
            // Show loading state
            const resetBtn = document.getElementById('resetSettings');
            const originalText = resetBtn.innerHTML;
            resetBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Resetting...';
            resetBtn.disabled = true;

            // Simulate reset process
            setTimeout(() => {
                // Reset form fields to default values
                resetFormFields();

                // Reset button state
                resetBtn.innerHTML = originalText;
                resetBtn.disabled = false;

                // Show success notification
                window.themeManager.showNotification('Settings reset to default!', 'success');
            }, 1000);
        }
    }

    function resetFormFields() {
        // Reset to default values
        const defaults = {
            'companyName': 'Jobs CRM',
            'adminEmail': 'admin@jobscrm.com',
            'timezone': 'Asia/Karachi',
            'dateFormat': 'd/m/Y',
            'sessionTimeout': '30',
            'passwordExpiry': '90',
            'loginAttempts': '5'
        };

        Object.keys(defaults).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.value = defaults[id];
            }
        });

        // Reset checkboxes
        const checkboxes = ['emailNotifications', 'jobAlerts', 'vendorAlerts', 'paymentAlerts', 'showAnimations'];
        checkboxes.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.checked = true;
            }
        });

        const uncheckedBoxes = ['smsNotifications', 'sidebarCollapsed', 'compactMode', 'require2fa'];
        uncheckedBoxes.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.checked = false;
            }
        });
    }

    function clearCache() {
        const btn = document.getElementById('clearCache');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Clearing...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            window.themeManager.showNotification('Cache cleared successfully!', 'success');
        }, 2000);
    }

    function optimizeDatabase() {
        const btn = document.getElementById('optimizeDatabase');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Optimizing...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            window.themeManager.showNotification('Database optimized successfully!', 'success');
        }, 3000);
    }

    function exportData() {
        const btn = document.getElementById('exportData');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Exporting...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            window.themeManager.showNotification('Data exported successfully!', 'success');
        }, 2500);
    }

    function createBackup() {
        const btn = document.getElementById('backupSystem');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            window.themeManager.showNotification('System backup created successfully!', 'success');
        }, 4000);
    }

    // Password change functionality
    function changePassword() {
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validation
        if (!currentPassword || !newPassword || !confirmPassword) {
            window.themeManager.showNotification('Please fill in all password fields', 'error');
            return;
        }

        if (newPassword !== confirmPassword) {
            window.themeManager.showNotification('New passwords do not match', 'error');
            return;
        }

        if (newPassword.length < 8) {
            window.themeManager.showNotification('Password must be at least 8 characters long', 'error');
            return;
        }

        // Show loading state
        const btn = document.getElementById('changePasswordBtn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Changing...';
        btn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Reset form
            document.getElementById('currentPassword').value = '';
            document.getElementById('newPassword').value = '';
            document.getElementById('confirmPassword').value = '';

            // Reset button
            btn.innerHTML = originalText;
            btn.disabled = false;

            // Show success message
            window.themeManager.showNotification('Password changed successfully!', 'success');

            // Reset password strength
            resetPasswordStrength();
        }, 2000);
    }

    // Password strength checker
    function checkPasswordStrength(password) {
        const strengthFill = document.getElementById('strengthFill');
        const strengthText = document.getElementById('strengthText');

        if (!password) {
            resetPasswordStrength();
            return;
        }

        let strength = 0;
        let feedback = [];

        // Length check
        if (password.length >= 8) {
            strength += 25;
            feedback.push('Good length');
        } else {
            feedback.push('Too short (min 8 characters)');
        }

        // Uppercase check
        if (/[A-Z]/.test(password)) {
            strength += 25;
            feedback.push('Has uppercase');
        } else {
            feedback.push('Add uppercase letter');
        }

        // Lowercase check
        if (/[a-z]/.test(password)) {
            strength += 25;
            feedback.push('Has lowercase');
        } else {
            feedback.push('Add lowercase letter');
        }

        // Number check
        if (/\d/.test(password)) {
            strength += 25;
            feedback.push('Has number');
        } else {
            feedback.push('Add number');
        }

        // Update UI
        strengthFill.className = 'strength-fill';

        if (strength <= 25) {
            strengthFill.classList.add('weak');
            strengthText.textContent = 'Weak password';
            strengthText.style.color = '#ef4444';
        } else if (strength <= 50) {
            strengthFill.classList.add('fair');
            strengthText.textContent = 'Fair password';
            strengthText.style.color = '#f59e0b';
        } else if (strength <= 75) {
            strengthFill.classList.add('good');
            strengthText.textContent = 'Good password';
            strengthText.style.color = '#10b981';
        } else {
            strengthFill.classList.add('strong');
            strengthText.textContent = 'Strong password';
            strengthText.style.color = '#059669';
        }
    }

    // Reset password strength
    function resetPasswordStrength() {
        const strengthFill = document.getElementById('strengthFill');
        const strengthText = document.getElementById('strengthText');

        if (strengthFill) {
            strengthFill.className = 'strength-fill';
        }
        if (strengthText) {
            strengthText.textContent = 'Password strength';
            strengthText.style.color = '';
        }
    }

    function showAutoSaveIndicator() {
        // Create or update auto-save indicator
        let indicator = document.querySelector('.auto-save-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'auto-save-indicator';
            indicator.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(99, 102, 241, 0.9);
                color: white;
                padding: 10px 20px;
                border-radius: 8px;
                font-size: 0.9rem;
                z-index: 1000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            `;
            document.body.appendChild(indicator);
        }

        indicator.textContent = 'Auto-saving...';
        indicator.style.transform = 'translateX(0)';
    }

    function hideAutoSaveIndicator() {
        const indicator = document.querySelector('.auto-save-indicator');
        if (indicator) {
            indicator.style.transform = 'translateX(100%)';
            setTimeout(() => {
                indicator.remove();
            }, 300);
        }
    }

    function showSavedIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'saved-indicator';
        indicator.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(16, 185, 129, 0.9);
            color: white;
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 0.9rem;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        indicator.textContent = 'Settings saved!';
        document.body.appendChild(indicator);

        // Animate in
        setTimeout(() => {
            indicator.style.transform = 'translateX(0)';
        }, 100);

        // Animate out and remove
        setTimeout(() => {
            indicator.style.transform = 'translateX(100%)';
            setTimeout(() => {
                indicator.remove();
            }, 300);
        }, 3000);
    }

    function initializeAnimations() {
        // Animate settings panels on load
        const panels = document.querySelectorAll('.settings-panel');
        panels.forEach((panel, index) => {
            panel.style.opacity = '0';
            panel.style.transform = 'translateY(20px)';

            setTimeout(() => {
                panel.style.transition = 'all 0.5s ease';
                panel.style.opacity = '1';
                panel.style.transform = 'translateY(0)';
            }, index * 100);
        });

        // Animate theme options
        const themeOptions = document.querySelectorAll('.theme-option');
        themeOptions.forEach((option, index) => {
            option.style.opacity = '0';
            option.style.transform = 'scale(0.8)';

            setTimeout(() => {
                option.style.transition = 'all 0.3s ease';
                option.style.opacity = '1';
                option.style.transform = 'scale(1)';
            }, 500 + index * 100);
        });
    }

    // Load saved settings on page load
    function loadSavedSettings() {
        // Load UI settings from localStorage
        const savedUISettings = localStorage.getItem('ui_settings');
        if (savedUISettings) {
            try {
                const uiSettings = JSON.parse(savedUISettings);
                applySavedUISettings(uiSettings);
                console.log('UI settings loaded from localStorage:', uiSettings);
            } catch (error) {
                console.error('Error loading UI settings:', error);
            }
        }

        // Load other settings from localStorage
        const savedSettings = localStorage.getItem('settings');
        if (savedSettings) {
            try {
                const settings = JSON.parse(savedSettings);
                applySavedSettings(settings);
            } catch (error) {
                console.error('Error loading saved settings:', error);
            }
        }

        // Load saved theme
        const savedTheme = localStorage.getItem('selectedTheme');
        if (savedTheme) {
            const themeOption = document.querySelector(`[data-theme="${savedTheme}"]`);
            if (themeOption) {
                themeOptions.forEach(opt => opt.classList.remove('active'));
                themeOption.classList.add('active');
                applyTheme(savedTheme);
            }
        }
    }

    // Apply saved UI settings
    function applySavedUISettings(uiSettings) {
        // Set checkbox states
        if (uiSettings.sidebar_collapsed !== undefined) {
            const sidebarCheckbox = document.getElementById('sidebarCollapsed');
            if (sidebarCheckbox) {
                sidebarCheckbox.checked = uiSettings.sidebar_collapsed;
            }
        }

        if (uiSettings.show_animations !== undefined) {
            const animationsCheckbox = document.getElementById('showAnimations');
            if (animationsCheckbox) {
                animationsCheckbox.checked = uiSettings.show_animations;
            }
        }

        if (uiSettings.compact_mode !== undefined) {
            const compactCheckbox = document.getElementById('compactMode');
            if (compactCheckbox) {
                compactCheckbox.checked = uiSettings.compact_mode;
            }
        }

        // Apply UI changes
        applyUISettings(uiSettings);
    }

    function applySavedSettings(settings) {
        // Apply general settings
        if (settings.general) {
            Object.keys(settings.general).forEach(key => {
                const element = document.getElementById(key.replace('_', ''));
                if (element) {
                    element.value = settings.general[key];
                }
            });
        }

        // Apply notification settings
        if (settings.notifications) {
            Object.keys(settings.notifications).forEach(key => {
                const element = document.getElementById(key.replace('_', ''));
                if (element) {
                    element.checked = settings.notifications[key];
                }
            });
        }

        // Apply display settings
        if (settings.display) {
            Object.keys(settings.display).forEach(key => {
                const element = document.getElementById(key.replace('_', ''));
                if (element) {
                    element.checked = settings.display[key];
                }
            });
        }

        // Apply security settings
        if (settings.security) {
            Object.keys(settings.security).forEach(key => {
                const element = document.getElementById(key.replace('_', ''));
                if (element) {
                    if (element.type === 'checkbox') {
                        element.checked = settings.security[key];
                    } else {
                        element.value = settings.security[key];
                    }
                }
            });
        }
    }

    // Initialize saved settings
    loadSavedSettings();
});
