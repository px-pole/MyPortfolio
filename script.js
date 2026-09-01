const initialiseSite = () => {
    
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

        if (!headerBtn || !mobileNav) return;

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

        if (!topButton) return;

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

    // Liquid navigation interactions for the desktop menu.
    const liquidNavHandler = () => {
        const header = document.querySelector('.header');
        const menu = document.querySelector('.header__menu');
        const activePill = document.querySelector('.header__active-pill');
        const links = [...document.querySelectorAll('.header__link')];

        if (!header || !menu || !activePill || !links.length) return;

        let isNavigating = false;
        let navigationTimeout;

        const movePill = (link, animate = true) => {
            if (window.innerWidth < 768) return;

            const menuBounds = menu.getBoundingClientRect();
            const linkBounds = link.getBoundingClientRect();
            activePill.style.transition = animate ? '' : 'none';
            activePill.style.width = `${linkBounds.width + 20}px`;
            activePill.style.transform = `translateX(${linkBounds.left - menuBounds.left - 10}px)`;
            activePill.style.opacity = '1';

            requestAnimationFrame(() => {
                if (!animate) activePill.style.transition = '';
            });
        };

        const setActiveLink = (link, animate = true) => {
            links.forEach((item) => item.classList.toggle('is-active', item === link));
            movePill(link, animate);
        };

        links.forEach((link) => {
            link.addEventListener('click', () => {
                isNavigating = true;
                setActiveLink(link);
                window.clearTimeout(navigationTimeout);
                navigationTimeout = window.setTimeout(() => {
                    isNavigating = false;
                    updateActiveOnScroll();
                }, 1000);
            });
        });

        const sections = links
            .map((link) => document.querySelector(link.getAttribute('href')))
            .filter(Boolean);

        const updateActiveOnScroll = () => {
            if (isNavigating) {
                window.clearTimeout(navigationTimeout);
                navigationTimeout = window.setTimeout(() => {
                    isNavigating = false;
                    updateActiveOnScroll();
                }, 150);
                return;
            }

            const activeSection = sections.find((section) => {
                const bounds = section.getBoundingClientRect();
                return bounds.top <= window.innerHeight * 0.45 && bounds.bottom >= window.innerHeight * 0.25;
            });
            const activeLink = links.find((link) => link.getAttribute('href') === `#${activeSection?.id}`);
            if (activeLink) setActiveLink(activeLink, false);
        };

        header.addEventListener('pointermove', (event) => {
            const bounds = header.getBoundingClientRect();
            header.style.setProperty('--glare-x', `${event.clientX - bounds.left}px`);
            header.style.setProperty('--glare-y', `${event.clientY - bounds.top}px`);
        });

        window.addEventListener('resize', () => {
            const activeLink = document.querySelector('.header__link.is-active') || links[0];
            if (window.innerWidth < 768) {
                activePill.style.opacity = '0';
                return;
            }
            movePill(activeLink, false);
        });
        window.addEventListener('scroll', updateActiveOnScroll, { passive: true });
        window.addEventListener('scrollend', () => {
            if (!isNavigating) return;

            window.clearTimeout(navigationTimeout);
            isNavigating = false;
            updateActiveOnScroll();
        }, { passive: true });

        setActiveLink(links[0], false);
        updateActiveOnScroll();
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
    liquidNavHandler();
    contactFormHandler();
};

initialiseSite();
