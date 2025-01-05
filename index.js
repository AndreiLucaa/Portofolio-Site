document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Dark mode functionality
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeToggleMobile = document.getElementById('darkModeToggleMobile');
    
    function applyDarkMode(isDark) {
        document.body.classList.toggle('dark-mode', isDark);
        document.querySelectorAll('.section, .hero, #projects, #career, #cv').forEach(section => {
            section.classList.toggle('dark-mode', isDark);
        });
    }
    
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        applyDarkMode(true);
        darkModeToggle.checked = true;
        darkModeToggleMobile.checked = true;
    }

    // Toggle dark mode
    darkModeToggle.addEventListener('change', () => {
        applyDarkMode(darkModeToggle.checked);
        localStorage.setItem('darkMode', darkModeToggle.checked);
        darkModeToggleMobile.checked = darkModeToggle.checked;
    });

    // Sync dark mode toggles
    darkModeToggleMobile.addEventListener('change', () => {
        darkModeToggle.checked = darkModeToggleMobile.checked;
        darkModeToggle.dispatchEvent(new Event('change'));
    });

    // Mobile menu functionality
    const menuButton = document.getElementById('menuButton');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const backdrop = document.querySelector('.mobile-menu-backdrop');
    
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Updated menu button click handler
    if (menuButton) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', closeMobileMenu);
    }

    if (backdrop) {
        backdrop.addEventListener('click', closeMobileMenu);
    }

    // Close menu when clicking a link on mobile
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1085 && 
            !e.target.closest('.mobile-menu') && 
            !e.target.closest('.menu-button') && 
            mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Download functionality
    const downloadButton = document.querySelector('.label-download .input');
    const cancelDownload = document.querySelector('.label-download .square');
    const openButton = document.querySelector('.label-download #open-title');
    let downloadLink = null;

    downloadButton.addEventListener('change', function(e) {
        if (this.checked) {
            downloadLink = document.createElement('a');
            downloadLink.href = 'imagini/cv.pdf';
            downloadLink.download = 'cv.pdf';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    });

    cancelDownload.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        downloadButton.checked = false;
    });

    openButton.addEventListener('click', function(e) {
        window.open('imagini/cv.pdf', '_blank');
    });

    // Add scroll animations
    const scrollElements = document.querySelectorAll('section h2, .project-card, .timeline-item, .gallery-item');
    
    // Add scroll-animate class to all elements we want to animate
    

    // Updated scroll observer with animation reset
    const scrollObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                // When element leaves viewport
                if (!entry.isIntersecting) {
                    // Reset the animation by removing active class
                    entry.target.classList.remove('active');
                    // Force a reflow to reset the animation
                    void entry.target.offsetWidth;
                } else {
                    // Add active class to trigger animation when in view
                    entry.target.classList.add('active');
                }
            });
        },
        {
            root: null,
            rootMargin: '0px',
            threshold: 0.2 // Trigger when 20% of element is visible
        }
    );

    scrollElements.forEach(el => scrollObserver.observe(el));

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.classList.add('loading');
            
            // Form data
            const formData = {
                name: this.name.value,
                email: this.email.value,
                subject: this.subject.value,
                message: this.message.value
            };

            try {
                // Simulate form submission
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Success state
                submitBtn.classList.remove('loading');
                submitBtn.classList.add('success');
                
                // Reset form
                setTimeout(() => {
                    this.reset();
                    submitBtn.classList.remove('success');
                }, 3000);
                
                // Here you would typically send the formData to your backend
                console.log('Form submitted:', formData);
                
            } catch (error) {
                console.error('Error:', error);
                submitBtn.classList.remove('loading');
                // Handle error state
            }
        });
    }

});
