// Update all HTML files with new 3-column top bar structure
const fs = require('fs');
const path = require('path');

const files = ['index.html', 'about.html', 'property.html', 'gallery.html', 'contact.html'];
const baseDir = 'd:/Margadarsi_Website';

const newTopBarHTML = `  <!-- Top Info Bar -->
  <div class="top-info-bar">
    <div class="container">
      <div class="top-info-content">
        <!-- Left: Contact Info -->
        <div class="top-info-left">
          <div class="top-info-item">
            <i class="bi bi-telephone-fill"></i>
            <span>+91 98765 43210</span>
          </div>
          <div class="top-info-item">
            <i class="bi bi-envelope-fill"></i>
            <span>info@margadarsi.com</span>
          </div>
        </div>
        
        <!-- Center: Special Offer -->
        <div class="top-info-center">
          <span class="top-info-offer">🎉 Special Offer: 0% Brokerage on Select Properties!</span>
        </div>
        
        <!-- Right: Social Media -->
        <div class="top-info-right">
          <div class="top-info-social">
            <a href="#" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
            <a href="#" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
            <a href="#" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
            <a href="#" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

files.forEach(file => {
    const filePath = path.join(baseDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace the existing top bar
    const topBarPattern = /<!-- Top Info Bar -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

    if (topBarPattern.test(content)) {
        content = content.replace(topBarPattern, newTopBarHTML.trim());
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Updated: ${file}`);
    } else {
        console.log(`⚠️  Top bar not found in: ${file}`);
    }
});

console.log('\n🎉 All files updated with new 3-column layout!');
