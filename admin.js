// DOM Elements
const loginForm = document.getElementById('loginForm');
const dashboard = document.getElementById('dashboard');
const adminLoginForm = document.getElementById('adminLoginForm');
const logoutBtn = document.getElementById('logoutBtn');
const projectForm = document.getElementById('projectForm');
const projectsList = document.getElementById('projectsList');

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

// Handle login
adminLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

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
    localStorage.removeItem('adminLoggedIn');
    checkAuth();
});

// Initialize Cloudinary upload widget
const cloudinaryWidget = cloudinary.createUploadWidget(
    {
        cloudName: 'your-cloud-name',
        uploadPreset: 'your-upload-preset',
        sources: ['local', 'url', 'camera'],
        multiple: false,
        maxFiles: 1,
        cropping: true,
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
        if (!error && result && result.event === 'success') {
            const imageInput = document.getElementById('projectImage');
            imageInput.setAttribute('data-url', result.info.secure_url);
            showNotification('success', 'Image uploaded successfully!');
        }
    }
);

// Handle project form submission
projectForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const imageInput = document.getElementById('projectImage');
    const imageUrl = imageInput.getAttribute('data-url');
    
    if (!imageUrl) {
        showNotification('error', 'Please upload an image first!');
        return;
    }

    const project = {
        id: Date.now(),
        title: document.getElementById('projectTitle').value,
        description: document.getElementById('projectDescription').value,
        technologies: document.getElementById('projectTechnologies').value.split(',').map(tech => tech.trim()),
        image: imageUrl,
        link: document.getElementById('projectLink').value || '#',
        timestamp: new Date().toISOString()
    };

    // Get existing projects or initialize empty array
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));

    showNotification('success', 'Project added successfully!');
    projectForm.reset();
    imageInput.removeAttribute('data-url');
    loadProjects();
    updateStats();
});

// Load projects
function loadProjects() {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    projectsList.innerHTML = projects.map(project => `
        <div class="project-item" data-id="${project.id}">
            <img src="${project.image}" alt="${project.title}">
            <div class="project-item-content">
                <h5 class="mb-1">${project.title}</h5>
                <p class="mb-1 text-muted">${project.description}</p>
                <small class="text-muted">${new Date(project.timestamp).toLocaleDateString()}</small>
            </div>
            <div class="project-item-actions">
                <button class="btn-icon edit-project" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon delete-project" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');

    // Add event listeners for edit and delete buttons
    document.querySelectorAll('.delete-project').forEach(btn => {
        btn.addEventListener('click', deleteProject);
    });
}

// Delete project
function deleteProject(e) {
    const projectItem = e.target.closest('.project-item');
    const projectId = parseInt(projectItem.dataset.id);
    
    if (confirm('Are you sure you want to delete this project?')) {
        const projects = JSON.parse(localStorage.getItem('projects') || '[]');
        const updatedProjects = projects.filter(project => project.id !== projectId);
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
        
        showNotification('success', 'Project deleted successfully!');
        loadProjects();
        updateStats();
    }
}

// Update statistics
function updateStats() {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    document.getElementById('totalProjects').textContent = projects.length;
    
    // You can add more statistics here
    const views = parseInt(localStorage.getItem('totalViews') || '0');
    document.getElementById('totalViews').textContent = views;
}

// Show notification
function showNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize file upload
document.getElementById('projectImage').addEventListener('click', (e) => {
    e.preventDefault();
    cloudinaryWidget.open();
});

// Initialize the dashboard
checkAuth();
