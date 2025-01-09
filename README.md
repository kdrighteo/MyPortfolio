# Modern Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript. Hosted on GitHub Pages with Cloudinary for media storage and Formspree for contact form handling.

## Features

- Responsive design
- Project showcase with admin dashboard
- Media gallery with Cloudinary integration
- Contact form powered by Formspree
- Smooth scrolling and animations
- Modern UI with Bootstrap 5
- Secure admin panel for project management

## Setup

1. Fork this repository
2. Enable GitHub Pages in your repository settings
3. Sign up for [Cloudinary](https://cloudinary.com/) (free tier)
4. Sign up for [Formspree](https://formspree.io/) (free tier)
5. Update the following in your code:
   - In `admin.js`: Replace Cloudinary configuration with your credentials
   - In `index.html`: Replace `your-formspree-id` with your Formspree form ID

## Admin Dashboard

1. Access the admin panel at `/admin.html`
2. Default credentials:
   - Username: `admin`
   - Password: `admin123`
3. Features:
   - Add/Edit/Delete projects
   - Upload project images
   - View statistics
   - Manage project details

## Customization

1. Update content in files:
   - `index.html`: Main content and structure
   - `main.js`: Dynamic content and interactions
   - `admin.js`: Admin panel functionality
   - `styles.css` & `admin.css`: Visual styling

2. Customize styles:
   - Colors and themes
   - Layout and spacing
   - Animations and transitions
   - Responsive breakpoints

## Local Development

1. Clone the repository
2. Open `index.html` in your browser
3. Make changes to files
4. Refresh browser to see changes

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5
- Font Awesome
- Cloudinary
- Formspree

## Security

- Secure admin authentication
- Input validation and sanitization
- Protected admin routes
- Safe file uploads with Cloudinary

## License

MIT License - feel free to use this template for your own portfolio!
