/* ============================================
   MARGADARSI - Gallery JavaScript
   Masonry Layout & Lightbox Functionality
   ============================================ */

(function () {
    'use strict';

    // ============================================
    // GALLERY FILTER
    // ============================================
    function initGalleryFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn, .filter-pill');
        const galleryItems = document.querySelectorAll('.gallery-item');

        if (filterBtns.length === 0 || galleryItems.length === 0) return;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                const filter = this.getAttribute('data-filter');

                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // Filter gallery items
                galleryItems.forEach(item => {
                    const categories = item.getAttribute('data-category')?.split(' ') || [];

                    if (filter === 'all' || categories.includes(filter)) {
                        item.style.display = '';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ============================================
    // LIGHTBOX FUNCTIONALITY
    // ============================================
    let currentImageIndex = 0;
    let galleryImages = [];

    function initLightbox() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const lightbox = document.querySelector('.lightbox');

        if (!lightbox || galleryItems.length === 0) return;

        const lightboxImg = lightbox.querySelector('.lightbox-content img');
        const lightboxClose = lightbox.querySelector('.lightbox-close');
        const lightboxPrev = lightbox.querySelector('.lightbox-prev');
        const lightboxNext = lightbox.querySelector('.lightbox-next');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');

        // Collect all gallery images
        galleryImages = Array.from(galleryItems).map(item => {
            return {
                src: item.querySelector('img')?.src || '',
                title: item.querySelector('.gallery-title')?.textContent || '',
                category: item.querySelector('.gallery-category')?.textContent || ''
            };
        });

        // Open lightbox on click
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                openLightbox(index);
            });
        });

        // Close lightbox
        lightboxClose?.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Navigation
        lightboxPrev?.addEventListener('click', (e) => {
            e.stopPropagation();
            showPrevImage();
        });

        lightboxNext?.addEventListener('click', (e) => {
            e.stopPropagation();
            showNextImage();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;

            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        });

        function openLightbox(index) {
            currentImageIndex = index;
            updateLightboxContent();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        function showPrevImage() {
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            updateLightboxContent();
        }

        function showNextImage() {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            updateLightboxContent();
        }

        function updateLightboxContent() {
            const currentImage = galleryImages[currentImageIndex];

            if (lightboxImg) {
                lightboxImg.src = currentImage.src;
            }

            if (lightboxCaption) {
                const titleElem = lightboxCaption.querySelector('h4');
                const categoryElem = lightboxCaption.querySelector('p');

                if (titleElem) titleElem.textContent = currentImage.title;
                if (categoryElem) categoryElem.textContent = currentImage.category;
            }
        }
    }

    // ============================================
    // PROPERTY FILTER FUNCTIONALITY
    // ============================================
    function initPropertyFilter() {
        const filterForm = document.querySelector('#propertyFilterForm');

        if (!filterForm) return;

        const applyBtn = filterForm.querySelector('.apply-filter');
        const resetBtn = filterForm.querySelector('.reset-filter');

        applyBtn?.addEventListener('click', () => {
            applyFilters();
        });

        resetBtn?.addEventListener('click', () => {
            filterForm.reset();
            applyFilters();
        });

        // Auto-apply on form change
        filterForm.addEventListener('change', () => {
            applyFilters();
        });
    }

    function applyFilters() {
        const propertyCards = document.querySelectorAll('.property-card');
        const formData = new FormData(document.querySelector('#propertyFilterForm'));

        const filters = {
            type: formData.getAll('type'),
            bedrooms: formData.getAll('bedrooms'),
            priceMin: parseFloat(formData.get('price_min')) || 0,
            priceMax: parseFloat(formData.get('price_max')) || Infinity
        };

        propertyCards.forEach(card => {
            const cardType = card.getAttribute('data-type');
            const cardBedrooms = card.getAttribute('data-bedrooms');
            const cardPrice = parseFloat(card.getAttribute('data-price')) || 0;

            let shouldShow = true;

            // Type filter
            if (filters.type.length > 0 && !filters.type.includes(cardType)) {
                shouldShow = false;
            }

            // Bedrooms filter
            if (filters.bedrooms.length > 0 && !filters.bedrooms.includes(cardBedrooms)) {
                shouldShow = false;
            }

            // Price filter
            if (cardPrice < filters.priceMin || cardPrice > filters.priceMax) {
                shouldShow = false;
            }

            // Show/hide card
            const cardParent = card.closest('.col-lg-4, .col-md-6');
            if (cardParent) {
                if (shouldShow) {
                    cardParent.style.display = '';
                    setTimeout(() => {
                        cardParent.style.opacity = '1';
                        cardParent.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    cardParent.style.opacity = '0';
                    cardParent.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        cardParent.style.display = 'none';
                    }, 300);
                }
            }
        });

        // Update results count
        const visibleCards = Array.from(propertyCards).filter(card => {
            const parent = card.closest('.col-lg-4, .col-md-6');
            return parent && parent.style.display !== 'none';
        });

        console.log(`Showing ${visibleCards.length} of ${propertyCards.length} properties`);
    }

    // ============================================
    // INITIALIZE ALL GALLERY FEATURES
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        initGalleryFilter();
        initLightbox();
        initPropertyFilter();
    });

})();
