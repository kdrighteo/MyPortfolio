// Biography content
const bioContent = `
    I am a passionate Full-Stack Developer with expertise in building modern web applications.
    With several years of experience in software development, I specialize in creating
    scalable and efficient solutions using cutting-edge technologies. I enjoy tackling
    complex problems and turning ideas into reality through clean, maintainable code.
`;

// Portfolio data
const portfolioData = {
    bio: {
        name: "Your Name",
        title: "Full-Stack Developer & UI/UX Designer",
        description: "Passionate about creating beautiful, functional, and user-friendly applications. Experienced in both frontend and backend development.",
    },
    skills: [
        { name: "Frontend", items: ["HTML5", "CSS3", "JavaScript", "React", "Vue.js", "Bootstrap"] },
        { name: "Backend", items: ["Node.js", "Python", "Java", "MongoDB", "PostgreSQL", "REST APIs"] },
        { name: "Tools", items: ["Git", "Docker", "AWS", "Figma", "Adobe XD", "VS Code"] },
        { name: "Soft Skills", items: ["Problem Solving", "Team Leadership", "Communication", "Agile/Scrum"] }
    ],
    projects: [
        {
            title: "E-Commerce Platform",
            description: "A full-stack e-commerce platform with payment integration and admin dashboard.",
            technologies: ["React", "Node.js", "MongoDB", "Stripe"],
            image: "https://placehold.co/600x400",
            link: "#"
        },
        {
            title: "Task Management App",
            description: "A collaborative task management application with real-time updates.",
            technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
            image: "https://placehold.co/600x400",
            link: "#"
        },
        {
            title: "AI Image Generator",
            description: "An AI-powered image generation tool using deep learning models.",
            technologies: ["Python", "TensorFlow", "Flask", "React"],
            image: "https://placehold.co/600x400",
            link: "#"
        }
    ]
};

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
    initializeNavigation();
    renderBio();
    renderSkills();
    renderProjects();
    setupContactForm();
    setupFileUpload();
    initializeAnimations();
    renderPortfolioBio();
    renderPortfolioSkills();
    renderPortfolioProjects();
});

// Navigation
function initializeNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Update active navigation item on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Render bio section
function renderBio() {
    const bioElement = document.getElementById('bioContent');
    bioElement.textContent = bioContent;
}

// Render skills section
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

// Render projects section
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

// Render experience section
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

// Render portfolio bio section
function renderPortfolioBio() {
    const bioSection = document.querySelector('#home');
    if (bioSection) {
        const bioContent = `
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <h1 class="display-4 fw-bold">${portfolioData.bio.name}</h1>
                        <h2 class="h3 mb-4">${portfolioData.bio.title}</h2>
                        <p class="lead">${portfolioData.bio.description}</p>
                        <div class="d-flex gap-3">
                            <a href="#projects" class="btn btn-primary">View Projects</a>
                            <a href="#contact" class="btn btn-outline-primary">Contact Me</a>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <img src="https://placehold.co/600x400" alt="Profile" class="img-fluid rounded-3 shadow">
                    </div>
                </div>
            </div>
        `;
        bioSection.innerHTML = bioContent;
    }
}

