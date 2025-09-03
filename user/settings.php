<?php
$page_title = 'Settings';
include 'includes/header.php';

// Sample user data (in real app, this would come from database)
$userData = [
    'id' => 1,
    'name' => 'John Doe',
    'email' => 'john.doe@email.com',
    'phone' => '+92 (300) 123-4567',
    'avatar' => 'avatar.png',
    'company' => 'ABC Company',
    'address' => '123 Main Street, Downtown',
    'city' => 'New York, NY 10001',
    'timezone' => 'America/New_York',
    'language' => 'en',
    'currency' => 'USD',
    'notifications' => [
        'email_notifications' => true,
        'sms_notifications' => false,
        'push_notifications' => true,
        'job_updates' => true,
        'vendor_updates' => true,
        'payment_updates' => true,
        'system_updates' => false
    ],
    'security' => [
        'two_factor_auth' => false,
        'login_alerts' => true,
        'password_changed' => '2024-12-01'
    ]
];
?>

<!-- Settings Content -->
<div class="user-settings-content">
    <!-- Page Header -->
    <div class="user-page-header">
        <div class="user-page-header-left">
            <h1>Settings</h1>
            <p>Manage your account preferences and security settings</p>
        </div>
        <div class="user-page-header-actions">
            <button class="user-btn-primary" id="saveAllSettings">
                <i class="fas fa-save"></i>
                Save All Changes
            </button>
        </div>
    </div>

    <!-- Settings Navigation -->
    <div class="user-settings-nav">
        <button class="user-settings-tab active" data-tab="profile">
            <i class="fas fa-user"></i>
            Profile
        </button>
        <button class="user-settings-tab" data-tab="notifications">
            <i class="fas fa-bell"></i>
            Notifications
        </button>
        <button class="user-settings-tab" data-tab="security">
            <i class="fas fa-shield-alt"></i>
            Security
        </button>
        <button class="user-settings-tab" data-tab="preferences">
            <i class="fas fa-cog"></i>
            Preferences
        </button>
        <button class="user-settings-tab" data-tab="billing">
            <i class="fas fa-credit-card"></i>
            Billing
        </button>
    </div>

    <!-- Settings Content -->
    <div class="user-settings-content-area">
        <!-- Profile Settings -->
        <div class="user-settings-tab-content active" id="profile">
            <div class="user-settings-section">
                <div class="user-section-header">
                    <h3><i class="fas fa-user"></i> Profile Information</h3>
                    <p>Update your personal and company information</p>
                </div>

                <form class="user-settings-form" id="profileForm">
                    <div class="user-form-section">
                        <div class="user-section-title">
                            <i class="fas fa-user-circle"></i>
                            <span>Personal Details</span>
                        </div>

                        <div class="user-avatar-section">
                            <div class="user-avatar-preview">
                                <img src="../assets/images/<?php echo $userData['avatar']; ?>" alt="Profile Avatar" id="avatarPreview">
                                <div class="user-avatar-overlay">
                                    <i class="fas fa-camera"></i>
                                </div>
                            </div>
                            <div class="user-avatar-actions">
                                <button type="button" class="user-btn-secondary" id="changeAvatar">
                                    <i class="fas fa-upload"></i>
                                    Change Avatar
                                </button>
                                <button type="button" class="user-btn-link" id="removeAvatar">
                                    <i class="fas fa-trash"></i>
                                    Remove
                                </button>
                            </div>
                            <input type="file" id="avatarInput" accept="image/*" style="display: none;">
                        </div>

                        <div class="user-form-row">
                            <div class="user-form-group">
                                <label for="fullName">Full Name *</label>
                                <input type="text" id="fullName" name="fullName" value="<?php echo $userData['name']; ?>" required>
                            </div>
                            <div class="user-form-group">
                                <label for="email">Email Address *</label>
                                <input type="email" id="email" name="email" value="<?php echo $userData['email']; ?>" required>
                            </div>
                        </div>

                        <div class="user-form-row">
                            <div class="user-form-group">
                                <label for="phone">Phone Number</label>
                                <input type="tel" id="phone" name="phone" value="<?php echo $userData['phone']; ?>">
                            </div>
                            <div class="user-form-group">
                                <label for="company">Company Name</label>
                                <input type="text" id="company" name="company" value="<?php echo $userData['company']; ?>">
                            </div>
                        </div>
                    </div>

                    <div class="user-form-section">
                        <div class="user-section-title">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Address Information</span>
                        </div>

                        <div class="user-form-group">
                            <label for="address">Street Address</label>
                            <input type="text" id="address" name="address" value="<?php echo $userData['address']; ?>">
                        </div>

                        <div class="user-form-row">
                            <div class="user-form-group">
                                <label for="city">City</label>
                                <input type="text" id="city" name="city" value="<?php echo $userData['city']; ?>">
                            </div>
                            <div class="user-form-group">
                                <label for="zipCode">ZIP Code</label>
                                <input type="text" id="zipCode" name="zipCode" placeholder="Enter ZIP code">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <!-- Notifications Settings -->
        <div class="user-settings-tab-content" id="notifications">
            <div class="user-settings-section">
                <div class="user-section-header">
                    <h3><i class="fas fa-bell"></i> Notification Preferences</h3>
                    <p>Choose how and when you want to be notified</p>
                </div>

                <form class="user-settings-form" id="notificationsForm">
                    <div class="user-form-section">
                        <div class="user-section-title">
                            <i class="fas fa-envelope"></i>
                            <span>Notification Channels</span>
                        </div>

                        <div class="user-form-group">
                            <label class="user-checkbox-option">
                                <input type="checkbox" name="email_notifications" <?php echo $userData['notifications']['email_notifications'] ? 'checked' : ''; ?>>
                                <span class="user-checkbox-custom"></span>
                                <span class="user-checkbox-label">Email Notifications</span>
                                <span class="user-checkbox-description">Receive notifications via email</span>
                            </label>
                        </div>

                        <div class="user-form-group">
                            <label class="user-checkbox-option">
                                <input type="checkbox" name="sms_notifications" <?php echo $userData['notifications']['sms_notifications'] ? 'checked' : ''; ?>>
                                <span class="user-checkbox-custom"></span>
                                <span class="user-checkbox-label">SMS Notifications</span>
                                <span class="user-checkbox-description">Receive notifications via SMS</span>
                            </label>
                        </div>

                        <div class="user-form-group">
                            <label class="user-checkbox-option">
                                <input type="checkbox" name="push_notifications" <?php echo $userData['notifications']['push_notifications'] ? 'checked' : ''; ?>>
                                <span class="user-checkbox-custom"></span>
                                <span class="user-checkbox-label">Push Notifications</span>
                                <span class="user-checkbox-description">Receive notifications in browser</span>
                            </label>
                        </div>
                    </div>

                    <div class="user-form-section">
                        <div class="user-section-title">
                            <i class="fas fa-briefcase"></i>
                            <span>Job & Vendor Updates</span>
                        </div>

                        <div class="user-form-group">
                            <label class="user-checkbox-option">
                                <input type="checkbox" name="job_updates" <?php echo $userData['notifications']['job_updates'] ? 'checked' : ''; ?>>
                                <span class="user-checkbox-custom"></span>
                                <span class="user-checkbox-label">Job Status Updates</span>
                                <span class="user-checkbox-description">Get notified about job progress</span>
                            </label>
                        </div>

                        <div class="user-form-group">
                            <label class="user-checkbox-option">
                                <input type="checkbox" name="vendor_updates" <?php echo $userData['notifications']['vendor_updates'] ? 'checked' : ''; ?>>
                                <span class="user-checkbox-custom"></span>
                                <span class="user-checkbox-label">Vendor Assignments</span>
                                <span class="user-checkbox-description">Get notified when vendors are assigned</span>
                            </label>
                        </div>

                        <div class="user-form-group">
                            <label class="user-checkbox-option">
                                <input type="checkbox" name="payment_updates" <?php echo $userData['notifications']['payment_updates'] ? 'checked' : ''; ?>>
                                <span class="user-checkbox-custom"></span>
                                <span class="user-checkbox-label">Payment Updates</span>
                                <span class="user-checkbox-description">Get notified about payment status</span>
                            </label>
                        </div>

                        <div class="user-form-group">
                            <label class="user-checkbox-option">
                                <input type="checkbox" name="system_updates" <?php echo $userData['notifications']['system_updates'] ? 'checked' : ''; ?>>
                                <span class="user-checkbox-custom"></span>
                                <span class="user-checkbox-label">System Updates</span>
                                <span class="user-checkbox-description">Get notified about system maintenance</span>
                            </label>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <!-- Security Settings -->
        <div class="user-settings-tab-content" id="security">
            <div class="user-settings-section">
                <div class="user-section-header">
                    <h3><i class="fas fa-shield-alt"></i> Security Settings</h3>
                    <p>Manage your account security and privacy</p>
                </div>

                <form class="user-settings-form" id="securityForm">
                    <div class="user-form-section">
                        <div class="user-section-title">
                            <i class="fas fa-lock"></i>
                            <span>Password & Authentication</span>
                        </div>

                        <div class="user-form-group">
                            <label for="currentPassword">Current Password</label>
                            <input type="password" id="currentPassword" name="currentPassword" placeholder="Enter current password">
                        </div>

                        <div class="user-form-row">
                            <div class="user-form-group">
                                <label for="newPassword">New Password</label>
                                <input type="password" id="newPassword" name="newPassword" placeholder="Enter new password">
                            </div>
                            <div class="user-form-group">
                                <label for="confirmPassword">Confirm Password</label>
                                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm new password">
                            </div>
                        </div>

                        <div class="user-password-requirements">
                            <h5>Password Requirements:</h5>
                            <ul>
                                <li>At least 8 characters long</li>
                                <li>Contains uppercase and lowercase letters</li>
                                <li>Contains at least one number</li>
                                <li>Contains at least one special character</li>
                            </ul>
                        </div>
                    </div>

                    <div class="user-form-section">
                        <div class="user-section-title">
                            <i class="fas fa-mobile-alt"></i>
                            <span>Two-Factor Authentication</span>
                        </div>

                        <div class="user-form-group">
                            <label class="user-checkbox-option">
                                <input type="checkbox" name="two_factor_auth" <?php echo $userData['security']['two_factor_auth'] ? 'checked' : ''; ?>>
                                <span class="user-checkbox-custom"></span>
                                <span class="user-checkbox-label">Enable Two-Factor Authentication</span>
                                <span class="user-checkbox-description">Add an extra layer of security to your account</span>
                            </label>
                        </div>

                        <div class="user-form-group">
                            <label class="user-checkbox-option">
                                <input type="checkbox" name="login_alerts" <?php echo $userData['security']['login_alerts'] ? 'checked' : ''; ?>>
                                <span class="user-checkbox-custom"></span>
                                <span class="user-checkbox-label">Login Alerts</span>
                                <span class="user-checkbox-description">Get notified about new login attempts</span>
                            </label>
                        </div>

                        <div class="user-security-info">
                            <p><strong>Last Password Change:</strong> <?php echo date('M d, Y', strtotime($userData['security']['password_changed'])); ?></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <!-- Preferences Settings -->
        <div class="user-settings-tab-content" id="preferences">
            <div class="user-settings-section">
                <div class="user-section-header">
                    <h3><i class="fas fa-cog"></i> System Preferences</h3>
                    <p>Customize your system experience</p>
                </div>

                <form class="user-settings-form" id="preferencesForm">
                    <div class="user-form-section">
                        <div class="user-section-title">
                            <i class="fas fa-globe"></i>
                            <span>Language & Region</span>
                        </div>

                        <div class="user-form-row">
                            <div class="user-form-group">
                                <label for="language">Language</label>
                                <select id="language" name="language">
                                    <option value="en" <?php echo $userData['language'] === 'en' ? 'selected' : ''; ?>>English</option>
                                    <option value="es" <?php echo $userData['language'] === 'es' ? 'selected' : ''; ?>>Español</option>
                                    <option value="fr" <?php echo $userData['language'] === 'fr' ? 'selected' : ''; ?>>Français</option>
                                    <option value="de" <?php echo $userData['language'] === 'de' ? 'selected' : ''; ?>>Deutsch</option>
                                    <option value="ur" <?php echo $userData['language'] === 'ur' ? 'selected' : ''; ?>>اردو</option>
                                </select>
                            </div>
                            <div class="user-form-group">
                                <label for="timezone">Timezone</label>
                                <select id="timezone" name="timezone">
                                    <option value="America/New_York" <?php echo $userData['timezone'] === 'America/New_York' ? 'selected' : ''; ?>>Eastern Time (ET)</option>
                                    <option value="America/Chicago" <?php echo $userData['timezone'] === 'America/Chicago' ? 'selected' : ''; ?>>Central Time (CT)</option>
                                    <option value="America/Denver" <?php echo $userData['timezone'] === 'America/Denver' ? 'selected' : ''; ?>>Mountain Time (MT)</option>
                                    <option value="America/Los_Angeles" <?php echo $userData['timezone'] === 'America/Los_Angeles' ? 'selected' : ''; ?>>Pacific Time (PT)</option>
                                    <option value="Asia/Karachi" <?php echo $userData['timezone'] === 'Asia/Karachi' ? 'selected' : ''; ?>>Pakistan Time (PKT)</option>
                                    <option value="UTC" <?php echo $userData['timezone'] === 'UTC' ? 'selected' : ''; ?>>UTC</option>
                                </select>
                            </div>
                        </div>

                        <div class="user-form-group">
                            <label for="currency">Currency</label>
                            <select id="currency" name="currency">
                                <option value="USD" <?php echo $userData['currency'] === 'USD' ? 'selected' : ''; ?>>US Dollar ($)</option>
                                <option value="EUR" <?php echo $userData['currency'] === 'EUR' ? 'selected' : ''; ?>>Euro (€)</option>
                                <option value="GBP" <?php echo $userData['currency'] === 'GBP' ? 'selected' : ''; ?>>British Pound (£)</option>
                                <option value="PKR" <?php echo $userData['currency'] === 'PKR' ? 'selected' : ''; ?>>Pakistani Rupee (₨)</option>
                            </select>
                        </div>
                    </div>

                    <div class="user-form-section">
                        <div class="user-section-title">
                            <i class="fas fa-palette"></i>
                            <span>Display & Theme</span>
                        </div>

                        <div class="user-form-group">
                            <label for="theme">Theme</label>
                            <select id="theme" name="theme">
                                <option value="light">Light Theme</option>
                                <option value="dark">Dark Theme</option>
                                <option value="auto">Auto (System)</option>
                            </select>
                        </div>

                        <div class="user-form-group">
                            <label for="fontSize">Font Size</label>
                            <select id="fontSize" name="fontSize">
                                <option value="small">Small</option>
                                <option value="medium" selected>Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <!-- Billing Settings -->
        <div class="user-settings-tab-content" id="billing">
            <div class="user-settings-section">
                <div class="user-section-header">
                    <h3><i class="fas fa-credit-card"></i> Billing & Subscription</h3>
                    <p>Manage your billing information and subscription</p>
                </div>

                <div class="user-billing-info">
                    <div class="user-billing-card">
                        <div class="user-billing-header">
                            <h4>Current Plan</h4>
                            <span class="user-plan-badge">Free Plan</span>
                        </div>
                        <div class="user-billing-details">
                            <p>You are currently on the free plan with basic features.</p>
                            <ul>
                                <li>Up to 5 active jobs</li>
                                <li>Basic vendor management</li>
                                <li>Standard support</li>
                            </ul>
                        </div>
                        <button class="user-btn-primary" id="upgradePlan">
                            <i class="fas fa-arrow-up"></i>
                            Upgrade Plan
                        </button>
                    </div>

                    <div class="user-billing-card">
                        <div class="user-billing-header">
                            <h4>Payment Methods</h4>
                        </div>
                        <div class="user-billing-details">
                            <p>No payment methods added yet.</p>
                        </div>
                        <button class="user-btn-secondary" id="addPaymentMethod">
                            <i class="fas fa-plus"></i>
                            Add Payment Method
                        </button>
                    </div>

                    <div class="user-billing-card">
                        <div class="user-billing-header">
                            <h4>Billing History</h4>
                        </div>
                        <div class="user-billing-details">
                            <p>No billing history available.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
