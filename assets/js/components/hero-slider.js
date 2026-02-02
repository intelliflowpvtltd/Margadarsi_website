/**
 * Hero Property Slider - Mysterious & Stunning Animations
 * Unpredictable slide transitions with various effects
 */

class HeroPropertySlider {
    constructor() {
        this.slider = document.getElementById('propertySlider');
        if (!this.slider) return;

        this.cards = this.slider.querySelectorAll('.hero-property-card');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.getElementById('prevProperty');
        this.nextBtn = document.getElementById('nextProperty');

        this.currentIndex = 0;
        this.isAnimating = false;
        this.autoPlayInterval = null;

        // Array of mysterious transition effects
        this.transitions = [
            'rotateFlip',
            'zoomFade',
            'slideRotate',
            'perspectiveShift',
            'spiralIn'
        ];

        this.init();
    }

    init() {
        // Event listeners
        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());

        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Auto-play with random intervals (mysterious timing)
        this.startAutoPlay();

        // Pause on hover
        this.slider.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.slider.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    next() {
        if (this.isAnimating) return;
        const nextIndex = (this.currentIndex + 1) % this.cards.length;
        this.goToSlide(nextIndex);
    }

    prev() {
        if (this.isAnimating) return;
        const prevIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
        this.goToSlide(prevIndex);
    }

    goToSlide(index) {
        if (this.isAnimating || index === this.currentIndex) return;

        this.isAnimating = true;

        // Select a random mysterious transition
        const randomTransition = this.transitions[Math.floor(Math.random() * this.transitions.length)];

        // Apply the transition
        this.applyTransition(this.currentIndex, index, randomTransition);

        // Update indicators
        this.updateIndicators(index);

        this.currentIndex = index;

        setTimeout(() => {
            this.isAnimating = false;
        }, 1000);
    }

    applyTransition(fromIndex, toIndex, transitionType) {
        const fromCard = this.cards[fromIndex];
        const toCard = this.cards[toIndex];

        // Remove all transition classes
        this.cards.forEach(card => {
            card.classList.remove('active', 'prev', 'next',
                'rotate-flip', 'zoom-fade', 'slide-rotate',
                'perspective-shift', 'spiral-in');
        });

        // Apply mysterious transition based on type
        switch (transitionType) {
            case 'rotateFlip':
                fromCard.style.transform = 'rotateY(90deg) scale(0.8)';
                fromCard.style.opacity = '0';
                setTimeout(() => {
                    fromCard.classList.remove('active');
                    fromCard.style.transform = '';
                    fromCard.style.opacity = '';
                    toCard.style.transform = 'rotateY(-90deg) scale(0.8)';
                    toCard.style.opacity = '0';
                    toCard.classList.add('active');
                    setTimeout(() => {
                        toCard.style.transform = '';
                        toCard.style.opacity = '';
                    }, 50);
                }, 400);
                break;

            case 'zoomFade':
                fromCard.style.transform = 'scale(1.2)';
                fromCard.style.opacity = '0';
                setTimeout(() => {
                    fromCard.classList.remove('active');
                    fromCard.style.transform = '';
                    fromCard.style.opacity = '';
                    toCard.style.transform = 'scale(0.8)';
                    toCard.style.opacity = '0';
                    toCard.classList.add('active');
                    setTimeout(() => {
                        toCard.style.transform = '';
                        toCard.style.opacity = '';
                    }, 50);
                }, 400);
                break;

            case 'slideRotate':
                fromCard.style.transform = 'translateX(-100%) rotate(-15deg)';
                fromCard.style.opacity = '0';
                setTimeout(() => {
                    fromCard.classList.remove('active');
                    fromCard.style.transform = '';
                    fromCard.style.opacity = '';
                    toCard.style.transform = 'translateX(100%) rotate(15deg)';
                    toCard.style.opacity = '0';
                    toCard.classList.add('active');
                    setTimeout(() => {
                        toCard.style.transform = '';
                        toCard.style.opacity = '';
                    }, 50);
                }, 400);
                break;

            case 'perspectiveShift':
                fromCard.style.transform = 'perspective(1000px) rotateX(45deg) translateZ(-200px)';
                fromCard.style.opacity = '0';
                setTimeout(() => {
                    fromCard.classList.remove('active');
                    fromCard.style.transform = '';
                    fromCard.style.opacity = '';
                    toCard.style.transform = 'perspective(1000px) rotateX(-45deg) translateZ(-200px)';
                    toCard.style.opacity = '0';
                    toCard.classList.add('active');
                    setTimeout(() => {
                        toCard.style.transform = '';
                        toCard.style.opacity = '';
                    }, 50);
                }, 400);
                break;

            case 'spiralIn':
                fromCard.style.transform = 'rotate(180deg) scale(0)';
                fromCard.style.opacity = '0';
                setTimeout(() => {
                    fromCard.classList.remove('active');
                    fromCard.style.transform = '';
                    fromCard.style.opacity = '';
                    toCard.style.transform = 'rotate(-180deg) scale(0)';
                    toCard.style.opacity = '0';
                    toCard.classList.add('active');
                    setTimeout(() => {
                        toCard.style.transform = '';
                        toCard.style.opacity = '';
                    }, 50);
                }, 400);
                break;
        }
    }

    updateIndicators(index) {
        this.indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    startAutoPlay() {
        this.stopAutoPlay();
        // Random interval between 4-7 seconds for mysterious timing
        const randomInterval = 4000 + Math.random() * 3000;
        this.autoPlayInterval = setTimeout(() => {
            this.next();
            this.startAutoPlay(); // Restart with new random interval
        }, randomInterval);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearTimeout(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new HeroPropertySlider();
    // Background stays completely static - no effects
});
