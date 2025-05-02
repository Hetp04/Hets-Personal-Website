const pages = ['about', 'resume', 'portfolio', 'blog', 'contact'];
let currentPageIndex = 0;

function updateNavigation() {
    // Get navigation buttons
    const prevBtn = document.querySelector('.nav-btn[data-action="prev"]');
    const nextBtn = document.querySelector('.nav-btn[data-action="next"]');
    
    // Disable/enable buttons based on current position
    prevBtn.disabled = currentPageIndex === 0;
    nextBtn.disabled = currentPageIndex === pages.length - 1;
    
    // Update current page
    const currentPage = pages[currentPageIndex];
    
    // Hide all articles
    document.querySelectorAll('article').forEach(article => {
        article.classList.remove('active');
    });
    
    // Show current article
    document.querySelector(`#${currentPage}`).classList.add('active');
    
    // Update active state in navbar
    document.querySelectorAll('.navbar-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentPage)) {
            link.classList.add('active');
        }
    });
}

function navigatePage(direction) {
    if (direction === 'prev' && currentPageIndex > 0) {
        currentPageIndex--;
    } else if (direction === 'next' && currentPageIndex < pages.length - 1) {
        currentPageIndex++;
    }
    updateNavigation();
}

// Initialize navigation
document.addEventListener('DOMContentLoaded', () => {
    // Set up click handlers for navigation buttons
    document.querySelector('.nav-btn[data-action="prev"]').addEventListener('click', () => navigatePage('prev'));
    document.querySelector('.nav-btn[data-action="next"]').addEventListener('click', () => navigatePage('next'));
    
    // Set initial state
    const currentPath = window.location.hash.slice(1) || 'about';
    currentPageIndex = Math.max(0, pages.indexOf(currentPath));
    updateNavigation();
}); 