// Settings Tab Navigation
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.user-settings-tab');
    const tabContents = document.querySelectorAll('.user-settings-tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Avatar Upload
    const avatarInput = document.getElementById('avatarInput');
    const changeAvatarBtn = document.getElementById('changeAvatar');
    const avatarPreview = document.getElementById('avatarPreview');

    changeAvatarBtn.addEventListener('click', function() {
        avatarInput.click();
    });

    avatarInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                avatarPreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Remove Avatar
    document.getElementById('removeAvatar').addEventListener('click', function() {
        avatarPreview.src = '../assets/images/avatar.png';
        avatarInput.value = '';
    });

    // Save All Settings
    document.getElementById('saveAllSettings').addEventListener('click', function() {
        saveAllSettings();
    });

    // Upgrade Plan
    document.getElementById('upgradePlan').addEventListener('click', function() {
        alert('Upgrade plan functionality coming soon!');
    });

    // Add Payment Method
    document.getElementById('addPaymentMethod').addEventListener('click', function() {
        alert('Add payment method functionality coming soon!');
    });
});

// Save All Settings
function saveAllSettings() {
    // Collect all form data
    const profileForm = document.getElementById('profileForm');
    const notificationsForm = document.getElementById('notificationsForm');
    const securityForm = document.getElementById('securityForm');
    const preferencesForm = document.getElementById('preferencesForm');

    const formData = new FormData();
    
    // Add profile data
    const profileData = new FormData(profileForm);
    for (let [key, value] of profileData.entries()) {
        formData.append(`profile_${key}`, value);
    }

    // Add notifications data
    const notificationCheckboxes = notificationsForm.querySelectorAll('input[type="checkbox"]');
    notificationCheckboxes.forEach(checkbox => {
        formData.append(`notification_${checkbox.name}`, checkbox.checked);
    });

    // Add security data
    const securityData = new FormData(securityForm);
    for (let [key, value] of securityData.entries()) {
        formData.append(`security_${key}`, value);
    }

    // Add preferences data
    const preferencesData = new FormData(preferencesForm);
    for (let [key, value] of preferencesData.entries()) {
        formData.append(`preference_${key}`, value);
    }

    // In real app, this would send data to server
    console.log('Saving settings:', Object.fromEntries(formData));
    
    // Show success message
    showNotification('Settings saved successfully!', 'success');
}

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `user-notification user-notification-${type}`;
    notification.innerHTML = `
        <div class="user-notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="user-notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;

    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);

    const closeBtn = notification.querySelector('.user-notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}
</script>

<?php include 'includes/footer.php'; ?>
