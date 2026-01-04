// Navbar Component
(function() {
  'use strict';

  // Create navbar HTML
  function createNavbar() {
    const header = document.createElement('header');
    header.className = 'site-header';
    
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.id = 'themeToggle';
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    themeToggle.textContent = '🌙 Dark Mode';
    
    const nav = document.createElement('nav');
    nav.className = 'navigation';
    nav.setAttribute('aria-label', 'Main navigation');
    
    const navLinks = [
      { href: 'index.html', text: 'Portfolio' },
      { href: 'blog.html', text: 'Blog' },
      { href: 'system-designs.html', text: 'System Designs' }
    ];
    
    navLinks.forEach(linkData => {
      const link = document.createElement('a');
      link.href = linkData.href;
      link.className = 'nav-link';
      link.textContent = linkData.text;
      nav.appendChild(link);
    });
    
    header.appendChild(themeToggle);
    header.appendChild(nav);
    
    // Insert at the beginning of body
    document.body.insertBefore(header, document.body.firstChild);
    
    // Set active link based on current page
    setActiveNavLink();
    
    // Initialize theme toggle functionality
    initThemeToggle();
  }

  // Set active nav link based on current page
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
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

