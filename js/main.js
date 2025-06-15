// Mobile Menu Toggle
const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('.nav__menu');
const hamburger = document.querySelector('.hamburger');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

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
            // Close mobile menu after clicking a link
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Gallery Images
const galleryImages = [
    {
        src: 'assets/images/gallery-1.jpg',
        alt: 'Cozy study corner with comfortable seating'
    },
    {
        src: 'assets/images/gallery-2.jpg',
        alt: 'Group study session in progress'
    },
    {
        src: 'assets/images/gallery-3.jpg',
        alt: 'One-on-one mentorship session'
    },
    {
        src: 'assets/images/gallery-4.jpg',
        alt: 'Late night study space'
    },
    {
        src: 'assets/images/gallery-5.jpg',
        alt: 'Community event in progress'
    },
    {
        src: 'assets/images/gallery-6.jpg',
        alt: 'Relaxation area with games'
    }
];

// Populate gallery
const gallery = document.querySelector('.gallery');
galleryImages.forEach(image => {
    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.alt;
    img.loading = 'lazy';
    img.addEventListener('click', () => openLightbox(image));
    gallery.appendChild(img);
});

// Lightbox functionality
function openLightbox(image) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox__content">
            <img src="${image.src}" alt="${image.alt}">
            <button class="lightbox__close">&times;</button>
        </div>
    `;
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';

    lightbox.querySelector('.lightbox__close').addEventListener('click', () => {
        lightbox.remove();
        document.body.style.overflow = '';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.remove();
            document.body.style.overflow = '';
        }
    });
}

// Testimonials
const testimonials = [
    {
        text: "Lighthouse became my second home during senior year. The mentors here helped me navigate college applications and life decisions.",
        author: "Sarah, Class of 2024"
    },
    {
        text: "I found my study group here and we've been meeting every week. The space is perfect for both focused work and socializing.",
        author: "Michael, Class of 2024"
    },
    {
        text: "The late-night hours were a lifesaver during finals week. Having a safe, supportive space to study made all the difference.",
        author: "Emma, Class of 2023"
    }
];

// Testimonial carousel
let currentTestimonial = 0;
const testimonialContainer = document.querySelector('.testimonials');

function updateTestimonial() {
    const testimonial = testimonials[currentTestimonial];
    testimonialContainer.innerHTML = `
        <div class="testimonial fade-in">
            <p class="testimonial__text">"${testimonial.text}"</p>
            <p class="testimonial__author">- ${testimonial.author}</p>
        </div>
    `;
}

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateTestimonial();
}, 5000);

// Initialize first testimonial
updateTestimonial();

// Add CSS for lightbox
const style = document.createElement('style');
style.textContent = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .lightbox__content {
        position: relative;
        max-width: 90%;
        max-height: 90vh;
    }

    .lightbox__content img {
        max-width: 100%;
        max-height: 90vh;
        object-fit: contain;
    }

    .lightbox__close {
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
    }

    .nav__menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        padding: var(--spacing-md);
        box-shadow: var(--shadow);
    }

    .hamburger.active {
        background-color: transparent;
    }

    .hamburger.active::before {
        transform: rotate(45deg);
        top: 0;
    }

    .hamburger.active::after {
        transform: rotate(-45deg);
        bottom: 0;
    }
`;
document.head.appendChild(style); 