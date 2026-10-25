/* ============================================
   ANSHU KUMAR — MAIN JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Experience Calculator ---------- */
    const startDate = new Date(2014, 8, 1);
    const now = new Date();
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    if (months < 0) {
        years--;
        months += 12;
    }
    const yearsEl = document.getElementById('yearsExp');
    if (yearsEl) yearsEl.textContent = years + '+';

    /* ---------- Current Year ---------- */
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = now.getFullYear();

    /* ---------- Typewriter Effect ---------- */
    const typewriterEl = document.getElementById('typewriter');
    const phrases = [
        'Applied AI Lead · 12.5+ Years',
        'Architecting Production Agentic Systems',
        'Enterprise Search & Retrieval',
        'Generative Engine Optimization (GEO)',
        'VLMs · Cross-Encoders · LLM Orchestration',
        'Previously: Walmart Product Discovery'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 50;

    function typewrite() {
        if (!typewriterEl) return;
        const current = phrases[phraseIndex];

        if (isDeleting) {
            typewriterEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 30;
        } else {
            typewriterEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 60;
        }

        if (!isDeleting && charIndex === current.length) {
            typeSpeed = 2000; // pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 400;
        }

        setTimeout(typewrite, typeSpeed);
    }

    typewrite();

    /* ---------- Particle System ---------- */
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        const particleCount = 30;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (Math.random() * 6 + 6) + 's';
            const hue = Math.random() > 0.5 ? '240' : '280';
            particle.style.background = `hsla(${hue}, 80%, 70%, 0.6)`;
            particlesContainer.appendChild(particle);
        }
    }

    /* ---------- Navbar Scroll ---------- */
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    function handleScroll() {
        const scrollY = window.scrollY;
        if (navbar) {
            navbar.classList.toggle('scrolled', scrollY > 80);
        }
        if (backToTop) {
            backToTop.classList.toggle('visible', scrollY > 500);
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    /* ---------- Back to Top ---------- */
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ---------- Mobile Nav Toggle ---------- */
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        // Close mobile nav on link click
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    /* ---------- Active Nav Link on Scroll ---------- */
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinksList = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollY = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinksList.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    /* ---------- Article Filtering ---------- */
    const filterTabs = document.querySelectorAll('.filter-tab');
    const articleCards = document.querySelectorAll('.article-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const filter = tab.dataset.filter;

            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Filter articles
            articleCards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.4s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    /* ---------- Scroll Reveal Animations ---------- */
    const animateElements = document.querySelectorAll(
        '.article-card, .project-card, .skill-category, .about-card, .highlight'
    );

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    /* ---------- Skill Bar Animation ---------- */
    const skillFills = document.querySelectorAll('.skill-fill');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.dataset.level;
                entry.target.style.width = level + '%';
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    skillFills.forEach(fill => skillObserver.observe(fill));

    /* ---------- Smooth Scroll for Anchors ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /* ---------- Greeting based on time of day ---------- */
    const greetingEl = document.getElementById('greeting');
    if (greetingEl) {
        const hour = now.getHours();
        let greetText = 'Hello, I\'m';
        if (hour >= 5 && hour < 12) greetText = 'Good Morning, I\'m';
        else if (hour >= 12 && hour < 17) greetText = 'Good Afternoon, I\'m';
        else if (hour >= 17 && hour < 21) greetText = 'Good Evening, I\'m';
        else greetText = 'Hey there, I\'m';
        greetingEl.textContent = greetText;
    }

});

/* ---------- CSS Animation Keyframes (injected) ---------- */
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);