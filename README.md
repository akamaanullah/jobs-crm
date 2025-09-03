# Jobs CRM System

A comprehensive Customer Relationship Management system designed specifically for job management and recruitment processes.

**🚧 This project is currently in active development phase. Features and functionality may change as development progresses. 🚧**

## 🚀 Features

- **Admin Dashboard**: Complete job management system
- **User Portal**: Job seekers can browse and apply for jobs
- **Real-time Updates**: WebSocket-based notifications and updates
- **Responsive Design**: Mobile-friendly interface
- **Activity Tracking**: Monitor all system activities
- **Reports & Analytics**: Comprehensive reporting system
- **Vendor Management**: Manage third-party vendors
- **Settings Management**: Customizable system settings

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: PHP
- **Database**: MySQL
- **Real-time**: WebSockets
- **Server**: XAMPP (Apache)

## 📁 Project Structure

```
jobs-crm/
├── admin/           # Admin panel files
├── user/            # User portal files
├── assets/          # CSS, JS, and images
├── index.php        # Main entry point
└── README.md        # This file
```

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/akamaanullah/jobs-crm.git
   cd jobs-crm
   ```

2. **Setup XAMPP**
   - Install XAMPP on your system
   - Copy project to `htdocs/` folder
   - Start Apache and MySQL services

3. **Database Setup**
   - Create a new MySQL database
   - Import the database schema (if available)

4. **Configuration**
   - Update database connection settings
   - Configure WebSocket settings

## 🔧 Configuration

Update the database configuration in your PHP files:

```php
$host = 'localhost';
$dbname = 'jobs_crm';
$username = 'your_username';
$password = 'your_password';
```

## 📱 Usage

### Admin Panel
- Access: `http://localhost/jobs-crm/admin/`
- Manage jobs, users, and system settings
- View reports and analytics

### User Portal
- Access: `http://localhost/jobs-crm/user/`
- Browse available jobs
- Apply for positions
- Track applications

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ak Amaanullah**
- 🌐 **Portfolio**: [amaanullah.com](https://amaanullah.com)
- 💼 **LinkedIn**: [@akamaanullah](https://linkedin.com/in/akamaanullah)
- 📸 **Instagram**: [@akamaanullah](https://instagram.com/akamaanullah)
- 🐦 **Twitter**: [@akamaanullah](https://twitter.com/akamaanullah)
- 🔧 **GitHub**: [@akamaanullah](https://github.com/akamaanullah)

## 🚧 Development Status

**Current Phase**: Active Development
- Core functionality is being implemented
- Features are being tested and refined
- UI/UX improvements are ongoing
- Performance optimizations in progress

## 🙏 Acknowledgments

- XAMPP community
- PHP community
- All contributors and supporters

---

⭐ Star this repository if you find it helpful!

**Note**: This project is actively being developed. Please check back regularly for updates and new features!
