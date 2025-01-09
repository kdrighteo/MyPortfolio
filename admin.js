// DOM Elements
const loginForm = document.getElementById('loginForm');
const dashboard = document.getElementById('dashboard');
const adminLoginForm = document.getElementById('adminLoginForm');
const logoutBtn = document.getElementById('logoutBtn');
const projectForm = document.getElementById('projectForm');
const projectsList = document.getElementById('projectsList');
const imagePreview = document.createElement('img');
imagePreview.className = 'img-preview mb-3 d-none';
document.getElementById('projectImage').parentNode.insertBefore(imagePreview, document.getElementById('projectImage').nextSibling);

// Cloudinary configuration
const CLOUDINARY_CONFIG = {
    cloudName: 'your-cloud-name', // Replace with your cloud name
    uploadPreset: 'portfolio', // Replace with your upload preset
    apiKey: 'your-api-key' // Replace with your API key
};

// Admin credentials (in a real app, this would be handled server-side)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

// Check if user is logged in
function checkAuth() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    loginForm.classList.toggle('d-none', isLoggedIn);
    dashboard.classList.toggle('d-none', !isLoggedIn);
    if (isLoggedIn) {
        loadProjects();
        updateStats();
    }
}

// Handle login with validation
adminLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !password) {
        showNotification('error', 'Please fill in all fields');
        return;
    }

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        localStorage.setItem('adminLoggedIn', 'true');
        showNotification('success', 'Login successful!');
        checkAuth();
    } else {
        showNotification('error', 'Invalid credentials!');
    }
});

// Handle logout
logoutBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('adminLoggedIn');
        checkAuth();
        showNotification('success', 'Logged out successfully');
    }
});

// Initialize Cloudinary upload widget
const cloudinaryWidget = cloudinary.createUploadWidget(
    {
        cloudName: CLOUDINARY_CONFIG.cloudName,
        uploadPreset: CLOUDINARY_CONFIG.uploadPreset,
        apiKey: CLOUDINARY_CONFIG.apiKey,
        sources: ['local', 'url', 'camera'],
        multiple: false,
        maxFiles: 1,
        cropping: true,
        showSkipCropButton: false,
        croppingAspectRatio: 16/9,
        croppingShowDimensions: true,
        styles: {
            palette: {
                window: '#FFFFFF',
                sourceBg: '#F4F4F5',
                windowBorder: '#90A0B3',
                tabIcon: '#0E2F5A',
                inactiveTabIcon: '#0E2F5A',
                menuIcons: '#0E2F5A',
                link: '#1F62AE',
                action: '#339933',
                inProgress: '#0194C7',
                complete: '#339933',
                error: '#CC0000',
                textDark: '#000000',
                textLight: '#FFFFFF'
            }
        }
    },
    (error, result) => {
        if (error) {
            showNotification('error', 'Upload failed: ' + error.message);
            return;
        }
        
        if (result && result.event === 'success') {
            const imageInput = document.getElementById('projectImage');
            const imageUrl = result.info.secure_url;
            imageInput.setAttribute('data-url', imageUrl);
            
            // Show image preview
            imagePreview.src = imageUrl;
            imagePreview.classList.remove('d-none');
            showNotification('success', 'Image uploaded successfully!');
        }
    }
);

// Handle project form submission with validation
projectForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate form fields
    const title = document.getElementById('projectTitle').value.trim();
    const description = document.getElementById('projectDescription').value.trim();
    const technologies = document.getElementById('projectTechnologies').value.trim();
    const imageInput = document.getElementById('projectImage');
    const imageUrl = imageInput.getAttribute('data-url');
    const link = document.getElementById('projectLink').value.trim();

    if (!title || !description || !technologies) {
        showNotification('error', 'Please fill in all required fields');
        return;
    }

    if (!imageUrl) {
        showNotification('error', 'Please upload an image first!');
        return;
    }

    try {
        const project = {
            id: Date.now(),
            title,
            description,
            technologies: technologies.split(',').map(tech => tech.trim()).filter(Boolean),
            image: imageUrl,
            link: link || '#',
            timestamp: new Date().toISOString()
        };

        // Get existing projects or initialize empty array
        const projects = JSON.parse(localStorage.getItem('projects') || '[]');
        projects.push(project);
        localStorage.setItem('projects', JSON.stringify(projects));

        showNotification('success', 'Project added successfully!');
        projectForm.reset();
        imageInput.removeAttribute('data-url');
        imagePreview.classList.add('d-none');
        loadProjects();
        updateStats();
    } catch (error) {
        showNotification('error', 'Failed to save project: ' + error.message);
    }
});