// Render portfolio skills section
function renderPortfolioSkills() {
    const skillsSection = document.querySelector('#skills .row');
    if (skillsSection) {
        skillsSection.innerHTML = portfolioData.skills.map(skillGroup => `
            <div class="col-md-6 col-lg-3 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h3 class="card-title h5 mb-3">${skillGroup.name}</h3>
                        <ul class="list-unstyled">
                            ${skillGroup.items.map(skill => `
                                <li class="mb-2">
                                    <i class="fas fa-check-circle text-primary me-2"></i>
                                    ${skill}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Render portfolio projects section
function renderPortfolioProjects() {
    const projectsSection = document.querySelector('#projects .row');
    if (projectsSection) {
        projectsSection.innerHTML = portfolioData.projects.map(project => `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card h-100">
                    <img src="${project.image}" class="card-img-top" alt="${project.title}">
                    <div class="card-body">
                        <h3 class="card-title h5">${project.title}</h3>
                        <p class="card-text">${project.description}</p>
                        <div class="mb-3">
                            ${project.technologies.map(tech => `
                                <span class="badge bg-primary me-1">${tech}</span>
                            `).join('')}
                        </div>
                        <a href="${project.link}" class="btn btn-primary" target="_blank">View Project</a>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Contact form handling
function setupContactForm() {
    const form = document.querySelector('#contactForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    showNotification('success', 'Message sent successfully!');
                    form.reset();
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                showNotification('error', 'Error sending message. Please try again.');
            }
        });
    }
}

// File upload handling with Cloudinary
async function handleFileUpload(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) throw new Error('Upload failed');
        
        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        throw new Error('Upload failed: ' + error.message);
    }
}

// Setup file upload
function setupFileUpload() {
    const uploadForm = document.querySelector('#uploadForm');
    if (uploadForm) {
        uploadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const fileInput = uploadForm.querySelector('input[type="file"]');
            const submitButton = uploadForm.querySelector('button[type="submit"]');
            
            if (fileInput.files.length === 0) {
                showNotification('error', 'Please select a file to upload');
                return;
            }

            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Uploading...';

            try {
                const fileUrl = await handleFileUpload(fileInput.files[0]);
                showNotification('success', 'File uploaded successfully!');
                addToGallery(fileUrl, fileInput.files[0].type);
                uploadForm.reset();
            } catch (error) {
                showNotification('error', error.message);
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = 'Upload';
            }
        });
    }
}

// Add item to gallery
function addToGallery(url, fileType) {
    const gallery = document.querySelector('#mediaGallery');
    if (!gallery) return;

    const item = document.createElement('div');
    item.className = 'col-md-4 mb-4';

    if (fileType.startsWith('image/')) {
        item.innerHTML = `
            <a href="${url}" data-fancybox="gallery">
                <img src="${url}" alt="Gallery image" class="img-fluid rounded">
            </a>
        `;
    } else if (fileType.startsWith('video/')) {
        item.innerHTML = `
            <video src="${url}" controls class="img-fluid rounded"></video>
        `;
    } else if (fileType === 'application/pdf') {
        item.innerHTML = `
            <div class="pdf-preview">
                <i class="fas fa-file-pdf"></i>
                <p>PDF Document</p>
                <a href="${url}" class="btn btn-primary btn-sm" target="_blank">View PDF</a>
            </div>
        `;
    }

    gallery.appendChild(item);
}

// Notifications
function showNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize animations
function initializeAnimations() {
    // Show sidebar on contact button click
    const contactButtons = document.querySelectorAll('a[href="#contact"]');
    const sidebar = document.querySelector('.sidebar');
    
    contactButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            sidebar.classList.toggle('show');
        });
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (sidebar && sidebar.classList.contains('show') && 
            !sidebar.contains(e.target) && 
            !e.target.closest('a[href="#contact"]')) {
            sidebar.classList.remove('show');
        }
    });

    // Intersection Observer for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Observer for section titles
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                titleObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer for project cards
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, index * 100); // Stagger the animation
                projectObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer for skill cards
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, index * 100);
                skillObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer for timeline items
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, index * 200);
                timelineObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.section-title').forEach(title => titleObserver.observe(title));
    document.querySelectorAll('.project-card').forEach(card => projectObserver.observe(card));
    document.querySelectorAll('.skill-card').forEach(card => skillObserver.observe(card));
    document.querySelectorAll('.timeline-item').forEach(item => timelineObserver.observe(item));
}

// Render projects section
function renderProjects() {
    const projectsSection = document.querySelector('#projectsList');
    if (projectsSection) {
        projectsSection.innerHTML = portfolioData.projects.map(project => `
            <div class="project-card">
                <img src="${project.image}" class="card-img-top" alt="${project.title}">
                <div class="card-body">
                    <h3 class="card-title h5">${project.title}</h3>
                    <p class="card-text">${project.description}</p>
                    <div class="mb-3">
                        ${project.technologies.map(tech => `
                            <span class="badge bg-primary me-1">${tech}</span>
                        `).join('')}
                    </div>
                    <a href="${project.link}" class="btn btn-primary" target="_blank">View Project</a>
                </div>
            </div>
        `).join('');
    }
}

// Render skills section
function renderSkills() {
    const skillsSection = document.querySelector('#skillsList');
    if (skillsSection) {
        skillsSection.innerHTML = portfolioData.skills.map(skillGroup => `
            <div class="skill-card">
                <h3 class="h5 mb-3">${skillGroup.name}</h3>
                <ul class="list-unstyled">
                    ${skillGroup.items.map(skill => `
                        <li class="mb-2">
                            <i class="fas fa-check-circle text-primary me-2"></i>
                            ${skill}
                        </li>
                    `).join('')}
                </ul>
            </div>
        `).join('');
    }
}

// Render experience section
function renderExperience() {
    const experienceSection = document.querySelector('#experienceList');
    if (experienceSection) {
        experienceSection.innerHTML = experience.map(exp => `
            <div class="timeline-item">
                <div class="d-flex justify-content-between mb-2">
                    <h3 class="h5">${exp.role}</h3>
                    <span class="text-muted">${exp.period}</span>
                </div>
                <h4 class="h6 mb-2">${exp.company}</h4>
                <p class="mb-0">${exp.description}</p>
            </div>
        `).join('');
    }
}
