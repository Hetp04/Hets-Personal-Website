// Modal functionality
function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modal.classList.add('active');
    modalImg.src = imageSrc;
    
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
    
    // Re-enable scrolling
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside the image
document.getElementById('imageModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Close modal on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Improved carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        const inner = carousel.querySelector('.carousel-inner');
        const items = carousel.querySelectorAll('.carousel-item');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const indicators = carousel.querySelectorAll('.carousel-indicator');
        
        let currentIndex = 0;
        let autoPlayInterval = null;
        let userInteracted = false;
        let interactionTimeout = null;
        
        function updateCarousel() {
            inner.style.transform = `translateX(-${currentIndex * 100}%)`;
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
        }
        
        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }
        
        function resetAutoPlayTimer() {
            userInteracted = true;
            
            // Clear any existing interaction timeout
            if (interactionTimeout) {
                clearTimeout(interactionTimeout);
            }
            
            // Clear any existing interval
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
            }
            
            // Set a timeout to re-enable autoplay after 8 seconds of inactivity
            interactionTimeout = setTimeout(() => {
                userInteracted = false;
                startAutoPlay();
            }, 8000);
        }
        
        function startAutoPlay() {
            // Clear any existing interval
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
            }
            
            // Start new interval
            autoPlayInterval = setInterval(() => {
                if (!userInteracted) {
                    currentIndex = (currentIndex + 1) % items.length;
                    updateCarousel();
                }
            }, 10000); // Slowed down to 10 seconds
        }
        
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateCarousel();
            resetAutoPlayTimer();
        });
        
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % items.length;
            updateCarousel();
            resetAutoPlayTimer();
        });
        
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                goToSlide(index);
                resetAutoPlayTimer();
            });
        });
        
        // Add mouse enter/leave event handlers
        carousel.addEventListener('mouseenter', () => {
            userInteracted = true;
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
            }
        });
        
        carousel.addEventListener('mouseleave', () => {
            // Reset the interaction after 3 seconds
            setTimeout(() => {
                userInteracted = false;
                startAutoPlay();
            }, 3000);
        });
        
        // Start auto-play
        startAutoPlay();
    });
}); 