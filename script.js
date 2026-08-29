document.addEventListener('DOMContentLoaded', () => {
    
    // Constants
    const CONSTANTS = {
        THEME_KEY: 'theme',
        THEME_LIGHT: 'light-mode',
        SCROLL_THRESHOLD: 20,
    };
    
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
            const isLight = theme === CONSTANTS.THEME_LIGHT;
            document.body.classList.toggle('light-mode', isLight);

            if (themeToggle) {
                themeToggle.checked = isLight;
            }

            if (mobileThemeToggle) {
                mobileThemeToggle.setAttribute('aria-pressed', String(isLight));
            }
        };

        try {
            const savedTheme = localStorage.getItem(CONSTANTS.THEME_KEY) || '';
            applyTheme(savedTheme);
        } catch (error) {
            console.warn('localStorage not available:', error);
            applyTheme('');
        }

        if (themeToggle) {
            themeToggle.addEventListener('change', () => {
                const theme = themeToggle.checked ? CONSTANTS.THEME_LIGHT : '';
                applyTheme(theme);
                try {
                    localStorage.setItem(CONSTANTS.THEME_KEY, theme);
                } catch (error) {
                    console.warn('Could not save theme to localStorage:', error);
                }
            });
        }

        if (mobileThemeToggle) {
            mobileThemeToggle.addEventListener('click', () => {
                const currentTheme = document.body.classList.contains('light-mode') ? '' : CONSTANTS.THEME_LIGHT;
                applyTheme(currentTheme);
                try {
                    localStorage.setItem(CONSTANTS.THEME_KEY, currentTheme);
                } catch (error) {
                    console.warn('Could not save theme to localStorage:', error);
                }
            });
        }
    };

    // "Back to Top" Button Handler
    const backToTopHandler = () => {
        const topButton = document.querySelector('.top-btn');

        const scrollFunction = () => {
            topButton.style.display =
                document.documentElement.scrollTop > CONSTANTS.SCROLL_THRESHOLD ? 'block' : 'none';
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

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                form.reset();
                status.textContent = 'Thanks, your message has been sent.';
                status.dataset.state = 'success';
            } catch (error) {
                console.error('Form submission error:', error);
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
