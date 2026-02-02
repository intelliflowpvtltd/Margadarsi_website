/* ============================================
   MARGADARSI - Main JavaScript
   Core Functionality & Navigation
   ============================================ */

(function () {
  'use strict';

  // ============================================
  // NAVBAR SCROLL BEHAVIOR
  // ============================================
  const navbar = document.querySelector('.navbar-premium');
  let lastScroll = 0;

  function handleNavbarScroll() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }

  // ============================================
  // MOBILE MENU - Close on link click (Bootstrap handles toggle)
  // ============================================
  function initMobileMenu() {
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarCollapse) {
      // Close menu when clicking nav links (Bootstrap 5 way)
      const navLinks = document.querySelectorAll('.nav-link-custom');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth < 992) {
            // Use Bootstrap 5 Collapse API
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) {
              bsCollapse.hide();
            }
          }
        });
      });
    }
  }

  // ============================================
  // SMOOTH SCROLLING FOR ANCHOR LINKS
  // ============================================
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        if (href !== '#' && href !== '#!') {
          const target = document.querySelector(href);

          if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80;

            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }

  // ============================================
  // SCROLL TO TOP BUTTON
  // ============================================
  function initScrollToTop() {
    const scrollBtn = document.querySelector('.scroll-to-top');

    if (scrollBtn) {
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
          scrollBtn.classList.add('visible');
        } else {
          scrollBtn.classList.remove('visible');
        }
      });

      scrollBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  // ============================================
  // ACTIVE NAV LINK HIGHLIGHTING
  // ============================================
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link-custom');

    window.addEventListener('scroll', () => {
      let current = '';

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }

  // ============================================
  // PRELOADER (Optional)
  // ============================================
  function hidePreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 300);
      });
    }
  }

  // ============================================
  // INITIALIZE ON DOM READY
  // ============================================
  document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScroll();
    initScrollToTop();
    updateActiveNavLink();
    hidePreloader();

    // Add scroll event listener
    window.addEventListener('scroll', handleNavbarScroll);
  });

})();
