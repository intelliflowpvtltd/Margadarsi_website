/* ============================================
   MARGADARSI - Animation Scripts
   Scroll Reveal & Interactive Animations
   ============================================ */

(function () {
    'use strict';

    // ============================================
    // INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
    // ============================================
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

        if (revealElements.length === 0) return;

        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Optionally unobserve after animation
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(element => {
            observer.observe(element);
        });
    }

    // ============================================
    // COUNTER ANIMATION
    // ============================================
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16); // 60 FPS
        let current = start;

        const timer = setInterval(() => {
            current += increment;

            if (current >= target) {
                element.textContent = formatNumber(target);
                clearInterval(timer);
            } else {
                element.textContent = formatNumber(Math.floor(current));
            }
        }, 16);
    }

    function formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K+';
        }
        return num.toString();
    }

    function initCounters() {
        const counters = document.querySelectorAll('.stat-number');

        if (counters.length === 0) return;

        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const target = parseInt(entry.target.getAttribute('data-count')) || 0;
                    animateCounter(entry.target, target);
                    entry.target.classList.add('counted');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    // ============================================
    // PARALLAX EFFECT
    // ============================================
    function initParallax() {
        const parallaxElements = document.querySelectorAll('.parallax-slow');

        if (parallaxElements.length === 0) return;

        function updateParallax() {
            const scrolled = window.pageYOffset;

            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-speed') || 0.5;
                const offset = scrolled * parseFloat(speed);
                element.style.setProperty('--parallax-offset', `${offset}px`);
            });
        }

        window.addEventListener('scroll', () => {
            requestAnimationFrame(updateParallax);
        });
    }

    // ============================================
    // STAGGER ANIMATION
    // ============================================
    function initStaggerAnimation() {
        const staggerContainers = document.querySelectorAll('.stagger-children');

        if (staggerContainers.length === 0) return;

        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animating');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        staggerContainers.forEach(container => {
            observer.observe(container);
        });
    }

    // ============================================
    // TILT EFFECT ON CARDS
    // ============================================
    function initTiltEffect() {
        const tiltElements = document.querySelectorAll('.hover-tilt');

        tiltElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            });
        });
    }

    // ============================================
    // IMAGE LAZY LOADING
    // ============================================
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');

        if (images.length === 0) return;

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // ============================================
    // TYPING ANIMATION
    // ============================================
    function typeWriter(element, text, speed = 100, callback) {
        let i = 0;
        element.textContent = '';

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else if (callback) {
                callback();
            }
        }

        type();
    }

    function initTypingEffect() {
        const typingElements = document.querySelectorAll('.typing-effect');

        if (typingElements.length === 0) return;

        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
                    const text = entry.target.getAttribute('data-text') || entry.textContent;
                    const speed = parseInt(entry.target.getAttribute('data-speed')) || 50;
                    typeWriter(entry.target, text, speed);
                    entry.target.classList.add('typed');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        typingElements.forEach(element => {
            observer.observe(element);
        });
    }

    // ============================================
    // INITIALIZE ALL ANIMATIONS
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        initScrollReveal();
        initCounters();
        initParallax();
        initStaggerAnimation();
        initTiltEffect();
        initLazyLoading();
        initTypingEffect();
    });

})();
