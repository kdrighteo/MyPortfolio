// DOM Elements
const navbar = document.querySelector('.navbar');
const sidebar = document.querySelector('.sidebar');
const contactTriggers = document.querySelectorAll('.contact-trigger');
const closeButton = document.querySelector('.close-sidebar');

// Intersection Observer Options
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

// Intersection Observers
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('show');
            }, index * 100);
        }
    });
}, observerOptions);

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('show');
            }, index * 200);
        }
    });
}, observerOptions);

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    renderBio();
    renderSkills();
    loadProjects();
    setupContactForm();
    initializeAnimations();
});

// Load and render projects from admin dashboard
function loadProjects() {
    const projectsContainer = document.querySelector('.projects-grid');
    if (!projectsContainer) return;

    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    
    projectsContainer.innerHTML = projects.map(project => `
        <div class="project-card">
            <img src="${project.image}" alt="${project.title}">
            <div class="card-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="technologies">
                    ${project.technologies.map(tech => `<span class="badge bg-primary">${tech}</span>`).join(' ')}
                </div>
                ${project.link ? `<a href="${project.link}" class="btn btn-light mt-3" target="_blank">View Project</a>` : ''}
            </div>
        </div>
    `).join('');

    // Observe new project cards
    document.querySelectorAll('.project-card').forEach(card => projectObserver.observe(card));

    // Increment view counter
    const views = parseInt(localStorage.getItem('totalViews') || '0');
    localStorage.setItem('totalViews', views + 1);
}

// Render skills section
function renderSkills() {
    const skillsContainer = document.querySelector('.skills-grid');
    if (!skillsContainer) return;

    const skills = [
        { name: 'Frontend Development', items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Vue.js'] },
        { name: 'Backend Development', items: ['Node.js', 'Python', 'Express', 'Django'] },
        { name: 'Database', items: ['MongoDB', 'PostgreSQL', 'MySQL'] }
    ];

    skillsContainer.innerHTML = skills.map(skill => `
        <div class="skill-card">
            <h3>${skill.name}</h3>
            <ul class="list-unstyled">
                ${skill.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
            <div class="skill-progress">
                <div class="skill-progress-bar" data-progress="85"></div>
            </div>
        </div>
    `).join('');

    // Observe new skill cards
    document.querySelectorAll('.skill-card').forEach(card => skillObserver.observe(card));
}

// Render bio section
function renderBio() {
    const bioElement = document.getElementById('bioContent');
    if (bioElement) {
        bioElement.textContent = `
            I am a passionate Full-Stack Developer with expertise in building modern web applications.
            With several years of experience in software development, I specialize in creating
            scalable and efficient solutions using cutting-edge technologies.
        `;
    }
}

// Navigation
function initializeNavigation() {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });
}

// Contact form
function setupContactForm() {
    if (!contactTriggers || !sidebar || !closeButton) return;

    function toggleSidebar() {
        sidebar.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    }

    contactTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            toggleSidebar();
        });
    });

    closeButton.addEventListener('click', toggleSidebar);

    document.addEventListener('click', (e) => {
        if (sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            !Array.from(contactTriggers).some(trigger => trigger.contains(e.target))) {
            toggleSidebar();
        }
    });
}

// Animations
function initializeAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => timelineObserver.observe(item));
}

// Custom cursor
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.1;
    cursorY += dy * 0.1;
    
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
});

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

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    renderBio();
    renderSkills();
    loadProjects();
    setupContactForm();
    initializeAnimations();
    renderPortfolioBio();
    renderPortfolioSkills();
    renderPortfolioProjects();
});
