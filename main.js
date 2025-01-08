// Biography content
const bioContent = `
    I am a passionate Full-Stack Developer with expertise in building modern web applications.
    With several years of experience in software development, I specialize in creating
    scalable and efficient solutions using cutting-edge technologies. I enjoy tackling
    complex problems and turning ideas into reality through clean, maintainable code.
`;

// Sample data
const projects = [
    {
        title: 'E-commerce Platform',
        description: 'A full-stack e-commerce platform built with React and Node.js',
        technologies: ['React', 'Node.js', 'MongoDB'],
        image: 'https://via.placeholder.com/350x200',
        liveUrl: 'https://example.com/ecommerce',
        githubUrl: 'https://github.com/yourusername/ecommerce'
    },
    {
        title: 'Task Management App',
        description: 'A collaborative task management application',
        technologies: ['Vue.js', 'Express', 'PostgreSQL'],
        image: 'https://via.placeholder.com/350x200',
        liveUrl: 'https://example.com/taskmanager',
        githubUrl: 'https://github.com/yourusername/taskmanager'
    },
    {
        title: 'Weather Dashboard',
        description: 'Real-time weather monitoring dashboard',
        technologies: ['JavaScript', 'Weather API', 'Bootstrap'],
        image: 'https://via.placeholder.com/350x200',
        liveUrl: 'https://example.com/weather',
        githubUrl: 'https://github.com/yourusername/weather'
    }
];

const skills = [
    {
        name: 'Frontend Development',
        items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Vue.js']
    },
    {
        name: 'Backend Development',
        items: ['Node.js', 'Python', 'Express', 'Django']
    },
    {
        name: 'Database',
        items: ['MongoDB', 'PostgreSQL', 'MySQL']
    }
];

const experience = [
    {
        role: 'Senior Developer',
        company: 'Tech Solutions Inc.',
        period: '2020 - Present',
        description: 'Leading development of enterprise applications and mentoring junior developers.'
    },
    {
        role: 'Full Stack Developer',
        company: 'Digital Innovations',
        period: '2018 - 2020',
        description: 'Developed and maintained multiple web applications using modern technologies.'
    },
    {
        role: 'Junior Developer',
        company: 'StartUp Hub',
        period: '2016 - 2018',
        description: 'Worked on various startup projects and gained extensive experience in web development.'
    }
];

// Cloudinary configuration
const CLOUDINARY_UPLOAD_PRESET = 'portfolio_uploads';
const CLOUDINARY_CLOUD_NAME = 'your-cloud-name';
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderBio();
    renderProjects();
    renderSkills();
    renderExperience();
    setupFileUpload();
    setupContactForm();
    setupAdminLogin();
    initializeFancybox();
    updateBreadcrumbs();
});

// Render biography
function renderBio() {
    const bioElement = document.getElementById('bioContent');
    bioElement.textContent = bioContent;
}

// Render projects
function renderProjects() {
    const projectsList = document.getElementById('projectsList');
    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'col-md-4 mb-4';
        projectElement.innerHTML = `
            <div class="project-card">
                <img src="${project.image}" class="img-fluid mb-3" alt="${project.title}">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="technologies mb-3">
                    ${project.technologies.map(tech => `<span class="badge bg-primary me-1">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.liveUrl}" target="_blank" class="btn btn-primary btn-sm me-2">
                        <i class="bi bi-globe"></i> Live Demo
                    </a>
                    <a href="${project.githubUrl}" target="_blank" class="btn btn-secondary btn-sm">
                        <i class="bi bi-github"></i> Source Code
                    </a>
                </div>
            </div>
        `;
        projectsList.appendChild(projectElement);
    });
}

// Render skills
function renderSkills() {
    const skillsList = document.getElementById('skillsList');
    skills.forEach(skillGroup => {
        const skillElement = document.createElement('div');
        skillElement.className = 'col-md-4 mb-4';
        skillElement.innerHTML = `
            <div class="skill-item">
                <h3>${skillGroup.name}</h3>
                <ul class="list-unstyled">
                    ${skillGroup.items.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;
        skillsList.appendChild(skillElement);
    });
}

// Render experience
function renderExperience() {
    const experienceList = document.getElementById('experienceList');
    experience.forEach(exp => {
        const expElement = document.createElement('div');
        expElement.className = 'timeline-item';
        expElement.innerHTML = `
            <h3>${exp.role}</h3>
            <h4>${exp.company}</h4>
            <p class="text-muted">${exp.period}</p>
            <p>${exp.description}</p>
        `;
        experienceList.appendChild(expElement);
    });
}

// Initialize Fancybox
function initializeFancybox() {
    Fancybox.bind('[data-fancybox]', {
        // Custom options
    });
}

// File upload handling
async function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
        const response = await fetch(CLOUDINARY_UPLOAD_URL, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        console.error('Upload error:', error);
        throw error;
    }
}