// Load projects with error handling
function loadProjects() {
    try {
        const projects = JSON.parse(localStorage.getItem('projects') || '[]');
        projectsList.innerHTML = projects.map(project => `
            <div class="project-item" data-id="${project.id}">
                <img src="${project.image}" alt="${project.title}">
                <div class="project-item-content">
                    <h5 class="mb-1">${project.title}</h5>
                    <p class="mb-1 text-muted">${project.description}</p>
                    <div class="technologies mb-2">
                        ${project.technologies.map(tech => `<span class="badge bg-primary me-1">${tech}</span>`).join('')}
                    </div>
                    <small class="text-muted">${new Date(project.timestamp).toLocaleDateString()}</small>
                </div>
                <div class="project-item-actions">
                    <button class="btn-icon edit-project" title="Edit" onclick="editProject(${project.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon delete-project" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        // Add event listeners for delete buttons
        document.querySelectorAll('.delete-project').forEach(btn => {
            btn.addEventListener('click', deleteProject);
        });
    } catch (error) {
        showNotification('error', 'Failed to load projects: ' + error.message);
    }
}

// Edit project
function editProject(projectId) {
    try {
        const projects = JSON.parse(localStorage.getItem('projects') || '[]');
        const project = projects.find(p => p.id === projectId);
        
        if (!project) {
            showNotification('error', 'Project not found');
            return;
        }

        // Fill form with project data
        document.getElementById('projectTitle').value = project.title;
        document.getElementById('projectDescription').value = project.description;
        document.getElementById('projectTechnologies').value = project.technologies.join(', ');
        document.getElementById('projectLink').value = project.link === '#' ? '' : project.link;
        
        const imageInput = document.getElementById('projectImage');
        imageInput.setAttribute('data-url', project.image);
        imagePreview.src = project.image;
        imagePreview.classList.remove('d-none');

        // Change form submit behavior
        projectForm.setAttribute('data-edit-id', projectId);
        const submitButton = projectForm.querySelector('button[type="submit"]');
        submitButton.textContent = 'Update Project';

        // Scroll to form
        projectForm.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        showNotification('error', 'Failed to edit project: ' + error.message);
    }
}

// Delete project with confirmation
function deleteProject(e) {
    const projectItem = e.target.closest('.project-item');
    const projectId = parseInt(projectItem.dataset.id);
    
    if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
        try {
            const projects = JSON.parse(localStorage.getItem('projects') || '[]');
            const updatedProjects = projects.filter(project => project.id !== projectId);
            localStorage.setItem('projects', JSON.stringify(updatedProjects));
            
            showNotification('success', 'Project deleted successfully!');
            loadProjects();
            updateStats();
        } catch (error) {
            showNotification('error', 'Failed to delete project: ' + error.message);
        }
    }
}

// Update statistics with error handling
function updateStats() {
    try {
        const projects = JSON.parse(localStorage.getItem('projects') || '[]');
        document.getElementById('totalProjects').textContent = projects.length;
        
        const views = parseInt(localStorage.getItem('totalViews') || '0');
        document.getElementById('totalViews').textContent = views.toLocaleString();
    } catch (error) {
        showNotification('error', 'Failed to update statistics: ' + error.message);
    }
}

// Show notification with auto-dismiss
function showNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Add show class for animation
    setTimeout(() => notification.classList.add('show'), 10);

    // Remove notification after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize file upload
document.getElementById('projectImage').addEventListener('click', (e) => {
    e.preventDefault();
    cloudinaryWidget.open();
});

// Initialize the dashboard
checkAuth();

// Add form reset handler
projectForm.addEventListener('reset', () => {
    const submitButton = projectForm.querySelector('button[type="submit"]');
    submitButton.textContent = 'Add Project';
    projectForm.removeAttribute('data-edit-id');
    imagePreview.classList.add('d-none');
});
