document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.job-form');
    const fileInput = document.getElementById('jobPictures');
    const fileUploadArea = document.querySelector('.file-upload-area');
    const imagePreview = document.getElementById('imagePreview');
    const slaInput = document.getElementById('jobSLA');
    
    // Set minimum date for SLA (current date + 1 hour)
    if (slaInput) {
        const now = new Date();
        now.setHours(now.getHours() + 1); // Add 1 hour to current time
        const minDateTime = now.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:MM
        slaInput.min = minDateTime;
    }
    
    // File Upload Functionality
    if (fileInput && fileUploadArea) {
        // Drag and drop functionality
        fileUploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            fileUploadArea.classList.add('dragover');
        });
        
        fileUploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            fileUploadArea.classList.remove('dragover');
        });
        
        fileUploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            fileUploadArea.classList.remove('dragover');
            const files = e.dataTransfer.files;
            handleFiles(files);
        });
        
        // Click to upload
        fileUploadArea.addEventListener('click', function() {
            fileInput.click();
        });
        
        // File input change
        fileInput.addEventListener('change', function(e) {
            handleFiles(e.target.files);
        });
    }
    
    // Handle selected files
    function handleFiles(files) {
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    addImagePreview(e.target.result, file.name);
                };
                reader.readAsDataURL(file);
            } else {
                window.themeManager.showNotification('Please select only image files', 'error');
            }
        });
    }
    
    // Add image preview
    function addImagePreview(src, fileName) {
        const previewItem = document.createElement('div');
        previewItem.className = 'image-preview-item';
        previewItem.innerHTML = `
            <img src="${src}" alt="${fileName}">
            <button type="button" class="remove-image" title="Remove image">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Remove image functionality
        const removeBtn = previewItem.querySelector('.remove-image');
        removeBtn.addEventListener('click', function() {
            previewItem.remove();
            updateFileInput();
        });
        
        imagePreview.appendChild(previewItem);
    }
    
    // Update file input after removing images
    function updateFileInput() {
        const dt = new DataTransfer();
        const files = fileInput.files;
        
        // Keep track of remaining files
        const remainingFiles = Array.from(files).filter((file, index) => {
            // This is a simplified approach - in a real app you'd need more sophisticated tracking
            return true;
        });
        
        remainingFiles.forEach(file => dt.items.add(file));
        fileInput.files = dt.files;
    }
    
    // Form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = form.querySelector('.btn-primary');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding Job...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual AJAX call)
            setTimeout(() => {
                window.themeManager.showNotification('Job added successfully!', 'success');
                
                // Reset form
                form.reset();
                imagePreview.innerHTML = '';
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Redirect to dashboard after 2 seconds
                setTimeout(() => {
                    window.location.href = 'dashboard.php';
                }, 2000);
                
            }, 2000);
        });
    }
    
    // Form validation
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        field.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        
        // Remove existing error styling
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Validate based on field type
        let isValid = true;
        let errorMessage = '';
        
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (field.type === 'email' && value && !isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        } else if (field.type === 'number' && value) {
            const numValue = parseFloat(value);
            if (field.min && numValue < parseFloat(field.min)) {
                isValid = false;
                errorMessage = `Minimum value is ${field.min}`;
            } else if (field.max && numValue > parseFloat(field.max)) {
                isValid = false;
                errorMessage = `Maximum value is ${field.max}`;
            }
        } else if (field.type === 'datetime-local' && value) {
            const selectedDate = new Date(value);
            const currentDate = new Date();
            if (selectedDate <= currentDate) {
                isValid = false;
                errorMessage = 'SLA deadline must be in the future';
            }
        }
        
        if (!isValid) {
            field.classList.add('error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.textContent = errorMessage;
            field.parentNode.appendChild(errorDiv);
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Auto-save form data to localStorage
    const formFields = form.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        // Load saved data
        const savedValue = localStorage.getItem(`job_form_${field.name}`);
        if (savedValue && field.type !== 'file') {
            field.value = savedValue;
        }
        
        // Save data on input
        field.addEventListener('input', function() {
            if (field.type !== 'file') {
                localStorage.setItem(`job_form_${field.name}`, field.value);
            }
        });
    });
    
    // Clear saved data on successful submission
    form.addEventListener('submit', function() {
        formFields.forEach(field => {
            localStorage.removeItem(`job_form_${field.name}`);
        });
    });
});
