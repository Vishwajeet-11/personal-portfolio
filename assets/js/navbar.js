// Navbar Component
(function() {
  'use strict';

  // Create navbar HTML
  function createNavbar() {
    const header = document.createElement('header');
    header.className = 'site-header';
    
    // Hamburger button for mobile
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger-btn';
    hamburger.id = 'hamburgerBtn';
    hamburger.setAttribute('aria-label', 'Toggle navigation menu');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.innerHTML = `
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    `;
    
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.id = 'themeToggle';
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    themeToggle.textContent = '🌙 Dark Mode';
    
    const nav = document.createElement('nav');
    nav.className = 'navigation';
    nav.id = 'mainNav';
    nav.setAttribute('aria-label', 'Main navigation');
    
    // Mobile overlay
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    overlay.id = 'navOverlay';
    
    // Mobile menu container
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.id = 'mobileMenu';
    
    // Mobile menu header
    const mobileHeader = document.createElement('div');
    mobileHeader.className = 'mobile-menu-header';
    
    // Close button for mobile menu
    const closeBtn = document.createElement('button');
    closeBtn.className = 'mobile-close-btn';
    closeBtn.setAttribute('aria-label', 'Close menu');
    closeBtn.innerHTML = '✕';
    mobileHeader.appendChild(closeBtn);
    mobileMenu.appendChild(mobileHeader);
    
    // Mobile nav links container with Apple-style scroll
    const mobileNavLinks = document.createElement('div');
    mobileNavLinks.className = 'mobile-nav-links';
    
    const navLinks = [
      { href: 'index.html', text: 'Portfolio' },
      { href: 'projects.html', text: 'Projects' },
      { href: 'blog.html', text: 'Blog' },
      { href: 'system-designs.html', text: 'System Designs' },
      { href: 'testimonial.html', text: 'Testimonials' }
    ];
    
    navLinks.forEach((linkData, index) => {
      // Desktop nav link
      const link = document.createElement('a');
      link.href = linkData.href;
      link.className = 'nav-link';
      link.textContent = linkData.text;
      nav.appendChild(link);
      
      // Mobile nav link
      const mobileLink = document.createElement('a');
      mobileLink.href = linkData.href;
      mobileLink.className = 'mobile-nav-link';
      mobileLink.textContent = linkData.text;
      mobileLink.style.animationDelay = `${index * 0.08}s`;
      mobileNavLinks.appendChild(mobileLink);
    });
    
    mobileMenu.appendChild(mobileNavLinks);
    
    header.appendChild(hamburger);
    header.appendChild(themeToggle);
    header.appendChild(nav);
    
    // Insert at the beginning of body
    document.body.insertBefore(header, document.body.firstChild);
    document.body.appendChild(overlay);
    document.body.appendChild(mobileMenu);
    
    // Set active link based on current page
    setActiveNavLink();
    
    // Initialize theme toggle functionality
    initThemeToggle();
    
    // Initialize hamburger menu
    initHamburgerMenu(hamburger, mobileMenu, overlay, closeBtn);
  }

  // Set active nav link based on current page
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    navLinks.forEach(link => {
      const linkPage = link.getAttribute('href');
      if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  // Initialize hamburger menu functionality
  function initHamburgerMenu(hamburger, mobileMenu, overlay, closeBtn) {
    let isOpen = false;
    
    function openMenu() {
      isOpen = true;
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      mobileMenu.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      
      // Add animation classes to links
      const links = mobileMenu.querySelectorAll('.mobile-nav-link');
      links.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.08 + 0.1}s`;
        link.classList.add('animate-in');
      });
    }
    
    function closeMenu() {
      isOpen = false;
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
      
      // Remove animation classes
      const links = mobileMenu.querySelectorAll('.mobile-nav-link');
      links.forEach(link => {
        link.classList.remove('animate-in');
      });
    }
    
    function toggleMenu() {
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    }
    
    hamburger.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    });
    
    // Close menu on window resize if it's open and screen becomes larger
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && isOpen) {
        closeMenu();
      }
    });
  }

  // Initialize theme toggle functionality
  function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const html = document.documentElement;

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    updateButtonText();

    // Toggle theme function
    function toggleTheme() {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateButtonText();
    }

    // Update button text and icon
    function updateButtonText() {
      const theme = html.getAttribute('data-theme');
      const isDark = theme === 'dark';
      themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
      themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
    }

    // Add click event listener
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Initialize navbar when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createNavbar);
  } else {
    createNavbar();
  }
})();
