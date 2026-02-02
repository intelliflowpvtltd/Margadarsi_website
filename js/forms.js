/* ============================================
   MARGADARSI - Form Validation & Handling
   Contact Forms & Newsletter
   ============================================ */

(function () {
    'use strict';

    // ============================================
    // FORM VALIDATION
    // ============================================
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        const re = /^[0-9]{10}$/;
        return re.test(phone.replace(/[\s()-]/g, ''));
    }

    function showError(input, message) {
        const formGroup = input.closest('.mb-3') || input.closest('.form-group');
        const errorElement = formGroup.querySelector('.invalid-feedback') || createErrorElement();

        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        errorElement.textContent = message;

        if (!formGroup.querySelector('.invalid-feedback')) {
            formGroup.appendChild(errorElement);
        }
    }

    function showSuccess(input) {
        const formGroup = input.closest('.mb-3') || input.closest('.form-group');
        const errorElement = formGroup.querySelector('.invalid-feedback');

        input.classList.remove('is-invalid');
        input.classList.add('is-valid');

        if (errorElement) {
            errorElement.remove();
        }
    }

    function createErrorElement() {
        const div = document.createElement('div');
        div.className = 'invalid-feedback';
        div.style.display = 'block';
        return div;
    }

    // ============================================
    // CONTACT FORM HANDLING
    // ============================================
    function initContactForm() {
        const contactForm = document.querySelector('#contactForm');

        if (!contactForm) return;

        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            let isValid = true;

            // Get form fields
            const name = this.querySelector('#name');
            const email = this.querySelector('#email');
            const phone = this.querySelector('#phone');
            const subject = this.querySelector('#subject');
            const message = this.querySelector('#message');

            // Validate name
            if (!name.value.trim()) {
                showError(name, 'Please enter your name');
                isValid = false;
            } else if (name.value.trim().length < 2) {
                showError(name, 'Name must be at least 2 characters');
                isValid = false;
            } else {
                showSuccess(name);
            }

            // Validate email
            if (!email.value.trim()) {
                showError(email, 'Please enter your email');
                isValid = false;
            } else if (!validateEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                isValid = false;
            } else {
                showSuccess(email);
            }

            // Validate phone (if exists)
            if (phone && phone.value.trim()) {
                if (!validatePhone(phone.value)) {
                    showError(phone, 'Please enter a valid 10-digit phone number');
                    isValid = false;
                } else {
                    showSuccess(phone);
                }
            }

            // Validate subject (if exists)
            if (subject && !subject.value.trim()) {
                showError(subject, 'Please enter a subject');
                isValid = false;
            } else if (subject) {
                showSuccess(subject);
            }

            // Validate message
            if (!message.value.trim()) {
                showError(message, 'Please enter your message');
                isValid = false;
            } else if (message.value.trim().length < 10) {
                showError(message, 'Message must be at least 10 characters');
                isValid = false;
            } else {
                showSuccess(message);
            }

            if (isValid) {
                // Submit the form
                await submitContactForm(this);
            }
        });

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function () {
                if (this.value.trim()) {
                    validateField(this);
                }
            });
        });
    }

    function validateField(field) {
        const fieldId = field.id;

        switch (fieldId) {
            case 'name':
                if (field.value.trim().length < 2) {
                    showError(field, 'Name must be at least 2 characters');
                } else {
                    showSuccess(field);
                }
                break;

            case 'email':
                if (!validateEmail(field.value)) {
                    showError(field, 'Please enter a valid email');
                } else {
                    showSuccess(field);
                }
                break;

            case 'phone':
                if (field.value.trim() && !validatePhone(field.value)) {
                    showError(field, 'Please enter a valid 10-digit phone number');
                } else {
                    showSuccess(field);
                }
                break;

            case 'message':
                if (field.value.trim().length < 10) {
                    showError(field, 'Message must be at least 10 characters');
                } else {
                    showSuccess(field);
                }
                break;

            default:
                if (!field.value.trim()) {
                    showError(field, 'This field is required');
                } else {
                    showSuccess(field);
                }
        }
    }

    async function submitContactForm(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';

        try {
            // Simulate API call (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Show success message
            showFormMessage(form, 'success', 'Thank you! Your message has been sent successfully. We will get back to you soon.');
            form.reset();

            // Remove validation classes
            form.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
                el.classList.remove('is-valid', 'is-invalid');
            });

        } catch (error) {
            showFormMessage(form, 'error', 'Oops! Something went wrong. Please try again later.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    }

    function showFormMessage(form, type, message) {
        const existingAlert = form.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        const alert = document.createElement('div');
        alert.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`;
        alert.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

        form.insertBefore(alert, form.firstChild);

        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => alert.remove(), 300);
        }, 5000);
    }

    // ============================================
    // PROPERTY INQUIRY FORM
    // ============================================
    function initPropertyInquiryForm() {
        const inquiryForms = document.querySelectorAll('.property-inquiry-form');

        inquiryForms.forEach(form => {
            form.addEventListener('submit', async function (e) {
                e.preventDefault();

                const name = this.querySelector('[name="name"]');
                const email = this.querySelector('[name="email"]');
                const phone = this.querySelector('[name="phone"]');
                const propertyId = this.querySelector('[name="property_id"]');

                let isValid = true;

                if (!name.value.trim()) {
                    showError(name, 'Name is required');
                    isValid = false;
                } else {
                    showSuccess(name);
                }

                if (!validateEmail(email.value)) {
                    showError(email, 'Valid email is required');
                    isValid = false;
                } else {
                    showSuccess(email);
                }

                if (!validatePhone(phone.value)) {
                    showError(phone, 'Valid phone is required');
                    isValid = false;
                } else {
                    showSuccess(phone);
                }

                if (isValid) {
                    await submitPropertyInquiry(this);
                }
            });
        });
    }

    async function submitPropertyInquiry(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            showFormMessage(form, 'success', 'Your inquiry has been sent! Our team will contact you soon.');
            form.reset();

            // Close modal if form is in modal
            const modal = form.closest('.modal');
            if (modal) {
                const modalInstance = bootstrap.Modal.getInstance(modal);
                if (modalInstance) {
                    setTimeout(() => modalInstance.hide(), 2000);
                }
            }

        } catch (error) {
            showFormMessage(form, 'error', 'Failed to send inquiry. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    }

    // ============================================
    // NEWSLETTER SUBSCRIPTION
    // ============================================
    function initNewsletterForm() {
        const newsletterForms = document.querySelectorAll('.newsletter-form');

        newsletterForms.forEach(form => {
            form.addEventListener('submit', async function (e) {
                e.preventDefault();

                const email = this.querySelector('[type="email"]');

                if (!validateEmail(email.value)) {
                    showError(email, 'Please enter a valid email');
                    return;
                }

                showSuccess(email);
                await submitNewsletter(this, email.value);
            });
        });
    }

    async function submitNewsletter(form, email) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span>';

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            showFormMessage(form, 'success', 'Thank you for subscribing to our newsletter!');
            form.reset();

        } catch (error) {
            showFormMessage(form, 'error', 'Subscription failed. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    }

    // ============================================
    // INITIALIZE ALL FORMS
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        initContactForm();
        initPropertyInquiryForm();
        initNewsletterForm();
    });

})();
