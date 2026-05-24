/**
 * Aurea Luna - Dashboard JavaScript
 * Main functionality and interactions
 */

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
  console.log('Aurea Luna Dashboard loaded');
  
  // Add any dynamic functionality here
  // Example: Analytics tracking, dynamic data loading, etc.
});

// Utility function to open external links
function openLink(url, target = '_blank') {
  window.open(url, target);
}

// Update progress dynamically if needed
function updateProgress(percentage) {
  const progressBar = document.querySelector('.progress-bar-fill');
  if (progressBar) {
    progressBar.style.width = percentage + '%';
  }
}

// Add event listeners for buttons
document.querySelectorAll('.action-btn').forEach(button => {
  button.addEventListener('click', function() {
    console.log('Action button clicked:', this.textContent);
  });
});

// Add smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Log page load time
window.addEventListener('load', function() {
  const perfData = window.performance.timing;
  const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
  console.log('Page load time:', pageLoadTime + 'ms');
});