// Update file upload handler
async function handleFileUpload(event) {
    event.preventDefault();
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;
    const gallery = document.getElementById('mediaGallery');
    
    try {
        for (const file of files) {
            const uploadButton = event.submitter;
            uploadButton.disabled = true;
            uploadButton.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Uploading...';

            const fileUrl = await uploadToCloudinary(file);
            
            // Create gallery item
            const item = document.createElement('div');
            item.className = 'gallery-item';
            
            if (file.type.startsWith('image/')) {
                item.innerHTML = `
                    <a href="${fileUrl}" data-fancybox="gallery">
                        <img src="${fileUrl}" alt="Gallery image">
                    </a>
                `;
            } else if (file.type.startsWith('video/')) {
                item.innerHTML = `
                    <a href="${fileUrl}" data-fancybox="gallery">
                        <video src="${fileUrl}" controls></video>
                    </a>
                `;
            } else if (file.type === 'application/pdf') {
                item.innerHTML = `
                    <a href="${fileUrl}" data-fancybox="gallery" data-type="pdf">
                        <div class="pdf-preview">
                            <i class="fas fa-file-pdf"></i>
                            <span>${file.name}</span>
                        </div>
                    </a>
                `;
            }
            
            gallery.appendChild(item);
            
            // Reset button
            uploadButton.disabled = false;
            uploadButton.textContent = 'Upload';
        }
        
        showNotification('success', 'Files uploaded successfully!');
        fileInput.value = '';
    } catch (error) {
        showNotification('error', 'Error uploading files: ' + error.message);
    }
}

// Setup file upload
function setupFileUpload() {
    const uploadForm = document.getElementById('uploadForm');
    uploadForm.addEventListener('submit', handleFileUpload);
}

// Setup contact form
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('button');
        
        try {
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Sending...';

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Object.fromEntries(formData))
            });

            if (response.ok) {
                showNotification('success', 'Message sent successfully!');
                contactForm.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            showNotification('error', 'Error sending message: ' + error.message);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });
}

// Setup admin login
function setupAdminLogin() {
    const adminLogin = document.getElementById('adminLogin');
    const adminLoginForm = document.getElementById('adminLoginForm');
    const adminModal = new bootstrap.Modal(document.getElementById('adminModal'));
    const dashboardModal = new bootstrap.Modal(document.getElementById('dashboardModal'));
    let currentModal = null;

    adminLogin.addEventListener('click', () => {
        currentModal = adminModal;
        adminModal.show();
    });

    adminLoginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const submitButton = adminLoginForm.querySelector('button');
        
        try {
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Logging in...';

            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                showNotification('success', 'Logged in successfully!');
                if (currentModal) {
                    currentModal.hide();
                }
                currentModal = dashboardModal;
                adminLoginForm.reset();
                loadAdminDashboard();
                dashboardModal.show();
            } else {
                throw new Error(data.error || 'Invalid credentials');
            }
        } catch (error) {
            showNotification('error', 'Login failed: ' + error.message);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Login';
        }
    });

    // Handle modal closing
    document.getElementById('adminModal').addEventListener('hidden.bs.modal', () => {
        adminLoginForm.reset();
        const submitButton = adminLoginForm.querySelector('button');
        submitButton.disabled = false;
        submitButton.textContent = 'Login';
    });
}

// Load admin dashboard
async function loadAdminDashboard() {
    const messagesList = document.getElementById('messagesList');
    const filesList = document.getElementById('filesList');

    try {
        // Load messages
        const messagesResponse = await fetch('/api/admin/messages');
        const messages = await messagesResponse.json();
        
        messagesList.innerHTML = messages.map(message => `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${message.name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${message.email}</h6>
                    <p class="card-text">${message.message}</p>
                    <small class="text-muted">${new Date(message.createdAt).toLocaleString()}</small>
                </div>
            </div>
        `).join('');

        // Load files
        const filesResponse = await fetch('/files');
        const files = await filesResponse.json();
        
        filesList.innerHTML = files.map(file => `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <span>${file.name}</span>
                <button class="btn btn-danger btn-sm" onclick="deleteFile('${file.name}')">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `).join('');
    } catch (error) {
        showNotification('error', 'Error loading dashboard: ' + error.message);
    }
}

// Delete file
async function deleteFile(filename) {
    try {
        const response = await fetch(`/api/admin/files/${filename}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showNotification('success', 'File deleted successfully!');
            loadAdminDashboard();
        } else {
            throw new Error('Failed to delete file');
        }
    } catch (error) {
        showNotification('error', 'Error deleting file: ' + error.message);
    }
}

// Show notification
function showNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : 'danger'} notification`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Smooth scroll function
function smoothScroll(target, duration = 800) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;

    const targetPosition = targetElement.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function
        const ease = t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        
        window.scrollTo(0, startPosition + (distance * ease(progress)));
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// Update breadcrumbs based on scroll position
function updateBreadcrumbs() {
    const sections = document.querySelectorAll('section[id]');
    const currentSection = document.getElementById('currentSection');
    
    function updateCurrentSection() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        if (current) {
            const sectionName = current.charAt(0).toUpperCase() + current.slice(1);
            if (currentSection.textContent !== sectionName) {
                currentSection.textContent = sectionName;
                
                // Animate the change
                currentSection.style.transform = 'translateY(-10px)';
                currentSection.style.opacity = '0';
                setTimeout(() => {
                    currentSection.style.transform = 'translateY(0)';
                    currentSection.style.opacity = '1';
                }, 50);
            }
        }
    }

    // Update on scroll with throttling
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateCurrentSection();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial update
    updateCurrentSection();
}

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
    setupAdminLogin();
    setupContactForm();
    setupFileUpload();
    updateBreadcrumbs();
    renderBio();
    renderProjects();
    renderSkills();
    renderExperience();
    initializeFancybox();
    
    // Add smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            smoothScroll(href);
            
            // Update URL without jumping
            window.history.pushState(null, null, href);
        });
    });
});
