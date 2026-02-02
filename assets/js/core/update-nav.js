// Quick script to update all HTML files with top bar and enhanced navigation
const fs = require('fs');
const path = require('path');

const files = ['about.html', 'property.html', 'gallery.html', 'contact.html'];
const baseDir = 'd:/Margadarsi_Website';

const topBarHTML = `
  <!-- Top Info Bar -->
  <div class="top-info-bar">
    <div class="container">
      <div class="top-info-content">
        <div class="top-info-left">
          <span class="top-info-offer">🎉 Special Offer: 0% Brokerage on Select Properties!</span>
          <div class="top-info-item">
            <i class="bi bi-telephone-fill"></i>
            <span>+91 98765 43210</span>
          </div>
          <div class="top-info-item d-none d-md-flex">
            <i class="bi bi-envelope-fill"></i>
            <span>info@margadarsi.com</span>
          </div>
        </div>
        <div class="top-info-social">
          <a href="#" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
          <a href="#" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
          <a href="#" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
          <a href="#" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
        </div>
      </div>
    </div>
  </div>
`;

const navPages = {
    'about.html': 'About',
    'property.html': 'Properties',
    'gallery.html': 'Gallery',
    'contact.html': 'Contact'
};

const navIcons = {
    'Home': 'bi-house-door-fill',
    'About': 'bi-info-circle-fill',
    'Properties': 'bi-buildings-fill',
    'Gallery': 'bi-images',
    'Contact': 'bi-envelope-fill'
};

files.forEach(file => {
    const filePath = path.join(baseDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Add top bar if not present
    if (!content.includes('top-info-bar')) {
        content = content.replace('<body>', '<body>\n' + topBarHTML);
    }

    // Update nav items with icons
    const navPattern = /<ul class="navbar-nav ms-auto">([\s\S]*?)<\/ul>/;
    const match = content.match(navPattern);

    if (match) {
        let newNav = `<ul class="navbar-nav ms-auto align-items-lg-center">
          <li class="nav-item">
            <a class="nav-link-custom${file === 'index.html' ? ' active' : ''}" href="index.html">
              <i class="bi bi-house-door-fill"></i>
              <span>Home</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link-custom${file === 'about.html' ? ' active' : ''}" href="about.html">
              <i class="bi bi-info-circle-fill"></i>
              <span>About</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link-custom${file === 'property.html' ? ' active' : ''}" href="property.html">
              <i class="bi bi-buildings-fill"></i>
              <span>Properties</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link-custom${file === 'gallery.html' ? ' active' : ''}" href="gallery.html">
              <i class="bi bi-images"></i>
              <span>Gallery</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link-custom${file === 'contact.html' ? ' active' : ''}" href="contact.html">
              <i class="bi bi-envelope-fill"></i>
              <span>Contact</span>
            </a>
          </li>
          <li class="nav-item ms-lg-3">
            <a href="contact.html" class="btn-navbar-cta">
              <i class="bi bi-rocket-takeoff-fill"></i>
              <span>Get Started</span>
            </a>
          </li>
        </ul>`;

        content = content.replace(match[0], newNav);
    }

    // Update page header padding
    content = content.replace(
        /section class="section-padding bg-gradient-maroon[^>]*style="padding-top: 150px/g,
        'section class="section-padding bg-gradient-maroon text-white text-center" style="padding-top: 180px'
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${file}`);
});

console.log('All files updated successfully!');
