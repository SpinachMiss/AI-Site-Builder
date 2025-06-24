// Gallery data with Unsplash images
const galleryData = [
    {
        id: 1,
        title: 'Mountain Landscape',
        category: 'nature',
        description: 'Beautiful mountain landscape at sunset',
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop',
        credit: 'Photo by Sergey Pesterev on Unsplash'
    },
    {
        id: 2,
        title: 'Urban Architecture',
        category: 'architecture',
        description: 'Modern urban architecture with glass facades',
        imageUrl: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=800&auto=format&fit=crop',
        credit: 'Photo by Scott Webb on Unsplash'
    },
    {
        id: 3,
        title: 'Portrait of a Woman',
        category: 'portrait',
        description: 'Portrait of a woman in natural light',
        imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop',
        credit: 'Photo by Brooke Cagle on Unsplash'
    },
    {
        id: 4,
        title: 'Forest Path',
        category: 'nature',
        description: 'Serene path through a misty forest',
        imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop',
        credit: 'Photo by Lukasz Szmigiel on Unsplash'
    },
    {
        id: 5,
        title: 'Historic Building',
        category: 'architecture',
        description: 'Historic architecture with intricate details',
        imageUrl: 'https://images.unsplash.com/photo-1495562569060-2eec283d3391?q=80&w=800&auto=format&fit=crop',
        credit: 'Photo by Francesca Tosolini on Unsplash'
    },
    {
        id: 6,
        title: 'Man in the City',
        category: 'portrait',
        description: 'Portrait of a man in an urban environment',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
        credit: 'Photo by Joseph Gonzalez on Unsplash'
    },
    {
        id: 7,
        title: 'Coastal Sunset',
        category: 'nature',
        description: 'Beautiful sunset over the ocean',
        imageUrl: 'https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?q=80&w=800&auto=format&fit=crop',
        credit: 'Photo by Sean O. on Unsplash'
    },
    {
        id: 8,
        title: 'Modern Interior',
        category: 'architecture',
        description: 'Minimalist modern interior design',
        imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=800&auto=format&fit=crop',
        credit: 'Photo by Sidekix Media on Unsplash'
    },
    {
        id: 9,
        title: 'Artistic Portrait',
        category: 'portrait',
        description: 'Creative portrait with artistic lighting',
        imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop',
        credit: 'Photo by Houcine Ncib on Unsplash'
    }
];

// DOM Elements
const galleryGrid = document.querySelector('.gallery-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const closeLightbox = document.querySelector('.close-lightbox');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const contactForm = document.getElementById('contact-form');

// Current lightbox image index
let currentImageIndex = 0;
let filteredGallery = [...galleryData];

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
    // Load gallery items
    loadGalleryItems(galleryData);
    
    // Initialize event listeners
    initEventListeners();
    
    // Handle form submission
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Set placeholder image for photographer if the real one fails to load
    const photographerImg = document.getElementById('photographer-img');
    if (photographerImg) {
        photographerImg.onerror = function() {
            this.src = 'https://via.placeholder.com/400x400?text=Photographer';
        };
    }
});

// Load gallery items
function loadGalleryItems(items) {
    galleryGrid.innerHTML = '';
    
    if (items.length === 0) {
        galleryGrid.innerHTML = '<p class="no-items">No items found in this category.</p>';
        return;
    }
    
    items.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${item.category}`;
        galleryItem.dataset.id = item.id;
        
        galleryItem.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/300x300?text=Photo'">
            <div class="gallery-item-overlay">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <small class="photo-credit">${item.credit}</small>
            </div>
        `;
        
        galleryGrid.appendChild(galleryItem);
        
        // Add click event to open lightbox
        galleryItem.addEventListener('click', () => {
            openLightbox(item.id);
        });
    });
}

// Initialize event listeners
function initEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter gallery items
            if (filter === 'all') {
                filteredGallery = [...galleryData];
            } else {
                filteredGallery = galleryData.filter(item => item.category === filter);
            }
            
            loadGalleryItems(filteredGallery);
        });
    });
    
    // Lightbox controls
    closeLightbox.addEventListener('click', closeLightboxHandler);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            closeLightboxHandler();
        } else if (e.key === 'ArrowLeft' && lightbox.style.display === 'block') {
            showPrevImage();
        } else if (e.key === 'ArrowRight' && lightbox.style.display === 'block') {
            showNextImage();
        }
    });
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.querySelector('i').classList.add('fa-bars');
            menuToggle.querySelector('i').classList.remove('fa-times');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation based on scroll position
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const headerHeight = document.querySelector('header').offsetHeight;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const currentId = section.getAttribute('id');
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Open lightbox
function openLightbox(imageId) {
    const imageIndex = filteredGallery.findIndex(item => item.id === imageId);
    if (imageIndex !== -1) {
        currentImageIndex = imageIndex;
        updateLightboxContent();
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Close lightbox
function closeLightboxHandler() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Show previous image in lightbox
function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + filteredGallery.length) % filteredGallery.length;
    updateLightboxContent();
}

// Show next image in lightbox
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % filteredGallery.length;
    updateLightboxContent();
}

// Update lightbox content
function updateLightboxContent() {
    const currentImage = filteredGallery[currentImageIndex];
    lightboxImg.src = currentImage.imageUrl;
    lightboxImg.alt = currentImage.title;
    lightboxCaption.innerHTML = `
        <strong>${currentImage.title}</strong> - ${currentImage.description}
        <br>
        <small class="photo-credit">${currentImage.credit}</small>
    `;
    
    // Handle image loading error
    lightboxImg.onerror = function() {
        this.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
    };
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // In a real application, you would send the form data to a server
    // For this demo, we'll just show a success message
    
    const formData = new FormData(contactForm);
    const formValues = {};
    
    formData.forEach((value, key) => {
        formValues[key] = value;
    });
    
    // Simulate form submission
    contactForm.innerHTML = `
        <div class="success-message">
            <i class="fas fa-check-circle"></i>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for contacting me. I'll get back to you soon.</p>
        </div>
    `;
    
    // Log form data (for demonstration purposes)
    console.log('Form submitted with values:', formValues);
}