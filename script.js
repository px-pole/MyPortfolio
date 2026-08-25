document.addEventListener('DOMContentLoaded', () => {
    
    // Mobile Navigation Handler
    const mobileNavHandler = () => {
        const headerBtn = document.querySelector('.header__bars');
        const mobileNav = document.querySelector('.mobile-nav');

        const setMenuOpen = (isOpen) => {
            mobileNav.classList.toggle('open', isOpen);
            headerBtn.setAttribute('aria-expanded', String(isOpen));
            headerBtn.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
            document.body.style.overflowY = isOpen ? 'hidden' : 'auto';
        };
        
        headerBtn.addEventListener('click', () => {
            setMenuOpen(!mobileNav.classList.contains('open'));
        });

        mobileNav.addEventListener('click', (e) => {
            if (e.target.closest('a')) {
                setMenuOpen(false);
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
                setMenuOpen(false);
                headerBtn.focus();
            }
        });
    };

    // Dark Mode Handler
    const darkModeHandler = () => {
        const themeToggle = document.querySelector('#theme-toggle');
        const mobileThemeToggle = document.querySelector('.mobile-nav__theme-toggle');

        const applyTheme = (theme) => {
            document.body.className = theme || '';
            themeToggle.checked = theme === 'light-mode';
        };

        const savedTheme = localStorage.getItem('theme');
        applyTheme(savedTheme);

        themeToggle.addEventListener('change', () => {
            const theme = themeToggle.checked ? 'light-mode' : '';
            applyTheme(theme);
            localStorage.setItem('theme', theme || '');
        });

        if (mobileThemeToggle) {
            mobileThemeToggle.addEventListener('click', () => {
                const currentTheme = document.body.className === 'light-mode' ? '' : 'light-mode';
                applyTheme(currentTheme);
                localStorage.setItem('theme', currentTheme);
            });
        }
    };

    // "Back to Top" Button Handler
    const backToTopHandler = () => {
        const topButton = document.querySelector('.top-btn');

        const scrollFunction = () => {
            topButton.style.display =
                document.documentElement.scrollTop > 20 ? 'block' : 'none';
        };

        const topFunction = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        window.addEventListener('scroll', scrollFunction);
        topButton.addEventListener('click', topFunction);
    };

    // Contact Form Handler
    const contactFormHandler = () => {
        const form = document.querySelector('#contact-form');
        const status = document.querySelector('#contact-form-status');
        const submitButton = form?.querySelector('[type="submit"]');
        if (!form || !status || !submitButton) return;

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            status.textContent = '';
            status.removeAttribute('data-state');

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: new FormData(form),
                    headers: { Accept: 'application/json' },
                });

                if (!response.ok) throw new Error('Formspree rejected the submission');

                form.reset();
                status.textContent = 'Thanks, your message has been sent.';
                status.dataset.state = 'success';
            } catch (error) {
                status.textContent = 'Your message could not be sent. Please check your connection and try again.';
                status.dataset.state = 'error';
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }
        });
    };

    // Initialize all handlers
    mobileNavHandler();
    darkModeHandler();
    backToTopHandler();
    contactFormHandler();
});
