<?php
$page_title = 'Settings';
include 'includes/header.php';

// Sample settings data (in real app, this would come from database)
$settings = [
    'general' => [
        'company_name' => 'Jobs CRM',
        'admin_email' => 'admin@jobscrm.com',
        'timezone' => 'Asia/Karachi',
        'date_format' => 'd/m/Y',
        'time_format' => 'H:i'
    ],
    'notifications' => [
        'email_notifications' => true,
        'sms_notifications' => false,
        'job_alerts' => true,
        'vendor_alerts' => true,
        'payment_alerts' => true
    ],
    'display' => [
        'theme' => 'default',
        'sidebar_collapsed' => false,
        'show_animations' => true,
        'compact_mode' => false
    ],
    'security' => [
        'session_timeout' => 30,
        'require_2fa' => false,
        'password_expiry' => 90,
        'login_attempts' => 5
    ]
];
?>

<!-- Settings Content -->
<div class="dashboard-content">
    <!-- Page Header -->
    <div class="page-header">
        <div class="header-content">
            <h2>System Settings</h2>
            <p>Configure your system preferences and appearance</p>
        </div>
        <div class="header-actions">
            <button class="btn-secondary" id="resetSettings">
                <i class="fas fa-undo"></i>
                Reset to Default
            </button>
            <button class="btn-primary" id="saveSettings">
                <i class="fas fa-save"></i>
                Save Changes
            </button>
        </div>
    </div>

    <!-- Settings Tabs -->
    <div class="settings-container">
        <div class="settings-tabs">
            <button class="tab-btn active" data-tab="general">
                <i class="fas fa-cog"></i>
                General
            </button>
            <button class="tab-btn" data-tab="appearance">
                <i class="fas fa-palette"></i>
                Appearance
            </button>
            <button class="tab-btn" data-tab="notifications">
                <i class="fas fa-bell"></i>
                Notifications
            </button>
            <button class="tab-btn" data-tab="security">
                <i class="fas fa-shield-alt"></i>
                Security
            </button>
            <button class="tab-btn" data-tab="advanced">
                <i class="fas fa-tools"></i>
                Advanced
            </button>
        </div>

        <!-- Settings Content -->
        <div class="settings-content">
            <!-- General Settings -->
            <div class="settings-panel active" id="general">
                <div class="panel-header">
                    <h3>General Settings</h3>
                    <p>Basic system configuration and preferences</p>
                </div>
                
                <div class="settings-form">
                    <div class="form-group">
                        <label for="companyName">Company Name</label>
                        <input type="text" id="companyName" value="<?php echo $settings['general']['company_name']; ?>" class="form-control">
                    </div>
                    
                    <div class="form-group">
                        <label for="adminEmail">Admin Email</label>
                        <input type="email" id="adminEmail" value="<?php echo $settings['general']['admin_email']; ?>" class="form-control">
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="timezone">Timezone</label>
                            <select id="timezone" class="form-control">
                                <option value="Asia/Karachi" <?php echo $settings['general']['timezone'] === 'Asia/Karachi' ? 'selected' : ''; ?>>Asia/Karachi</option>
                                <option value="Asia/Dubai" <?php echo $settings['general']['timezone'] === 'Asia/Dubai' ? 'selected' : ''; ?>>Asia/Dubai</option>
                                <option value="Asia/Kolkata" <?php echo $settings['general']['timezone'] === 'Asia/Kolkata' ? 'selected' : ''; ?>>Asia/Kolkata</option>
                                <option value="UTC" <?php echo $settings['general']['timezone'] === 'UTC' ? 'selected' : ''; ?>>UTC</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="dateFormat">Date Format</label>
                            <select id="dateFormat" class="form-control">
                                <option value="d/m/Y" <?php echo $settings['general']['date_format'] === 'd/m/Y' ? 'selected' : ''; ?>>DD/MM/YYYY</option>
                                <option value="m/d/Y" <?php echo $settings['general']['date_format'] === 'm/d/Y' ? 'selected' : ''; ?>>MM/DD/YYYY</option>
                                <option value="Y-m-d" <?php echo $settings['general']['date_format'] === 'Y-m-d' ? 'selected' : ''; ?>>YYYY-MM-DD</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Appearance Settings -->
            <div class="settings-panel" id="appearance">
                <div class="panel-header">
                    <h3>Appearance Settings</h3>
                    <p>Customize the look and feel of your dashboard</p>
                </div>
                
                <div class="settings-form">
                    <div class="form-group">
                        <label>Theme Selection</label>
                        <div class="theme-options">
                            <div class="theme-option active" data-theme="default">
                                <div class="theme-preview blue-theme"></div>
                                <span>Blue Theme</span>
                            </div>
                            <div class="theme-option" data-theme="purple">
                                <div class="theme-preview purple-theme"></div>
                                <span>Purple Theme</span>
                            </div>
                            <div class="theme-option" data-theme="green">
                                <div class="theme-preview green-theme"></div>
                                <span>Green Theme</span>
                            </div>

                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" id="sidebarCollapsed" <?php echo $settings['display']['sidebar_collapsed'] ? 'checked' : ''; ?>>
                                <span class="checkmark"></span>
                                Collapse Sidebar by Default
                            </label>
                        </div>
                        
                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" id="showAnimations" <?php echo $settings['display']['show_animations'] ? 'checked' : ''; ?>>
                                <span class="checkmark"></span>
                                Show Animations
                            </label>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="checkbox-label">
                            <input type="checkbox" id="compactMode" <?php echo $settings['display']['compact_mode'] ? 'checked' : ''; ?>>
                            <span class="checkmark"></span>
                            Compact Mode (Reduced spacing)
                        </label>
                    </div>
                </div>
            </div>

            <!-- Notification Settings -->
            <div class="settings-panel" id="notifications">
                <div class="panel-header">
                    <h3>Notification Settings</h3>
                    <p>Configure how you receive notifications</p>
                </div>
                
                <div class="settings-form">
                    <div class="notification-section">
                        <h4>Email Notifications</h4>
                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" id="emailNotifications" <?php echo $settings['notifications']['email_notifications'] ? 'checked' : ''; ?>>
                                <span class="checkmark"></span>
                                Enable Email Notifications
                            </label>
                        </div>
                    </div>
                    
                    <div class="notification-section">
                        <h4>SMS Notifications</h4>
                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" id="smsNotifications" <?php echo $settings['notifications']['sms_notifications'] ? 'checked' : ''; ?>>
                                <span class="checkmark"></span>
                                Enable SMS Notifications
                            </label>
                        </div>
                    </div>
                    
                    <div class="notification-section">
                        <h4>Alert Types</h4>
                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" id="jobAlerts" <?php echo $settings['notifications']['job_alerts'] ? 'checked' : ''; ?>>
                                <span class="checkmark"></span>
                                Job Status Updates
                            </label>
                        </div>
                        
                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" id="vendorAlerts" <?php echo $settings['notifications']['vendor_alerts'] ? 'checked' : ''; ?>>
                                <span class="checkmark"></span>
                                Vendor Approvals
                            </label>
                        </div>
                        
                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" id="paymentAlerts" <?php echo $settings['notifications']['payment_alerts'] ? 'checked' : ''; ?>>
                                <span class="checkmark"></span>
                                Payment Confirmations
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Security Settings -->
            <div class="settings-panel" id="security">
                <div class="panel-header">
                    <h3>Security Settings</h3>
                    <p>Configure security and authentication settings</p>
                </div>
                
                <div class="settings-form">
                    <!-- Password Change Section -->
                    <div class="security-section">
                        <h4>Change Password</h4>
                        <div class="form-group">
                            <label for="currentPassword">Current Password</label>
                            <input type="password" id="currentPassword" class="form-control" placeholder="Enter current password">
                        </div>
                        
                        <div class="form-group">
                            <label for="newPassword">New Password</label>
                            <input type="password" id="newPassword" class="form-control" placeholder="Enter new password">
                            <div class="password-strength">
                                <div class="strength-bar">
                                    <div class="strength-fill" id="strengthFill"></div>
                                </div>
                                <div class="strength-text" id="strengthText">Password strength</div>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="confirmPassword">Confirm New Password</label>
                            <input type="password" id="confirmPassword" class="form-control" placeholder="Confirm new password">
                        </div>
                        
                        <div class="form-group">
                            <button class="btn-primary" id="changePasswordBtn">
                                <i class="fas fa-key"></i>
                                Change Password
                            </button>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="sessionTimeout">Session Timeout (minutes)</label>
                        <select id="sessionTimeout" class="form-control">
                            <option value="15" <?php echo $settings['security']['session_timeout'] === 15 ? 'selected' : ''; ?>>15 minutes</option>
                            <option value="30" <?php echo $settings['security']['session_timeout'] === 30 ? 'selected' : ''; ?>>30 minutes</option>
                            <option value="60" <?php echo $settings['security']['session_timeout'] === 60 ? 'selected' : ''; ?>>1 hour</option>
                            <option value="120" <?php echo $settings['security']['session_timeout'] === 120 ? 'selected' : ''; ?>>2 hours</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="loginAttempts">Maximum Login Attempts</label>
                        <select id="loginAttempts" class="form-control">
                            <option value="3" <?php echo $settings['security']['login_attempts'] === 3 ? 'selected' : ''; ?>>3 attempts</option>
                            <option value="5" <?php echo $settings['security']['login_attempts'] === 5 ? 'selected' : ''; ?>>5 attempts</option>
                            <option value="10" <?php echo $settings['security']['login_attempts'] === 10 ? 'selected' : ''; ?>>10 attempts</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="checkbox-label">
                            <input type="checkbox" id="require2fa" <?php echo $settings['security']['require_2fa'] ? 'checked' : ''; ?>>
                            <span class="checkmark"></span>
                            Require Two-Factor Authentication
                        </label>
                    </div>
                    
                    <div class="form-group">
                        <label for="passwordExpiry">Password Expiry (days)</label>
                        <select id="passwordExpiry" class="form-control">
                            <option value="30" <?php echo $settings['security']['password_expiry'] === 30 ? 'selected' : ''; ?>>30 days</option>
                            <option value="60" <?php echo $settings['security']['password_expiry'] === 60 ? 'selected' : ''; ?>>60 days</option>
                            <option value="90" <?php echo $settings['security']['password_expiry'] === 90 ? 'selected' : ''; ?>>90 days</option>
                            <option value="0" <?php echo $settings['security']['password_expiry'] === 0 ? 'selected' : ''; ?>>Never</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Advanced Settings -->
            <div class="settings-panel" id="advanced">
                <div class="panel-header">
                    <h3>Advanced Settings</h3>
                    <p>Advanced system configurations and maintenance</p>
                </div>
                
                <div class="settings-form">
                    <div class="advanced-section">
                        <h4>System Maintenance</h4>
                        <div class="form-group">
                            <button class="btn-secondary" id="clearCache">
                                <i class="fas fa-broom"></i>
                                Clear Cache
                            </button>
                            <button class="btn-secondary" id="optimizeDatabase">
                                <i class="fas fa-database"></i>
                                Optimize Database
                            </button>
                        </div>
                    </div>
                    
                    <div class="advanced-section">
                        <h4>Data Export</h4>
                        <div class="form-group">
                            <button class="btn-secondary" id="exportData">
                                <i class="fas fa-download"></i>
                                Export All Data
                            </button>
                            <button class="btn-secondary" id="backupSystem">
                                <i class="fas fa-save"></i>
                                Create Backup
                            </button>
                        </div>
                    </div>
                    
                    <div class="advanced-section">
                        <h4>System Information</h4>
                        <div class="system-info">
                            <div class="info-item">
                                <span class="info-label">PHP Version:</span>
                                <span class="info-value"><?php echo phpversion(); ?></span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Database:</span>
                                <span class="info-value">MySQL 8.0</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Server:</span>
                                <span class="info-value">Apache 2.4</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Last Updated:</span>
                                <span class="info-value"><?php echo date('d/m/Y H:i'); ?></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include 'includes/footer.php'; ?>
