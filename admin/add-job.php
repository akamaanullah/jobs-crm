<?php
$page_title = 'Add Job';
include 'includes/header.php';
?>

<!-- Add Job Content -->
<div class="dashboard-content">
    <div class="dashboard-card">
        <div class="card-header">
            <h3>Add New Job</h3>
        </div>
        <div class="card-content">
            <form class="job-form" enctype="multipart/form-data">
                <!-- Store Information -->
                <div class="form-section">
                    <h4 class="section-title">
                        <i class="fas fa-store"></i>
                        Store Information
                    </h4>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="storeName">Store Name *</label>
                            <input type="text" id="storeName" name="storeName" required placeholder="Enter store name">
                        </div>
                        <div class="form-group">
                            <label for="jobType">Job Type *</label>
                            <select id="jobType" name="jobType" required>
                                <option value="">Select job type</option>
                                <option value="development">Development</option>
                                <option value="design">Design</option>
                                <option value="marketing">Marketing</option>
                                <option value="consulting">Consulting</option>
                                <option value="maintenance">Maintenance</option>
                                <option value="installation">Installation</option>
                                <option value="repair">Repair</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="address">Address *</label>
                        <textarea id="address" name="address" rows="3" required
                            placeholder="Enter complete store address"></textarea>
                    </div>
                </div>

                <!-- Job Details -->
                <div class="form-section">
                    <h4 class="section-title">
                        <i class="fas fa-tasks"></i>
                        Job Details
                    </h4>
                    <div class="form-group">
                        <label for="jobDetail">Job Detail *</label>
                        <textarea id="jobDetail" name="jobDetail" rows="5" required
                            placeholder="Describe the job requirements, specifications, and what needs to be done"></textarea>
                    </div>
                </div>

                <!-- Job SLA -->
                <div class="form-section">
                    <h4 class="section-title">
                        <i class="fas fa-clock"></i>
                        Service Level Agreement (SLA)
                    </h4>
                    <div class="form-group">
                        <label for="jobSLA">Job SLA Deadline *</label>
                        <input type="datetime-local" id="jobSLA" name="jobSLA" required>
                    </div>
                </div>

                <!-- Pictures Upload -->
                <div class="form-section">
                    <h4 class="section-title">
                        <i class="fas fa-images"></i>
                        Add Pictures
                    </h4>
                    <div class="form-group">
                        <label for="jobPictures">Upload Pictures</label>
                        <div class="file-upload-area">
                            <input type="file" id="jobPictures" name="jobPictures[]" multiple accept="image/*"
                                class="file-input">
                            <div class="file-upload-content">
                                <i class="fas fa-cloud-upload-alt"></i>
                                <p>Click to upload or drag and drop</p>
                                <span>PNG, JPG, JPEG up to 10MB each</span>
                            </div>
                        </div>
                        <div id="imagePreview" class="image-preview-grid"></div>
                    </div>
                </div>

                <!-- Additional Notes -->
                <div class="form-section">
                    <h4 class="section-title">
                        <i class="fas fa-sticky-note"></i>
                        Additional Notes
                    </h4>
                    <div class="form-group">
                        <label for="additionalNotes">Additional Notes</label>
                        <textarea id="additionalNotes" name="additionalNotes" rows="4"
                            placeholder="Any additional information, special requirements, or notes about this job"></textarea>
                    </div>
                </div>

                <div class="form-actions">
                    <button type="submit" class="btn-primary">
                        <i class="fas fa-plus"></i>
                        Add Job
                    </button>
                    <button type="button" class="btn-secondary" onclick="history.back()">
                        <i class="fas fa-times"></i>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<?php include 'includes/footer.php'; ?>