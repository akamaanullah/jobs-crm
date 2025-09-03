<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jobs CRM - Login</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    <div class="login-container">
        <div class="login-card">
            <div class="login-header">
                <div class="logo">
                    <i class="fas fa-briefcase"></i>
                    <h1>Jobs CRM</h1>
                </div>
                <p class="subtitle">Professional Job Management System</p>
            </div>
            
            <form class="login-form" id="loginForm">
                <div class="form-group">
                    <label for="username">
                        <i class="fas fa-user"></i>
                        Username
                    </label>
                    <input type="text" id="username" name="username" required placeholder="Enter your username">
                </div>
                
                <div class="form-group">
                    <label for="password">
                        <i class="fas fa-lock"></i>
                        Password
                    </label>
                    <div class="password-input">
                        <input type="password" id="password" name="password" required placeholder="Enter your password">
                        <button type="button" class="toggle-password" id="togglePassword">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                
                <button type="submit" class="login-btn">
                    <i class="fas fa-sign-in-alt"></i>
                    Login
                </button>
            </form>
            
            <div class="login-footer">
                <div class="theme-switcher">
                    <span>Theme:</span>
                    <button class="theme-btn active" data-theme="default">Blue</button>
                    <button class="theme-btn" data-theme="purple">Purple</button>
                    <button class="theme-btn" data-theme="green">Green</button>
                </div>
                <p>&copy; 2024 Jobs CRM. All rights reserved.</p>
            </div>
        </div>
    </div>

    <script src="assets/js/theme-manager.js"></script>
    <script src="assets/js/login.js"></script>
</body>
</html>
